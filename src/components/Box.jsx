import React, {useEffect , useRef, useState } from 'react'
import { colorScheme, FLIP_ANIMATION_DURATION } from '../util/constants'

const Box = ({ letter, isInvalid, fill, toFlip, delay, toBounce}) => {
  const boxRef = useRef()
  const [colorVal, setColorVal] = useState(`${colorScheme.Box.boxLight.empty} ${colorScheme.Box.boxDark.empty}`)
  const { Box } = colorScheme

  const freshLoadHasOldData = useRef(
    JSON.parse(window.sessionStorage.getItem('gameData'))?.storedPos?.currRow > 0 ? 1 : 0
  )

  useEffect(() => {
    if (letter !== `` && !freshLoadHasOldData.current) {
      const newClass = "animate-pop " + boxRef.current.className  
      boxRef.current.className = newClass
    }
  }, [letter])

  useEffect(() =>
  {
    //Try to manipulate the time paramater with bitwise logic and see if it simplifies code
    let timerID;
    if(fill !== `` && !freshLoadHasOldData.current){
      timerID = setTimeout(() => { 
        setColorVal( prev => fill) 
      }, (FLIP_ANIMATION_DURATION / 2)  + (delay.slice(16, delay.length) * 1))
    }
    else if(fill !== `` && freshLoadHasOldData.current){
      setColorVal(prev => fill)
    }
    return () => {
      clearTimeout(timerID)
    }
  }, [fill, delay])

  useEffect(() => {
    if(freshLoadHasOldData.current){
      freshLoadHasOldData.current = 0
    }
  }, []) 

  return (
    <div 
      className= {`boxRes letterRes centerStage m-1 border-box font-TMS ${Box.textDark} ${Box.textLight} border-2 ${letter ? `${Box.filledBorderLight} ${Box.filledBorderDark}` : `${Box.emptyBorderLight} ${Box.emptyBorderDark}`} ${isInvalid ? 'animate-shake border-red-700 dark:border-red-700' : ''} ${colorVal} ${delay} ${toFlip ? 'animate-flip' : ''} 
      ${toBounce ? 'animate-bounce' : ''}`}
      ref = {boxRef}> 
        {letter}


    </div>
  )
}

export default Box


