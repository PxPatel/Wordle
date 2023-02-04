import React from 'react'
import PropTypes from 'prop-types'

const Box = (props) => {
  return (
    <div>{ props.letter }</div>
  )
}

Box.propTypes = {
  letter: PropTypes.string
}

export default Box
