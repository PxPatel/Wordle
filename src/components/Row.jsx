import React from 'react'
import { useGameState } from '../util/context'
import Box from './Box'

const Row = ({ stateRow, rowNum}) => {

    const { colorState, invalidRow } = useGameState()

    const createRow = () => {
        const row = stateRow.map((spite,i) => {
            return <Box 
                letter= { spite } 
                invalid= { invalidRow === rowNum } 
                fill= { colorState[rowNum][i] } 
                key= { i } />
        })
        return row
    }   

    return (
      <div className={`flex place-content-center w-full h-fit`}> 
          { createRow() } 
      </div>
  )
}
  

export default Row