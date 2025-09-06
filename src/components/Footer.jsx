import React from 'react'

function Footer({ handleNavClick }) {
  return (
    <footer className="border-t border-gray-800 bg-black">
      <div className="max-w-[1120px] mx-auto px-5 py-8">
        <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Madawa Prasad</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Full stack engineer passionate about creating exceptional digital experiences.
            </p>
          </div>
          <div>
            <h4 className="text-base font-semibold text-white mb-2">Quick Links</h4>
            <div className="space-y-1">
              <a 
                href="#hero" 
                className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                onClick={(e) => handleNavClick(e, 'hero')}
              >
                Home
              </a>
              <a 
                href="#about" 
                className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                onClick={(e) => handleNavClick(e, 'about')}
              >
                About
              </a>
              <a 
                href="#projects" 
                className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                onClick={(e) => handleNavClick(e, 'projects')}
              >
                Projects
              </a>
              <a 
                href="#contact" 
                className="block text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                Contact
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-base font-semibold text-white mb-2">Connect</h4>
            <div className="flex justify-center md:justify-start space-x-3">
              <a href="mailto:wdmprasad96@gmail.com" className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors duration-300 group">
                <svg className="w-4 h-4 text-slate-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/madawa-prasad/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors duration-300 group">
                <svg className="w-4 h-4 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://github.com/madawa-prasad96" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center hover:bg-slate-600 transition-colors duration-300 group">
                <svg className="w-4 h-4 text-slate-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700/50 mt-6 pt-4 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} Madawa Prasad. Crafted with ❤️ using React & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer