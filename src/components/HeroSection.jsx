import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'

function HeroSection() {
  const sectionRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const rafRef = useRef(null)
  
  // Typing animation states
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentTechIndex, setCurrentTechIndex] = useState(0)
  const [displayedRole, setDisplayedRole] = useState('')
  const [displayedTech, setDisplayedTech] = useState('')
  const [isTypingRole, setIsTypingRole] = useState(true)
  const [isTypingTech, setIsTypingTech] = useState(true)
  
  // Full-stack engineering roles and technologies
  const roles = [
    'FULL STACK ENGINEER',
    'FRONTEND DEVELOPER', 
    'BACKEND DEVELOPER',
    'MOBILE DEVELOPER',
  ]
  
  const technologies = [
    'React',
    'React Native',
    'NestJS',
    'AWS',
    'TypeScript'
  ]

  // Typing animation effect for roles
  useEffect(() => {
    let roleTimeoutId = null

    const typeRole = () => {
      const currentRole = roles[currentRoleIndex]
      
      if (isTypingRole && displayedRole.length < currentRole.length) {
        setDisplayedRole(currentRole.substring(0, displayedRole.length + 1))
        roleTimeoutId = setTimeout(typeRole, 100)
      } else if (isTypingRole && displayedRole.length === currentRole.length) {
        roleTimeoutId = setTimeout(() => {
          setIsTypingRole(false)
          typeRole()
        }, 2000)
      } else if (!isTypingRole && displayedRole.length > 0) {
        setDisplayedRole(currentRole.substring(0, displayedRole.length - 1))
        roleTimeoutId = setTimeout(typeRole, 50)
      } else if (!isTypingRole && displayedRole.length === 0) {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        setIsTypingRole(true)
        roleTimeoutId = setTimeout(typeRole, 200)
      }
    }
    
    // Start the role animation
    roleTimeoutId = setTimeout(typeRole, 100)
    
    return () => {
      if (roleTimeoutId) clearTimeout(roleTimeoutId)
    }
  }, [currentRoleIndex, displayedRole, isTypingRole])

  // Typing animation effect for technologies
  useEffect(() => {
    let techTimeoutId = null

    const typeTech = () => {
      const currentTech = technologies[currentTechIndex]
      
      if (isTypingTech && displayedTech.length < currentTech.length) {
        setDisplayedTech(currentTech.substring(0, displayedTech.length + 1))
        techTimeoutId = setTimeout(typeTech, 150)
      } else if (isTypingTech && displayedTech.length === currentTech.length) {
        techTimeoutId = setTimeout(() => {
          setIsTypingTech(false)
          typeTech()
        }, 3000)
      } else if (!isTypingTech && displayedTech.length > 0) {
        setDisplayedTech(currentTech.substring(0, displayedTech.length - 1))
        techTimeoutId = setTimeout(typeTech, 75)
      } else if (!isTypingTech && displayedTech.length === 0) {
        setCurrentTechIndex((prev) => {
          const newIndex = (prev + 1) % technologies.length
          console.log('Tech changing from', technologies[prev], 'to', technologies[newIndex])
          return newIndex
        })
        setIsTypingTech(true)
        techTimeoutId = setTimeout(typeTech, 200)
      }
    }
    
    // Start the tech animation
    techTimeoutId = setTimeout(typeTech, 100)
    
    return () => {
      if (techTimeoutId) clearTimeout(techTimeoutId)
    }
  }, [currentTechIndex, displayedTech, isTypingTech])

  // Throttled mouse move handler for better performance
  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) return
    
    rafRef.current = requestAnimationFrame(() => {
      const section = sectionRef.current
      if (!section) return
      
      const rect = section.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) })
      rafRef.current = null
    })
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => {
      setIsHovering(false)
      setMousePosition({ x: 50, y: 50 }) // Reset to center
    }

    section.addEventListener('mousemove', handleMouseMove, { passive: true })
    section.addEventListener('mouseenter', handleMouseEnter)
    section.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseenter', handleMouseEnter)
      section.removeEventListener('mouseleave', handleMouseLeave)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [handleMouseMove])

  // Memoized transform calculations to reduce recalculations
  const transforms = useMemo(() => {
    const mouseX = mousePosition.x
    const mouseY = mousePosition.y
    const hoverScale = isHovering ? 1.2 : 1
    const hoverOpacity = isHovering ? 0.6 : 0.3
    
    return {
      shape1: {
        left: `${20 + mouseX * 0.08}%`,
        top: `${15 + mouseY * 0.06}%`,
        transform: `rotate(${45 + mouseX * 0.15}deg) scale(${hoverScale})`,
        opacity: hoverOpacity
      },
      shape2: {
        right: `${15 + mouseX * 0.1}%`,
        top: `${25 + mouseY * 0.08}%`,
        transform: `scale(${isHovering ? 1.3 : 1}) rotate(${mouseX * 0.2}deg)`,
        opacity: isHovering ? 0.7 : 0.4
      },
      hexagon: {
        left: `${10 + mouseX * 0.1}%`,
        bottom: `${30 + mouseY * 0.06}%`,
        transform: `rotate(${mouseX * 0.15}deg) scale(${isHovering ? 1.1 : 0.95})`
      },
      ring1: {
        width: `${isHovering ? '100px' : '70px'}`,
        height: `${isHovering ? '100px' : '70px'}`,
        left: `${70 + mouseX * 0.05}%`,
        top: `${10 + mouseY * 0.03}%`,
        transform: `scale(${isHovering ? 1.1 : 1})`,
        opacity: hoverOpacity
      },
      ring2: {
        width: `${isHovering ? '80px' : '50px'}`,
        height: `${isHovering ? '80px' : '50px'}`,
        right: `${12 + mouseX * 0.07}%`,
        bottom: `${18 + mouseY * 0.09}%`,
        transform: `scale(${isHovering ? 1.2 : 1})`,
        opacity: isHovering ? 0.5 : 0.25
      },
      orbital: {
        left: `${30 + mouseX * 0.05}%`,
        top: `${75 + mouseY * 0.04}%`,
        transform: `scale(${isHovering ? 1.05 : 1})`
      },
      triangle1: {
        left: `${75 + mouseX * 0.04}%`,
        top: `${55 + mouseY * 0.06}%`,
        borderBottomWidth: `${isHovering ? '22px' : '18px'}`,
        borderBottomColor: `rgba(20, 184, 166, ${isHovering ? 0.6 : 0.35})`,
        transform: `rotate(${mouseX * 0.08}deg)`
      },
      triangle2: {
        right: `${28 + mouseX * 0.05}%`,
        bottom: `${45 + mouseY * 0.07}%`,
        borderTopWidth: `${isHovering ? '20px' : '16px'}`,
        borderTopColor: `rgba(20, 184, 166, ${isHovering ? 0.55 : 0.3})`,
        transform: `rotate(${-mouseY * 0.1}deg)`
      },
      diamond: {
        right: `${18 + mouseX * 0.06}%`,
        top: `${40 + mouseY * 0.05}%`,
        transform: `rotate(${45 + mouseX * 0.12}deg) scale(${isHovering ? 1.15 : 1})`,
        opacity: isHovering ? 0.5 : 0.28
      },
      gridPattern: {
        backgroundImage: `radial-gradient(circle at ${mouseX}% ${mouseY}%, rgb(20 184 166) 1px, transparent 0)`,
        backgroundSize: '60px 60px',
        opacity: isHovering ? 0.12 : 0.06
      },
      verticalLine1: {
        left: `${25 + mouseX * 0.03}%`,
        opacity: isHovering ? 0.5 : 0.25
      },
      verticalLine2: {
        right: `${35 + mouseX * 0.025}%`,
        opacity: isHovering ? 0.45 : 0.22
      },
      floatingShapes: {
        shape1: {
          top: `${32 + mouseY * 0.08}%`,
          right: `${20 + mouseX * 0.06}%`,
          transform: `rotate(${45 + mouseX * 0.15}deg) scale(${hoverScale})`
        },
        shape2: {
          bottom: `${32 + mouseY * 0.05}%`,
          left: `${20 + mouseX * 0.04}%`,
          transform: `scale(${isHovering ? 1.2 : 1})`
        },
        shape3: {
          top: `${65 + mouseY * 0.06}%`,
          left: `${65 + mouseX * 0.07}%`,
          transform: `rotate(${mouseY * 0.12}deg) scale(${isHovering ? 1.1 : 1})`
        }
      }
    }
  }, [mousePosition.x, mousePosition.y, isHovering])
  return (
    <section ref={sectionRef} id="hero" className="min-h-screen bg-black relative overflow-hidden">
      {/* Magical Geometric Background Effects - Enhanced */}
      <div className="absolute inset-0">
        {/* Key Dynamic Geometric Shapes */}
        <div 
          className="absolute w-28 h-28 border border-teal-400/40 will-change-transform"
          style={transforms.shape1}
        ></div>
        
        <div 
          className="absolute w-20 h-20 bg-gradient-to-br from-teal-500/25 to-transparent rounded-full will-change-transform"
          style={transforms.shape2}
        ></div>
        
        {/* Additional Triangular Elements */}
        <div 
          className="absolute w-0 h-0 will-change-transform"
          style={{
            ...transforms.triangle1,
            borderLeft: '14px solid transparent',
            borderRight: '14px solid transparent',
            borderBottom: `${transforms.triangle1.borderBottomWidth} solid ${transforms.triangle1.borderBottomColor}`
          }}
        ></div>
        
        <div 
          className="absolute w-0 h-0 will-change-transform"
          style={{
            ...transforms.triangle2,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: `${transforms.triangle2.borderTopWidth} solid ${transforms.triangle2.borderTopColor}`
          }}
        ></div>
        
        {/* Diamond Shape */}
        <div 
          className="absolute w-12 h-12 border border-teal-300/50 will-change-transform"
          style={transforms.diamond}
        ></div>
        
        {/* Hexagonal Shape */}
        <div 
          className="absolute w-18 h-18 will-change-transform animate-magical-rotate"
          style={transforms.hexagon}
        >
          <div className="w-full h-full bg-gradient-to-r from-teal-400/25 to-teal-600/25 animate-magical-pulse" 
               style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
        </div>
        
        {/* Enhanced Pulsing Rings */}
        <div 
          className="absolute rounded-full border border-teal-400/40 will-change-transform animate-magical-pulse"
          style={transforms.ring1}
        ></div>
        
        <div 
          className="absolute rounded-full bg-teal-500/15 will-change-transform animate-magical-pulse"
          style={{
            ...transforms.ring2,
            animationDelay: '1.2s'
          }}
        ></div>
        
        {/* Magical Orbiting Elements */}
        <div 
          className="absolute w-14 h-14 animate-magical-rotate will-change-transform"
          style={transforms.orbital}
        >
          <div className="absolute w-2.5 h-2.5 bg-teal-400/70 rounded-full top-0 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
          <div className="absolute w-2 h-2 bg-teal-300/80 rounded-full bottom-0 right-0 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute w-2 h-2 bg-teal-500/70 rounded-full top-1/2 left-0 transform -translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Original Background Effects */}
        <div className="absolute top-20 left-10 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-400/12 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal-600/10 rounded-full blur-2xl animate-glow-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid Pattern with Mouse Effect */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 will-change-transform transition-opacity duration-300"
            style={transforms.gridPattern}
          ></div>
        </div>
        
        {/* Enhanced Vertical Lines */}
        <div 
          className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-teal-500/30 to-transparent will-change-transform transition-all duration-300"
          style={transforms.verticalLine1}
        ></div>
        <div 
          className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-teal-400/25 to-transparent will-change-transform transition-all duration-300"
          style={transforms.verticalLine2}
        ></div>
        
        {/* Enhanced Floating Shapes */}
        <div 
          className="absolute w-6 h-6 bg-teal-400/60 rotate-45 animate-float will-change-transform"
          style={{ 
            ...transforms.floatingShapes.shape1,
            animationDelay: '0.5s'
          }}
        ></div>
        <div 
          className="absolute w-7 h-7 bg-teal-500/50 rounded-full animate-float will-change-transform"
          style={{ 
            ...transforms.floatingShapes.shape2,
            animationDelay: '2.5s'
          }}
        ></div>
        <div 
          className="absolute w-5 h-5 bg-teal-300/55 rotate-45 animate-float will-change-transform"
          style={{ 
            ...transforms.floatingShapes.shape3,
            animationDelay: '1.8s'
          }}
        ></div>
        
        {/* Additional Enhanced Elements for Better Visibility */}
        <div 
          className="absolute w-4 h-4 border border-teal-300/40 rotate-45 animate-magical-rotate will-change-transform"
          style={{
            left: '85%',
            top: '25%',
            transform: `translateX(${mousePosition.x * 0.12}px) translateY(${mousePosition.y * 0.12}px) rotate(${45 + mousePosition.x * 0.3}deg)`,
          }}
        ></div>
        <div 
          className="absolute w-3 h-3 bg-gradient-to-r from-teal-400/30 to-cyan-400/30 rounded-full animate-magical-pulse will-change-transform"
          style={{
            right: '12%',
            top: '60%',
            transform: `translateX(${mousePosition.x * -0.15}px) translateY(${mousePosition.y * -0.15}px)`,
          }}
        ></div>
        <div 
          className="absolute w-5 h-5 border-2 border-cyan-300/35 rotate-45 animate-magical-float will-change-transform"
          style={{
            left: '25%',
            bottom: '25%',
            transform: `translateX(${mousePosition.x * 0.18}px) translateY(${mousePosition.y * 0.18}px) rotate(${45 - mousePosition.x * 0.25}deg)`,
          }}
        ></div>
        <div 
          className="absolute w-16 h-16 border border-teal-200/25 rounded-full animate-magical-pulse will-change-transform"
          style={{
            right: '25%',
            bottom: '35%',
            transform: `translateX(${mousePosition.x * 0.08}px) translateY(${mousePosition.y * 0.08}px)`,
          }}
        ></div>
        <div 
          className="absolute w-2 h-2 bg-teal-400/50 rounded-full animate-magical-float will-change-transform"
          style={{
            left: '15%',
            top: '35%',
            transform: `translateX(${mousePosition.x * 0.25}px) translateY(${mousePosition.y * 0.25}px)`,
          }}
        ></div>
        <div 
          className="absolute w-8 h-8 border border-cyan-400/30 rounded-full animate-magical-rotate will-change-transform"
          style={{
            right: '8%',
            top: '75%',
            transform: `translateX(${mousePosition.x * -0.1}px) translateY(${mousePosition.y * -0.1}px) rotate(${mousePosition.x * 0.4}deg)`,
          }}
        ></div>
        
        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/3 via-transparent to-black/20"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 py-20 pt-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Profile Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-400/20 blur-2xl scale-110"></div>
              
              <div className="w-70 h-70 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-gray-900 border-2 border-teal-500/30 relative z-10">
                <img
                  src="madawa.png"
                  alt="Developer Portrait"
                  className="w-full ml-[25px] mt-[80px] lg:mt-[100px] scale-160 h-full object-cover filter md:grayscale md:hover:grayscale-0 transition-all duration-700"
                  loading="lazy"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Ring Animation */}
              <div className="absolute inset-0 rounded-full border-2 border-teal-400/30 animate-ping"></div>
            </div>
          </div>
          
          {/* Developer Information */}
          <div className="text-left space-y-8">
            <div>
              <p className="text-teal-400 text-sm font-medium tracking-[0.3em] uppercase mb-6">
                {displayedRole}
                <span className="animate-pulse text-teal-300">|</span>
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight mb-8">
                Building modern<br />
                {technologies[currentTechIndex] === 'React Native' ? 'mobile experiences' : 'web experiences'}<br />
                with <span className="text-teal-400">
                  {displayedTech}
                  <span className="animate-pulse text-teal-300">|</span>
                </span>
              </h1>
            </div>
            
            <div className="max-w-lg">
              <p className="text-gray-300 text-lg leading-relaxed mb-12">
                Passionate about creating beautiful, functional, and user-centered digital experiences across the full technology stack.
              </p>
            </div>
            
            <div className="pt-4">
              <a 
                href="cv.pdf" 
                download="Madawa_prasad_cv.pdf"
                className="group inline-flex items-center space-x-3 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-full transition-all duration-300 font-medium"
              >
                <span>Download my CV</span>
                <div className="w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection