import React, { useCallback, useEffect, useRef } from 'react'
import { useGameState } from '../util/context'

const Box = ({ letter, boxNum, isInvalid, fill, toFlip }) => {

  const boxRef = useRef()

  useEffect(() => {
    const handlePop = () => {
      if (letter !== "") {
        const newClass = "animate-pop " + boxRef.current.className
        boxRef.current.className = newClass
        setTimeout(() => {
          let idx = (boxRef.current.className).indexOf("animate-pop")
          let newClass = boxRef.current.className
          if (idx !== -1) {
            newClass = (boxRef.current.className).slice(0, idx) + (boxRef.current.className).slice(idx + 11)
          }
          boxRef.current.className = newClass
        }, 100)
      }
    }

    

    handlePop()
    // handleDelay()
  }, [letter])


  const handleDelay = () => {
    var delay;
    if(boxNum === 0){
      return 'animation-delay-[0ms]'
    }
    else if(boxNum === 1){
      return 'animation-delay-[150ms]'
    }
    else if(boxNum === 2){
      return 'animation-delay-[300ms]'
    }
    else if(boxNum === 3){
      return 'animation-delay-[450ms]'
    }
    else if(boxNum === 4){
      return 'animation-delay-[600ms]'
    }
    
    

    // if( (boxRef.current.className).indexOf("animation-delay") === -1){
    // const newClass = boxRef.current.className + delay
    // boxRef.current.className = newClass
    // }
  }
  
  return (
    <div 
      className= {` ${handleDelay()} min-w-[60px] min-h-[60px] m-1 flex place-content-center  place-items-center border-box font-TMS text-[2rem] text-white border-2 ${letter ? "border-[#3a3a3c]" : "border-[#565758]"} ${isInvalid ? 'animate-shake border-red-700' : ''} ${ fill } ${ toFlip ? 'animate-flip' : '' } `}
      ref = {boxRef}>      
       {letter} 
    </div>
  )
}

export default Box


