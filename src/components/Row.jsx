import React from 'react'
import { useGameState } from '../util/context'
import Box from './Box'

const Row = ({ stateRow, rowNum}) => {

    const { styleState, rowStyle } = useGameState()

    const createRow = () => {
        const row = stateRow.map((spite,i) => {
            return <Box 
                letter= { spite } 
                boxNum= { i }
                rowNum= { rowNum }
                isInvalid = {rowStyle.invalidRow === rowNum}
                fill= { styleState[rowNum][i] }
                toFlip= { rowStyle.flipRow === rowNum }
                flipDelay= { rowStyle.flipRow === rowNum ? `animation-delay-${150*i}`: ''}
                key= { i } />
        })
        return row
    }

    return (
      <div className={`centerStage h-fit`}>
          { createRow()}
      </div>
  )
}
  

export default Row