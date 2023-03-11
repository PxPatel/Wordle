import React, {useEffect, useRef } from 'react'

const Box = ({ letter, isInvalid, fill, toFlip, flipDelay}) => {

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
  }, [letter])
  
  return (
    <div 
      className= {`min-w-[60px] min-h-[60px] m-1 flex place-content-center place-items-center border-box font-TMS text-[2rem] text-white border-2 ${letter ? "border-[#3a3a3c]" : "border-[#565758]"} ${isInvalid ? 'animate-shake border-red-700' : ''} ${fill} ${ toFlip ? 'animate-flip' : '' } ${flipDelay}`}
      ref = {boxRef}>      
       {letter} 
    </div>
  )
}

export default Box


