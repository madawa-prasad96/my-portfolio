import React from 'react'

function CurtainEffect({ isTransformed }) {
  return (
    <>
      {isTransformed && (
        <>
          <div 
            className={`fixed top-0 left-0 w-1/2 h-full bg-white z-40 transition-transform duration-2000 ${
              isTransformed ? '-translate-x-full' : 'translate-x-0'
            }`}
          />
          <div 
            className={`fixed top-0 right-0 w-1/2 h-full bg-white z-40 transition-transform duration-2000 ${
              isTransformed ? 'translate-x-full' : 'translate-x-0'
            }`}
          />
        </>
      )}
    </>
  )
}

export default CurtainEffect