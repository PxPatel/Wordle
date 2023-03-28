import React, {memo, useEffect, useRef} from 'react'
import { FLIP_DELAY_BETWEEN_TILE } from '../util/constants'
import { useGameState } from '../util/context'
import Box from './Box'


const arePropsEqual = (oldProps, newProps) => {
    const rows = oldProps.rowNum === newProps.rowNum 
    const arr = (
        newProps.stateRow.every((value, index) => {
            return value === oldProps.stateRow[index]
        })) 

    return rows && arr
}

const PE2 = (prevProps, nextProps) => {
    const sameRow = prevProps.rowNum === nextProps.rowNum 
    const sameArr = (prevProps.stateRow).every((value, index) => {
        return value === (nextProps.stateRow).at(index)
    })

    console.log(prevProps.rowNum + " " + (sameArr && sameRow))
    return sameArr && sameRow
}

const Row = 
memo(({ stateRow, rowNum}) => {

    console.log(rowNum);

    const oldProps = useRef({stateRow, rowNum})
    const newProps = useRef({stateRow, rowNum})

    // useEffect(() => {
    //     console.log(rowNum + ' Rendering')
    // })

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
                delay= { rowStyle.flipRow === rowNum  || rowStyle.bounceRow === rowNum  ? `animation-delay-${FLIP_DELAY_BETWEEN_TILE*i}`: ''}
                key= { i } />
        })
        return row
    }

    return (
      <div className={`centerStage w-full h-fit`}>
          { createRow()}
      </div>
  )
}, PE2)

export default Row