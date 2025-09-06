import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import InitialView from './components/InitialView'
import CurtainEffect from './components/CurtainEffect'

function App() {
  const animationFrameRef = useRef(0)
  const canvasRef = useRef(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransformed, setIsTransformed] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [linkHover, setLinkHover] = useState({ active: false, x: 0, y: 0 })
  
  const sections = ['hero', 'about', 'projects', 'contact']

  // Reset transformation state on page load/refresh
  useEffect(() => {
    // Always start from initial view on page load
    setIsTransformed(false)
    setScrollPosition(0)
    window.scrollTo(0, 0)
    document.body.classList.remove('transformed')
  }, [])

  // Link hover cursor effect
  useEffect(() => {
    if (!isTransformed) return

    const handleMouseMove = (e) => {
      const target = e.target.closest('a, button')
      if (target) {
        setLinkHover({ active: true, x: e.clientX, y: e.clientY })
      } else {
        setLinkHover({ active: false, x: 0, y: 0 })
      }
    }

    const handleMouseLeave = () => {
      setLinkHover({ active: false, x: 0, y: 0 })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isTransformed])

  // Stage transformation effect - detect scroll/interaction
  useEffect(() => {
    const handleTransformation = () => {
      if (!isTransformed && window.scrollY > 10) {
        setIsTransformed(true)
        // Prevent default scroll behavior during transformation
        window.scrollTo(0, 0)
      }
      setScrollPosition(window.scrollY)
    }

    const handleInteraction = (e) => {
      if (!isTransformed) {
        if (e.type === 'wheel' && Math.abs(e.deltaY) > 5) {
          e.preventDefault()
          setIsTransformed(true)
          window.scrollTo(0, 0)
        } else if (e.type === 'keydown' && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(e.code)) {
          e.preventDefault()
          setIsTransformed(true)
          window.scrollTo(0, 0)
        } else if (e.type === 'click') {
          setIsTransformed(true)
          window.scrollTo(0, 0)
        }
      }
    }

    // Manage body class for cursor control
    if (isTransformed) {
      document.body.classList.add('transformed')
    } else {
      document.body.classList.remove('transformed')
      // Always reset scroll position when not transformed
      window.scrollTo(0, 0)
    }

    window.addEventListener('scroll', handleTransformation, { passive: false })
    window.addEventListener('wheel', handleInteraction, { passive: false })
    window.addEventListener('keydown', handleInteraction)
    window.addEventListener('click', handleInteraction)
    window.addEventListener('mousemove', handleInteraction, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleTransformation)
      window.removeEventListener('wheel', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('mousemove', handleInteraction)
    }
  }, [isTransformed])

  // Fireworks effect - only after transformation
  useEffect(() => {
    if (!isTransformed) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const state = {
      width: 0,
      height: 0,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      particles: [],
      lastTrailTs: 0,
    }

    const resize = () => {
      state.width = window.innerWidth
      state.height = window.innerHeight
      const { dpr } = state
      canvas.width = Math.floor(state.width * dpr)
      canvas.height = Math.floor(state.height * dpr)
      canvas.style.width = state.width + 'px'
      canvas.style.height = state.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const random = (min, max) => Math.random() * (max - min) + min

    const spawnTrail = (x, y) => {
      // small trailing sparkles - teal themed
      const count = 6
      for (let i = 0; i < count; i++) {
        state.particles.push({
          x,
          y,
          vx: random(-0.6, 0.6),
          vy: random(-0.6, 0.6) - 0.4,
          life: random(300, 600),
          age: 0,
          size: random(1, 2.2),
          hue: random(170, 200), // Teal hue range
          alpha: 1,
          gravity: 0.02,
          drag: 0.985,
        })
      }
    }

    const spawnBurst = (x, y) => {
      const count = 28
      const speed = 2.2
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + random(-0.2, 0.2)
        const s = speed * random(0.6, 1.2)
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * s,
          vy: Math.sin(angle) * s,
          life: random(700, 1200),
          age: 0,
          size: random(1.5, 3),
          hue: random(165, 195), // Teal/cyan hue range
          alpha: 1,
          gravity: 0.03,
          drag: 0.985,
        })
      }
    }

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2

    const onMove = e => {
      pointerX = e.clientX
      pointerY = e.clientY
      const now = performance.now()
      if (now - state.lastTrailTs > 20) {
        state.lastTrailTs = now
        spawnTrail(pointerX, pointerY)
      }
    }

    const onClick = e => {
      const x = e.clientX
      const y = e.clientY
      spawnBurst(x, y)
    }

    const onScroll = () => {
      // Clear particles on scroll to prevent visual artifacts
      state.particles.length = 0
    }

    let raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      // fade the canvas slightly for trails
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.2)'
      ctx.fillRect(0, 0, state.width, state.height)

      ctx.globalCompositeOperation = 'lighter'
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i]
        p.age += 16
        if (p.age > p.life || p.x < -50 || p.x > state.width + 50 || p.y < -50 || p.y > state.height + 50) {
          state.particles.splice(i, 1)
          continue
        }
        p.vx *= p.drag
        p.vy = p.vy * p.drag + p.gravity
        p.x += p.vx
        p.y += p.vy
        const t = p.age / p.life
        p.alpha = 1 - t

        ctx.beginPath()
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 6)
        grad.addColorStop(0, `hsla(${p.hue}, 85%, 65%, ${0.9 * p.alpha})`)
        grad.addColorStop(1, `hsla(${p.hue}, 85%, 45%, 0)`)
        ctx.fillStyle = grad
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('click', onClick)
    window.addEventListener('scroll', onScroll, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('click', onClick)
      window.removeEventListener('scroll', onScroll)
    }
  }, [isTransformed])

  // Snap-to-section scrolling - only after transformation
  useEffect(() => {
    if (!isTransformed) return
    
    let isSnapping = false
    let snapTimeout = null
    
    const handleScroll = () => {
      if (isSnapping) return
      
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Find current section based on scroll position
      let currentSectionIndex = 0
      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= windowHeight * 0.5) {
            currentSectionIndex = index
          }
        }
      })
      
      setCurrentSection(currentSectionIndex)
    }
    
    const handleWheel = (e) => {
      if (isSnapping) return
      
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Find the section that's currently most visible
      let currentSectionIndex = 0
      let currentSectionElement = null
      
      sections.forEach((sectionId, index) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= windowHeight * 0.5 && rect.bottom > windowHeight * 0.5) {
            currentSectionIndex = index
            currentSectionElement = element
          }
        }
      })
      
      if (!currentSectionElement) return
      
      const sectionRect = currentSectionElement.getBoundingClientRect()
      const sectionTop = currentSectionElement.offsetTop
      const sectionHeight = currentSectionElement.offsetHeight
      const scrollDirection = e.deltaY > 0 ? 'down' : 'up'
      
      // Check if we're at the boundaries of the current section
      const atSectionTop = sectionRect.top >= -50 // Small tolerance
      const atSectionBottom = sectionRect.bottom <= windowHeight + 50 // Small tolerance
      
      // Snap to next section if scrolling down at bottom of current section
      if (scrollDirection === 'down' && atSectionBottom && currentSectionIndex < sections.length - 1) {
        e.preventDefault()
        isSnapping = true
        
        const nextSectionId = sections[currentSectionIndex + 1]
        const nextElement = document.getElementById(nextSectionId)
        
        if (nextElement) {
          nextElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          setCurrentSection(currentSectionIndex + 1)
        }
        
        clearTimeout(snapTimeout)
        snapTimeout = setTimeout(() => {
          isSnapping = false
        }, 1000)
      }
      
      // Snap to previous section if scrolling up at top of current section
      else if (scrollDirection === 'up' && atSectionTop && currentSectionIndex > 0) {
        e.preventDefault()
        isSnapping = true
        
        const prevSectionId = sections[currentSectionIndex - 1]
        const prevElement = document.getElementById(prevSectionId)
        
        if (prevElement) {
          prevElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          setCurrentSection(currentSectionIndex - 1)
        }
        
        clearTimeout(snapTimeout)
        snapTimeout = setTimeout(() => {
          isSnapping = false
        }, 1000)
      }
    }

    const handleKeyDown = (e) => {
      if (isSnapping) return
      
      let nextSection = currentSection
      
      if (e.key === 'PageDown') {
        e.preventDefault()
        nextSection = Math.min(sections.length - 1, currentSection + 1)
      } else if (e.key === 'PageUp') {
        e.preventDefault()
        nextSection = Math.max(0, currentSection - 1)
      } else if (e.key === 'Home') {
        e.preventDefault()
        nextSection = 0
      } else if (e.key === 'End') {
        e.preventDefault()
        nextSection = sections.length - 1
      }
      
      if (nextSection !== currentSection) {
        isSnapping = true
        setCurrentSection(nextSection)
        
        const targetElement = document.getElementById(sections[nextSection])
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
        
        clearTimeout(snapTimeout)
        snapTimeout = setTimeout(() => {
          isSnapping = false
        }, 1000)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    
    // Initialize current section
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(snapTimeout)
    }
  }, [currentSection, sections, isTransformed])

  // Smooth navigation for nav links
  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
      // Update current section based on target
      const targetIndex = sections.indexOf(targetId)
      if (targetIndex !== -1) {
        setCurrentSection(targetIndex)
      }
    }
  }

  return (
    <>
      {/* Fireworks Canvas - only visible after transformation */}
      {isTransformed && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed top-0 left-0 z-[5]"
          style={{ width: '100vw', height: '100vh' }}
        />
      )}

      {/* Link Hover Cursor - small firing dot */}
      {isTransformed && linkHover.active && (
        <div 
          className="link-hover-cursor"
          style={{
            left: linkHover.x + 'px',
            top: linkHover.y + 'px'
          }}
        />
      )}

      {/* Basic HTML Stage - Initial unstyled view */}
      <InitialView isTransformed={isTransformed} scrollPosition={scrollPosition} />

      {/* Curtain Effect */}
      <CurtainEffect isTransformed={isTransformed} />

      {/* Portfolio Content - transforms in after curtain effect */}
      <div 
        className={`transition-all duration-2000 delay-500 ${
          isTransformed ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ cursor: isTransformed ? 'none' : 'auto' }}
      >
        {/* Navbar */}
        <Header handleNavClick={handleNavClick} />

        {/* Sections */}
        <main className="text-white">
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        
        <Footer handleNavClick={handleNavClick} />
      </div>
    </>
  )
}

export default App