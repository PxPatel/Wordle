import React from 'react'
import { colorScheme } from '../util/constants'

const Modal = ({content, onClose}) => {

  const { Modal } = colorScheme

  return (
    <div className={`centerStage absolute w-[36rem] h-[30rem] top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 
     ${Modal.bgLight} ${Modal.bgDark}`}>
        <div className= {`${Modal.textLight} ${Modal.textDark}`}>
            {content}
        </div>
        <button onClick={onClose}>Close</button>
    </div>
  )
}

export default Modal