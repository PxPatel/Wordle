import React from 'react'
import { FLIP_DELAY_BETWEEN_TILE } from '../util/constants'
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
                toBounce= { rowStyle.bounceRow === rowNum }
                flipDelay= { rowStyle.flipRow === rowNum  || rowStyle.bounceRow === rowNum  ? `animation-delay-${FLIP_DELAY_BETWEEN_TILE*i}`: ''}
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