import React from 'react'

const Modal = ({content, onClose}) => {

  return (
    <div className='centerStage absolute w-24 h-12 bg-black bg-opacity-80'>
        <button onClick={onClose}>Hello</button>

        <div className= 'text-white'>
            {content}
        </div>

        
    </div>
  )
}

export default Modal