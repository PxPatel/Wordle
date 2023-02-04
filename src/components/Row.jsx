import React from 'react'
import Box from './Box'

const Row = (props) => {

    const { stateRow } = props

    const createRow = () => {

        let row = stateRow.map((spite) => {
            return <Box letter= { spite } />
        })

        return row
    }

  return (
    <div> { createRow } </div>
  )
}
  

export default Row