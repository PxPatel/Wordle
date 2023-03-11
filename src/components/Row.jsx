import React, { useRef } from 'react'
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
                fill= { styleState[rowNum][i] }
                toFlip= { rowStyle.flipRow === rowNum }
                flipDelay= { determineDelay(i) }
                key= { i } />
        })
        return row
    }

    const determineDelay = (i) => {
      if(i === 0){
        return 'animation-delay-[0ms]'
      }
      else if(i === 1){
        return 'animation-delay-[150ms]'
      }
      else if(i === 2){
        return 'animation-delay-[300ms]'
      }
      else if(i === 3){
        return 'animation-delay-[450ms]'
      }
      else if(i === 4){
        return 'animation-delay-[600ms]'
      }
    }
  
    return (
      <div 
        className={`flex place-content-center h-fit`}
        ref = { rowRef }> 
          { createRow()}
      </div>
  )
}
  

export default Row