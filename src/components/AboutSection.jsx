import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'

function AboutSection() {
  const sectionRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const rafRef = useRef(null)

  // Throttled mouse move handler for performance
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
      setMousePosition({ x: 50, y: 50 })
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

  // Memoized transform calculations for cyan-themed effects
  const transforms = useMemo(() => {
    const mouseX = mousePosition.x
    const mouseY = mousePosition.y
    const hoverScale = isHovering ? 1.15 : 1
    const hoverOpacity = isHovering ? 0.5 : 0.25
    
    return {
      transformedX: (mouseX - 50) * 0.5,
      transformedY: (mouseY - 50) * 0.5,
      hoverScale,
      hoverOpacity
    }
  }, [mousePosition.x, mousePosition.y, isHovering])

  const { transformedX, transformedY, hoverScale, hoverOpacity } = transforms
  return (
    <section ref={sectionRef} id="about" className="min-h-screen bg-black border-t border-gray-800 flex items-center relative overflow-hidden">
      {/* Cyan-themed Geometric Background Effects */}
      <div className="absolute inset-0">
        {/* Main Cyan Shapes */}
        <div 
          className="absolute w-24 h-24 border border-cyan-400/30 rounded-full animate-magical-pulse will-change-transform"
          style={{
            left: '15%',
            top: '20%',
            transform: `translateX(${transformedX * 0.12}px) translateY(${transformedY * 0.12}px) scale(${hoverScale})`,
            opacity: hoverOpacity
          }}
        ></div>
        
        <div 
          className="absolute w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-cyan-300/20 rotate-45 animate-magical-rotate will-change-transform"
          style={{
            right: '20%',
            top: '15%',
            transform: `translateX(${transformedX * -0.1}px) translateY(${transformedY * -0.1}px) rotate(${45 + transformedX * 0.2}deg)`,
            opacity: hoverOpacity * 1.2
          }}
        ></div>
        
        {/* Hexagonal Elements - Cyan Theme */}
        <div 
          className="absolute w-20 h-20 animate-magical-float will-change-transform"
          style={{
            left: '75%',
            bottom: '25%',
            transform: `translateX(${transformedX * 0.08}px) translateY(${transformedY * 0.08}px) rotate(${transformedX * 0.15}deg)`
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 animate-magical-pulse" 
               style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
        </div>
        
        {/* Additional Cyan Elements */}
        <div 
          className="absolute w-6 h-6 bg-cyan-400/40 rounded-full animate-magical-pulse will-change-transform"
          style={{
            left: '25%',
            bottom: '35%',
            transform: `translateX(${transformedX * 0.2}px) translateY(${transformedY * 0.2}px)`,
          }}
        ></div>
        
        <div 
          className="absolute w-12 h-12 border-2 border-cyan-300/25 rotate-45 animate-magical-rotate will-change-transform"
          style={{
            right: '15%',
            bottom: '40%',
            transform: `translateX(${transformedX * -0.15}px) translateY(${transformedY * -0.15}px) rotate(${45 + transformedX * 0.3}deg)`,
          }}
        ></div>
        
        <div 
          className="absolute w-8 h-8 border border-cyan-200/30 rounded-full animate-magical-float will-change-transform"
          style={{
            left: '10%',
            top: '60%',
            transform: `translateX(${transformedX * 0.18}px) translateY(${transformedY * 0.18}px)`,
          }}
        ></div>
        
        {/* Background Glow Effects */}
        <div className="absolute top-10 right-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-400/8 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 transition-opacity duration-300 will-change-transform"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgb(34 211 238) 1px, transparent 0)`,
            backgroundSize: '80px 80px',
            opacity: isHovering ? 0.08 : 0.04
          }}
        ></div>
        
        {/* Vertical Lines */}
        <div 
          className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent will-change-transform transition-all duration-300"
          style={{
            left: '30%',
            opacity: isHovering ? 0.4 : 0.2
          }}
        ></div>
        
        <div 
          className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-cyan-300/15 to-transparent will-change-transform transition-all duration-300"
          style={{
            right: '25%',
            opacity: isHovering ? 0.35 : 0.18
          }}
        ></div>
      </div>
      <div className="max-w-[1400px] mx-auto px-8 py-16 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal text-white mb-6">
            About Me
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate frontend developer with expertise in modern web technologies. 
            I love creating beautiful, functional, and accessible user interfaces.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-normal text-teal-400 mb-4">Experience & Skills</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                With over 3 years of experience in frontend development, I specialize in building 
                scalable React applications and creating smooth user experiences.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Core Technologies</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'React & Next.js', level: 95 },
                  { name: 'TypeScript', level: 90 },
                  { name: 'Tailwind CSS', level: 95 },
                  { name: 'Node.js', level: 80 }
                ].map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-teal-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-teal-500 to-teal-400 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%`, animationDelay: `${400 + index * 200}ms` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-teal-400 rounded-full mr-3"></div>
                <h4 className="text-lg font-medium text-white">Currently Available</h4>
              </div>
              <p className="text-gray-300 mb-6">
                I'm actively seeking new opportunities to work on exciting projects 
                and collaborate with innovative teams.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Based in Sri Lanka</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Available for remote work</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Open to freelance projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection