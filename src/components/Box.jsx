import React, {useEffect , useLayoutEffect, useRef, useState } from 'react'
import { colorScheme, FLIP_ANIMATION_DURATION } from '../util/constants'

const Box = ({ letter, isInvalid, fill, toFlip, delay, toBounce}) => {
  const boxRef = useRef()
  const [colorVal, setColorVal] = useState(`${colorScheme.Box.boxLight.empty} ${colorScheme.Box.boxDark.empty}`)
  const { Box } = colorScheme

  const onMountHasOldData = useRef(
    JSON.parse(window.sessionStorage.getItem('gameData'))?.storedPos?.currRow > 0 ? 1 : 0
  )

  useEffect(() => {
    if (letter !== `` && !onMountHasOldData.current) {
      const newClass = "animate-pop " + boxRef.current.className  
      boxRef.current.className = newClass
    }
  }, [letter])

  useLayoutEffect(() =>
  {
    //Try to manipulate the time paramater with bitwise logic and see if it simplifies code
    let timerID;
    if(fill !== `` && !onMountHasOldData.current){
      timerID = setTimeout(() => { 
        setColorVal( prev => fill) 
      }, (FLIP_ANIMATION_DURATION / 2)  + (delay.slice(16, delay.length) * 1))
    }
    else if(fill !== `` && onMountHasOldData.current){
      setColorVal(prev => fill)
    }
    return () => {
      clearTimeout(timerID)
    }
  }, [fill, delay])

  useEffect(() => {
    if(onMountHasOldData.current){
      onMountHasOldData.current = 0
    }
  }, []) 

  return (
    <div 
      className= {`boxRes letterRes centerStage m-1 border-box font-TMS ${Box.boxLight.text} ${Box.boxDark.text} border-2 ${letter ? `${Box.boxLight.filledBorder} ${Box.boxDark.filledBorder}` : `${Box.boxLight.emptyBorder} ${Box.boxDark.emptyBorder}`} ${isInvalid ? 'animate-shake border-red-700 dark:border-red-700' : ''} ${colorVal} ${delay} ${toFlip ? 'animate-flip' : ''} 
      ${toBounce ? 'animate-bounce' : ''}`}
      ref = {boxRef}> 
        {letter}


    </div>
  )
}

export default Box


