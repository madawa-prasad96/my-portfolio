import React from 'react'

function InitialView({ isTransformed, scrollPosition }) {
  return (
    <div 
      className={`fixed inset-0 w-full z-50 bg-[white] transition-all duration-2000 ${
        isTransformed ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ 
        fontFamily: 'Times New Roman, serif',
        cursor: isTransformed ? 'none' : 'auto'
      }}
    >
      {/* Perfect center container */}
      <div className="flex items-center justify-center min-h-screen p-4 w-full">
        {/* Content block - ensure proper layout on both mobile and desktop */}
        {/* <div className="w-full max-w-lg"> */}
          {/* Mobile: flex-col (image top, text bottom) | Desktop: flex-row (text left, image right) */}
          <div className="flex md:flex-row flex-col gap-4 md:gap-6">
            
            {/* Text Content - Mobile: order-2 (bottom), Desktop: order-1 (left) */}
            <div className="text-center md:text-left order-2 md:order-1 md:flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-[black] mb-3">Madawa Prasad</h1>
              
              <div className="text-[black] text-xs md:text-sm leading-normal">
                <p className="mb-2 font-medium">Frontend Developer</p>
                <p className="mb-2">Expert in React, TypeScript, and modern web technologies.</p>
                
                <div className="text-xs mb-2 space-y-1">
                  <p>• E-Commerce Platform</p>
                  <p>• Portfolio Dashboard</p>
                  <p>• Task Management App</p>
                </div>
                
                <div className="text-xs space-y-1">
                  <p>madawa@example.com</p>
                  <p>linkedin.com/in/madawa-prasad</p>
                  <p>github.com/madawa</p>
                </div>
              </div>
            </div>
            
            {/* Image - Mobile: order-1 (top), Desktop: order-2 (right) */}
            <div className="flex-shrink-0 order-1 md:order-2 flex flex-col items-center justify-center">
              <img
                src="madawa.png"
                alt="Madawa Prasad"
                className="w-[400px] h-[200px] border-2 border-black"
                style={{ filter: 'none' }}
              />
               {/* Scroll indicator */}
      {!isTransformed && scrollPosition < 5 && (
        <div className="">
          <p className="text-gray-600 text-[50px] animate-pulse">Scroll to continue...</p>
        </div>
      )}
            </div>
            
          </div>
         
        {/* </div> */}
      </div>
      
      
    </div>
  )
}

export default InitialView