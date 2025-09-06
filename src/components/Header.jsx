import React, { useState } from 'react'

function Header({ handleNavClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileNavClick = (e, targetId) => {
    handleNavClick(e, targetId)
    setIsMobileMenuOpen(false) // Close mobile menu after navigation
  }
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <nav className="max-w-[1400px] mx-auto flex items-center justify-between p-6">
        <a 
          className="text-2xl font-bold text-teal-400" 
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          Portfolio
        </a>
        <div className="hidden md:flex items-center space-x-8">
          {/* Navigation Links */}
          <nav className="flex items-center space-x-6">
            <a 
              href="#about" 
              className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm font-medium"
              onClick={(e) => handleNavClick(e, 'about')}
            >
              About
            </a>
            <a 
              href="#projects" 
              className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm font-medium"
              onClick={(e) => handleNavClick(e, 'projects')}
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="text-gray-300 hover:text-teal-400 transition-colors duration-300 text-sm font-medium"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Contact
            </a>
          </nav>
          
          {/* Status Indicator */}
          <div className="flex items-center space-x-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
            <span className="text-teal-400 text-sm font-medium">Available for work</span>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-teal-400 hover:text-teal-300 transition-colors duration-300 z-60"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <svg 
            className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 z-40 bg-[black/80] backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile Menu Panel */}
          <div className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 border-l border-gray-800 shadow-2xl transform transition-transform duration-300 ease-out">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6">
              <h3 className="text-md font-semibold text-white">Navigation</h3>
            </div>
            
            {/* Navigation Links */}
            <nav className="flex flex-col p-6 space-y-2 bg-[black] backdrop-blur-md">
              <a 
                href="#about" 
                className="group flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-teal-500/10 border border-transparent hover:border-teal-500/30 transition-all duration-200"
                onClick={(e) => handleMobileNavClick(e, 'about')}
              >
                <div className="w-2 h-2 rounded-full bg-teal-400 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="font-medium">About Me</span>
              </a>
              <a 
                href="#projects" 
                className="group flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-teal-500/10 border border-transparent hover:border-teal-500/30 transition-all duration-200"
                onClick={(e) => handleMobileNavClick(e, 'projects')}
              >
                <div className="w-2 h-2 rounded-full bg-teal-400 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="font-medium">Projects</span>
              </a>
              <a 
                href="#contact" 
                className="group flex items-center px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-teal-500/10 border border-transparent hover:border-teal-500/30 transition-all duration-200"
                onClick={(e) => handleMobileNavClick(e, 'contact')}
              >
                <div className="w-2 h-2 rounded-full bg-teal-400 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <span className="font-medium">Contact</span>
              </a>
            </nav>
            
            {/* Divider */}
            <div className="mx-6 my-[-10px] border-t border-gray-800"></div>
            
            {/* Status Section */}
            <div className="p-6 bg-[black] backdrop-blur-md  rounded-b-lg">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl px-4 pt-3">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse"></div>
                  <span className="text-teal-400 text-sm font-semibold">Available for work</span>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
          </div>
        </>
      )}
    </header>
  )
}

export default Header