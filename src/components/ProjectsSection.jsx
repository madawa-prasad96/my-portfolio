import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react'

function ProjectsSection() {
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

  // Memoized transform calculations for emerald-themed effects
  const transforms = useMemo(() => {
    const mouseX = mousePosition.x
    const mouseY = mousePosition.y
    const hoverScale = isHovering ? 1.2 : 1
    const hoverOpacity = isHovering ? 0.6 : 0.3
    
    return {
      transformedX: (mouseX - 50) * 0.6,
      transformedY: (mouseY - 50) * 0.6,
      hoverScale,
      hoverOpacity
    }
  }, [mousePosition.x, mousePosition.y, isHovering])

  const { transformedX, transformedY, hoverScale, hoverOpacity } = transforms
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with real-time inventory management and secure payment processing.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'Live',
      year: '2024'
    },
    {
      title: 'Portfolio Dashboard',
      description: 'Interactive investment portfolio dashboard with real-time data visualization and market analysis.',
      tags: ['Next.js', 'TypeScript', 'Chart.js', 'API'],
      status: 'Development',
      year: '2024'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management application with drag-and-drop functionality and team collaboration.',
      tags: ['React', 'Firebase', 'Material-UI', 'PWA'],
      status: 'Live',
      year: '2023'
    }
  ]

  return (
    <section ref={sectionRef} id="projects" className="min-h-screen flex items-center bg-black border-t border-gray-800 relative overflow-hidden">
      {/* Emerald-themed Geometric Background Effects */}
      <div className="absolute inset-0">
        {/* Main Emerald Shapes */}
        <div 
          className="absolute w-32 h-32 border-2 border-emerald-400/25 rotate-45 animate-magical-rotate will-change-transform"
          style={{
            left: '10%',
            top: '25%',
            transform: `translateX(${transformedX * 0.1}px) translateY(${transformedY * 0.1}px) rotate(${45 + transformedX * 0.25}deg)`,
            opacity: hoverOpacity
          }}
        ></div>
        
        <div 
          className="absolute w-20 h-20 bg-gradient-to-br from-emerald-500/25 to-emerald-300/25 rounded-full animate-magical-pulse will-change-transform"
          style={{
            right: '15%',
            top: '20%',
            transform: `translateX(${transformedX * -0.12}px) translateY(${transformedY * -0.12}px) scale(${hoverScale})`,
            opacity: hoverOpacity * 1.3
          }}
        ></div>
        
        {/* Triangle Elements - Emerald Theme */}
        <div 
          className="absolute w-0 h-0 animate-magical-float will-change-transform"
          style={{
            left: '75%',
            bottom: '30%',
            transform: `translateX(${transformedX * 0.15}px) translateY(${transformedY * 0.15}px) rotate(${transformedX * 0.2}deg)`,
            borderLeft: '16px solid transparent',
            borderRight: '16px solid transparent',
            borderBottom: `24px solid rgba(16, 185, 129, ${hoverOpacity})`
          }}
        ></div>
        
        <div 
          className="absolute w-0 h-0 animate-magical-pulse will-change-transform"
          style={{
            right: '25%',
            bottom: '20%',
            transform: `translateX(${transformedX * -0.08}px) translateY(${transformedY * -0.08}px) rotate(${-transformedY * 0.15}deg)`,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: `18px solid rgba(16, 185, 129, ${hoverOpacity * 0.8})`
          }}
        ></div>
        
        {/* Additional Emerald Elements */}
        <div 
          className="absolute w-14 h-14 border border-emerald-300/30 rounded-full animate-magical-rotate will-change-transform"
          style={{
            left: '20%',
            bottom: '25%',
            transform: `translateX(${transformedX * 0.18}px) translateY(${transformedY * 0.18}px) rotate(${transformedX * 0.4}deg)`,
          }}
        ></div>
        
        <div 
          className="absolute w-8 h-8 bg-emerald-400/35 rotate-45 animate-magical-float will-change-transform"
          style={{
            right: '10%',
            top: '60%',
            transform: `translateX(${transformedX * -0.2}px) translateY(${transformedY * -0.2}px) rotate(${45 + transformedX * 0.3}deg)`,
          }}
        ></div>
        
        <div 
          className="absolute w-4 h-4 bg-gradient-to-r from-emerald-400/40 to-emerald-600/40 rounded-full animate-magical-pulse will-change-transform"
          style={{
            left: '30%',
            top: '70%',
            transform: `translateX(${transformedX * 0.25}px) translateY(${transformedY * 0.25}px)`,
          }}
        ></div>
        
        {/* Orbiting System */}
        <div 
          className="absolute w-16 h-16 animate-magical-rotate will-change-transform"
          style={{
            right: '30%',
            top: '70%',
            transform: `translateX(${transformedX * 0.05}px) translateY(${transformedY * 0.05}px)`
          }}
        >
          <div className="absolute w-2 h-2 bg-emerald-400/70 rounded-full top-0 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
          <div className="absolute w-2 h-2 bg-emerald-300/80 rounded-full bottom-0 right-0 animate-pulse" style={{ animationDelay: '0.7s' }}></div>
          <div className="absolute w-2 h-2 bg-emerald-500/70 rounded-full top-1/2 left-0 transform -translate-y-1/2 animate-pulse" style={{ animationDelay: '1.4s' }}></div>
        </div>
        
        {/* Background Glow Effects */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/12 rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 transition-opacity duration-300 will-change-transform"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgb(16 185 129) 1px, transparent 0)`,
            backgroundSize: '70px 70px',
            opacity: isHovering ? 0.1 : 0.05
          }}
        ></div>
        
        {/* Vertical Lines */}
        <div 
          className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/25 to-transparent will-change-transform transition-all duration-300"
          style={{
            left: '40%',
            opacity: isHovering ? 0.5 : 0.25
          }}
        ></div>
      </div>
      <div className="max-w-[1400px] mx-auto px-8 py-16 w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-normal text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A showcase of my recent work, featuring modern web applications built with cutting-edge technologies.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <article 
              key={project.title}
              className="group rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6 transition-all duration-500 hover:bg-gray-800/50 hover:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-teal-500/20 rounded-md border border-teal-500/40 flex items-center justify-center">
                    <div className="w-2 h-2 bg-teal-400 rounded-sm"></div>
                  </div>
                  <span className="text-xs text-teal-400 font-medium">{project.year}</span>
                </div>
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  project.status === 'Live' 
                    ? 'bg-teal-500/20 text-teal-400 border border-teal-500/30' 
                    : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <h3 className="text-lg font-bold mb-3 text-white group-hover:text-teal-300 transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-teal-500/10 text-teal-300 rounded-md text-xs font-medium border border-teal-500/20">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <a
                  className="flex-1 inline-flex h-9 items-center justify-center rounded-lg border border-teal-500/50 bg-teal-500/10 text-teal-300 font-medium text-sm transition-all duration-300 hover:bg-teal-500/20 hover:border-teal-400"
                  href="#"
                >
                  View Live
                </a>
                <a
                  className="flex-1 inline-flex h-9 items-center justify-center rounded-lg border border-gray-600 bg-gray-700/50 text-gray-300 font-medium text-sm transition-all duration-300 hover:bg-gray-600/50 hover:border-gray-500"
                  href="#"
                >
                  Source Code
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection