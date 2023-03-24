import React, {useEffect , useRef, useState } from 'react'
import { colorScheme, FLIP_ANIMATION_DURATION } from '../util/constants'

const Box = ({ letter, isInvalid, fill, toFlip, delay, toBounce}) => {

  const boxRef = useRef()
  const [colorVal, setColorVal] = useState(`${colorScheme.Box.boxLight.empty} ${colorScheme.Box.boxDark.empty}`)
  const { Box } = colorScheme

  useEffect(() => {
    if (letter !== ``) {
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
  }, [letter])

  useEffect(() =>
  {
    if(fill !== ``){
      setTimeout(() => { 
        setColorVal( prev => fill) 
      }, (FLIP_ANIMATION_DURATION / 2)  + (delay.slice(16, delay.length) * 1))
    }
  }, [fill, delay])

  return (
    <div 
      className= {`centerStage min-w-[60px] min-h-[60px] m-1 border-box font-TMS ${Box.textDark} ${Box.textLight} text-[2rem] border-2 ${letter ? Box.filledBorderDark : Box.emptyBorderDark} ${isInvalid ? 'animate-shake border-red-700 dark:border-red-700' : ''} ${colorVal} ${delay} ${toFlip ? 'animate-flip' : ''} 
      ${toBounce ? 'animate-bounce' : ''}`}
      ref = {boxRef}>      
      {letter} 
    </div>
  )
}

export default Box


