import React from 'react'
import Box from './Box'

const Row = (props) => {

    const { gameState, active } = props

    const createRow = () => {

        let row = gameState.map((spite) => {
            return <Box letter= { spite } />
        })

        return row
    }

  return (
    <div> { createRow } </div>
  )
}
  

export default Row