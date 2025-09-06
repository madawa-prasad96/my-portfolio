import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'

function ContactSection() {
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

  // Memoized transform calculations for teal-blue themed effects
  const transforms = useMemo(() => {
    const mouseX = mousePosition.x
    const mouseY = mousePosition.y
    const hoverScale = isHovering ? 1.25 : 1
    const hoverOpacity = isHovering ? 0.7 : 0.35
    
    return {
      transformedX: (mouseX - 50) * 0.4,
      transformedY: (mouseY - 50) * 0.4,
      hoverScale,
      hoverOpacity
    }
  }, [mousePosition.x, mousePosition.y, isHovering])

  const { transformedX, transformedY, hoverScale, hoverOpacity } = transforms
  return (
    <section ref={sectionRef} id="contact" className="min-h-screen flex items-center bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Teal-Blue themed Geometric Background Effects */}
      <div className="absolute inset-0">
        {/* Main Teal-Blue Shapes */}
        <div 
          className="absolute w-28 h-28 border-2 border-sky-400/30 rounded-full animate-magical-pulse will-change-transform"
          style={{
            left: '12%',
            top: '15%',
            transform: `translateX(${transformedX * 0.14}px) translateY(${transformedY * 0.14}px) scale(${hoverScale})`,
            opacity: hoverOpacity
          }}
        ></div>
        
        <div 
          className="absolute w-22 h-22 bg-gradient-to-br from-sky-500/20 to-teal-400/20 animate-magical-rotate will-change-transform"
          style={{
            right: '18%',
            top: '25%',
            transform: `translateX(${transformedX * -0.11}px) translateY(${transformedY * -0.11}px) rotate(${transformedX * 0.3}deg)`,
            opacity: hoverOpacity * 1.1,
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        ></div>
        
        {/* Star-like Elements */}
        <div 
          className="absolute animate-magical-float will-change-transform"
          style={{
            left: '70%',
            bottom: '35%',
            transform: `translateX(${transformedX * 0.16}px) translateY(${transformedY * 0.16}px) rotate(${transformedX * 0.2}deg)`
          }}
        >
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 bg-sky-400/30 rotate-45 animate-magical-pulse"></div>
            <div className="absolute inset-0 bg-teal-400/25 -rotate-45 animate-magical-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
        
        {/* Concentric Circles */}
        <div 
          className="absolute animate-magical-pulse will-change-transform"
          style={{
            right: '25%',
            bottom: '25%',
            transform: `translateX(${transformedX * -0.08}px) translateY(${transformedY * -0.08}px)`
          }}
        >
          <div className="w-16 h-16 border border-sky-300/25 rounded-full"></div>
          <div className="absolute inset-2 w-12 h-12 border border-teal-300/30 rounded-full animate-magical-rotate"></div>
          <div className="absolute inset-4 w-8 h-8 bg-sky-400/20 rounded-full animate-pulse"></div>
        </div>
        
        {/* Additional Elements */}
        <div 
          className="absolute w-6 h-6 bg-gradient-to-r from-sky-400/40 to-teal-400/40 rounded-full animate-magical-float will-change-transform"
          style={{
            left: '25%',
            bottom: '40%',
            transform: `translateX(${transformedX * 0.22}px) translateY(${transformedY * 0.22}px)`,
          }}
        ></div>
        
        <div 
          className="absolute w-10 h-10 border border-sky-200/25 rotate-45 animate-magical-rotate will-change-transform"
          style={{
            right: '12%',
            top: '60%',
            transform: `translateX(${transformedX * -0.18}px) translateY(${transformedY * -0.18}px) rotate(${45 + transformedX * 0.4}deg)`,
          }}
        ></div>
        
        <div 
          className="absolute w-5 h-5 bg-teal-400/35 rounded-full animate-magical-pulse will-change-transform"
          style={{
            left: '15%',
            top: '70%',
            transform: `translateX(${transformedX * 0.2}px) translateY(${transformedY * 0.2}px)`,
          }}
        ></div>
        
        {/* Wave-like Pattern */}
        <div 
          className="absolute w-24 h-24 animate-magical-float will-change-transform"
          style={{
            left: '35%',
            top: '75%',
            transform: `translateX(${transformedX * 0.06}px) translateY(${transformedY * 0.06}px)`
          }}
        >
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-sky-400/30 to-transparent mb-2 animate-magical-pulse"></div>
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-teal-400/25 to-transparent mb-2 animate-magical-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-sky-300/20 to-transparent animate-magical-pulse" style={{ animationDelay: '0.6s' }}></div>
        </div>
        
        {/* Background Glow Effects */}
        <div className="absolute top-20 right-10 w-80 h-80 bg-sky-500/8 rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1.8s' }}></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 transition-opacity duration-300 will-change-transform"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgb(14 165 233) 1px, transparent 0)`,
            backgroundSize: '90px 90px',
            opacity: isHovering ? 0.06 : 0.03
          }}
        ></div>
        
        {/* Flowing Lines */}
        <div 
          className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-sky-400/15 to-transparent will-change-transform transition-all duration-300"
          style={{
            left: '60%',
            opacity: isHovering ? 0.3 : 0.15
          }}
        ></div>
        
        <div 
          className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-teal-300/12 to-transparent will-change-transform transition-all duration-300"
          style={{
            right: '40%',
            opacity: isHovering ? 0.25 : 0.12
          }}
        ></div>
      </div>
      <div className="max-w-[1400px] mx-auto px-8 py-16 text-center relative z-10">
        <div className="">
          <h2 className="text-4xl md:text-5xl font-normal text-white mb-8">
            Let's Build Something Amazing
          </h2>
        </div>
        <div className="">
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Ready to bring your ideas to life? I'm always excited to work on new projects 
            and collaborate with creative teams. Let's connect!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 group hover:bg-gray-800/50 transition-all duration-300">
            <div className="w-8 h-8 bg-teal-500/20 rounded-lg border border-teal-500/40 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
            <p className="text-gray-400 text-sm mb-4">Drop me a line anytime</p>
            <a href="mailto:madawa@example.com" className="text-teal-400 font-medium hover:text-teal-300 transition-colors duration-300">
              madawa@example.com
            </a>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 group hover:bg-gray-800/50 transition-all duration-300">
            <div className="w-8 h-8 bg-teal-500/20 rounded-lg border border-teal-500/40 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">LinkedIn</h3>
            <p className="text-gray-400 text-sm mb-4">Let's connect professionally</p>
            <a href="https://linkedin.com/in/madawa" target="_blank" rel="noopener noreferrer" className="text-teal-400 font-medium hover:text-teal-300 transition-colors duration-300">
              /in/madawa-prasad
            </a>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 group hover:bg-gray-800/50 transition-all duration-300">
            <div className="w-8 h-8 bg-teal-500/20 rounded-lg border border-teal-500/40 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">GitHub</h3>
            <p className="text-gray-400 text-sm mb-4">Check out my code</p>
            <a href="https://github.com/madawa" target="_blank" rel="noopener noreferrer" className="text-teal-400 font-medium hover:text-teal-300 transition-colors duration-300">
              @madawa
            </a>
          </div>
        </div>
        
        <div className="">
          <a
            className="group inline-flex h-12 items-center justify-center rounded-lg bg-teal-600 hover:bg-teal-700 px-8 text-white font-semibold transition-all duration-300 hover:scale-105"
            href="mailto:madawa@example.com"
          >
            <svg className="mr-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="group-hover:translate-x-1 transition-transform duration-300">Start a Conversation</span>
          </a>
          <p className="text-gray-400 text-sm mt-4">
            Usually responds within 24 hours
          </p>
        </div>
      </div>
    </section>
  )
}

export default ContactSection