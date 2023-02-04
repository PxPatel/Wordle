import React from 'react'
import Box from './Box'

const Row = (props) => {

    const { stateRow } = props

    const createRow = () => {

        var i = -1

        const row = stateRow.map((spite) => {
            i++
            return <Box letter= { spite } key= { i } />
        })

        return row
    }

  return (
    <div className='flex justify-center content-center h-20'> 
        { createRow() } 
    </div>
  )
}
  

export default Row