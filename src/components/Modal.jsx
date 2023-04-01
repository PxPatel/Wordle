import React from 'react'
import { colorScheme } from '../util/constants'

const Modal = ({content, onClose}) => {

  const { Modal } = colorScheme

  return (
    <div className={`modalRes centerStage absolute w-[30rem] h-[25rem] top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 
     ${Modal.bgLight} ${Modal.bgDark}`}>
        <div className= {`${Modal.textLight} ${Modal.textDark} text-4xl font-TMS tracking-wider`}>
            {content}
        </div>
        <button className={`absolute bottom-[60px] px-4 py-1 border-box rounded border-2 border-indigo-700 `} onClick={onClose}>Close</button>
    </div>
  )
}

export default Modal