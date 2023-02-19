import React from 'react'
import Box from './Box'

const Row = (props) => {

    const { stateRow, isActive, rowKey} = props

    const createRow = () => {
        const row = stateRow.map((spite,i) => {
            return <Box letter= { spite } isActive= {isActive} key= { i } inRow= { rowKey }/>
        })

        return row
    }

  return (
      <div className='flex justify-center content-center h-fit'> 
          { createRow() } 
      </div>
  )
}
  

export default Row