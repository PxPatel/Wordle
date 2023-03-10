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
                key= { i } />
        })
        return row
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