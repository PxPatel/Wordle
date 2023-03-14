import React, {useEffect, useRef, useState } from 'react'
import { FLIP_ANIMATION_DURATION } from '../util/constants'

const Box = ({ letter, isInvalid, fill, toFlip, flipDelay, boxNum, rowNum, toBounce}) => {

  const boxRef = useRef()
  const [colorFill, setColorFill] = useState('')


  //Counting number of renders for component
  // useEffect(() => {
  //   if(boxNum === 0 && rowNum === 0)
  //     console.count(`${letter}: `)
  // })

  useEffect(() => {
    const handlePop = () => {
      if (letter !== "") {
        const newClass = boxRef.current.className  + " animate-pop "
        boxRef.current.className = newClass
        setTimeout(() => {
          let idx = (boxRef.current.className).indexOf("animate-pop")
          let newClass = boxRef.current.className
          if (idx !== -1) {
            newClass = (boxRef.current.className).slice(0, idx) + (boxRef.current.className).slice(idx + 'animate-pop'.length)
          }
          boxRef.current.className = newClass
        }, 100)
      }
    }
    handlePop()
  }, [letter])

  useEffect(() =>
  {
    function toggleColor() {
      if(fill === 'bg-EMPTY'){ setColorFill(prev => fill) }
      else if(fill !== 'bg-EMPTY'){
        setTimeout(() => { 
          setColorFill( prev => fill) 
        }, (FLIP_ANIMATION_DURATION / 2)  + (flipDelay.slice(16,flipDelay.length) * 1))
      }
    }
    toggleColor()
  }, [fill, flipDelay])

  return (
    <div 
      className= {`min-w-[60px] min-h-[60px] m-1 centerStage place-items-center border-box font-TMS text-[2rem] text-white border-2 ${letter ? "border-[#3a3a3c]" : "border-[#565758]"} ${isInvalid ? 'animate-shake border-red-700' : ''} ${colorFill} ${flipDelay} ${toFlip ? 'animate-flip' : ''} 
      ${toBounce ? 'animate-bounce' : ''}`}
      ref = {boxRef}>      
       {letter} 
    </div>
  )
}

export default Box


