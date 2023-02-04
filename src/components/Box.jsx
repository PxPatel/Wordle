import React from 'react'
import PropTypes from 'prop-types'

const Box = (props) => {
  return (
    <div className= 'flex content-center justify-center bg-slate-400 w-20 h-20 border-2 border-white'>
      { props.letter }
    </div>
  )
}

export default Box
