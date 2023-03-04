import React from 'react'
import { useGameState } from '../util/context'
import Box from './Box'

const Row = ({ stateRow, rowNum}) => {

    const { styleState, invalidRow } = useGameState()

    const createRow = () => {
        const row = stateRow.map((spite,i) => {
            return <Box 
                letter= { spite } 
                // rowNum = { rowNum } 
                // boxNum = { i }
                isInvalid = {invalidRow === rowNum}
                fill= { styleState[rowNum][i][0] } 
                toPop = { styleState[rowNum][i][1]}
                key= { i } />
        })
        return row
    }   

    return (
      <div className={`flex place-content-center h-fit`}> 
          { createRow() } 
      </div>
  )
}
  

export default Row