import React, { useEffect, useRef } from 'react'
import { useGameState } from '../util/context'
import Box from './Box'

const Row = ({ stateRow, rowNum}) => {

    const { styleState, invalidRow, rowStyle } = useGameState()

    const rowRef = useRef(null)

    const createRow = () => {
        const row = stateRow.map((spite,i) => {
            return <Box 
                letter= { spite } 
                boxNum= { i }
                isInvalid = {invalidRow === rowNum}
                fill= { styleState[rowNum][i].colorState }
                toFlip= { styleState[rowNum][i].flipStatus }
                flipDelay= { handleDelay(i) }
                key= { i } />
        })
        return row
    }

    const handleDelay = (boxNum) => {
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
    }
  
    return (
      <div 
        className={`flex place-content-center h-fit ${ false && rowStyle.flipRow === rowNum ? 'animate-flip' : ''}`}
        ref = { rowRef }> 
          { createRow()}
      </div>
  )
}
  

export default Row