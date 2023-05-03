import React, {memo} from 'react'
import { FLIP_DELAY_BETWEEN_TILE } from '../util/constants'
import { useGameState } from '../util/context'
import Box from './Box'


const arePropsEqual = (oldProps, newProps, children) => {
    const rows = oldProps.rowNum === newProps.rowNum 
    const arr = (
        (newProps.stateRow).every((value, index) => {
            return value === (oldProps.stateRow)[index]
        })) 
    const isChildren = children && true

    return rows && arr
}

const Row = ({ stateRow, rowNum, children}) => {

    // const { styleState, rowStyle } = useGameState()

    // const createRow = () => {
    //     return stateRow.map((spite,i) =>
    //         <Box 
    //         letter= { spite } 
    //         boxNum= { i }
    //         rowNum= { rowNum }
    //         isInvalid = {rowStyle.invalidRow === rowNum}
    //         fill= { styleState[rowNum][i] }
    //         toFlip= { rowStyle.flipRow === rowNum }
    //         toBounce= { rowStyle.bounceRow === rowNum }
    //         delay= { rowStyle.flipRow === rowNum  || rowStyle.bounceRow === rowNum  ? `animation-delay-${FLIP_DELAY_BETWEEN_TILE*i}`: ''}
    //         key= { `${rowNum}${i}` } />
    //     )
    // }

    return (
      <div className={`centerStage w-full h-fit`}>
          {/* { createRow()} */}
          { children }
      </div>
  )
}

export default memo(Row, arePropsEqual)