import React, { useEffect, useRef } from 'react'
import { useGameState } from '../util/context'
import Box from './Box'

const Row = ({ stateRow, rowNum}) => {

    const { styleState, invalidRow, flipRow, rowStyle } = useGameState()

    const rowRef = useRef(null)

    const createRow = () => {
        const row = stateRow.map((spite,i) => {
            return <Box 
                letter= { spite } 
                // rowNum = { rowNum } 
                // boxNum = { i }
                isInvalid = {rowStyle.invalidRow === rowNum}
                fill= { styleState[rowNum][i][0] } 
                toPop = { styleState[rowNum][i][1]}
                key= { i } />
        })
        return row
    }   
    

    // useEffect(() =>{
    //     console.log(rowStyle.invalidRow)
    //     console.log(rowNum)
    //     console.log(rowStyle.invalidRow === rowNum)
    // }, [rowStyle])

    return (
      <div 
        className={`flex place-content-center h-fit ${ flipRow === rowNum ? 'animate-flip' : ''}`}
        ref = { rowRef }> 
          { createRow()}
      </div>
  )
}
  

export default Row