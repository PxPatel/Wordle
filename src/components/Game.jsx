/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react'
import Row from './Row'
import useFocusOnMe from '../hooks/useAutoFocus'
import { useGameState } from '../util/context'
import Modal from './Modal'
import Keyboard from './Keyboard'

const Game = () => {
  
  const { gameBoard, pauses, handleKeyChanges, realWord, rowStyle } = useGameState()

  const [modalShow, setModalShow] = useState(true)  

  // const keyboardKeyPress = useCallback((e) => {
  //   handleKeyChanges(e)
  // }, [])


  const gameRef = useRef(null);
  const [ updateFocus ] = useFocusOnMe(gameRef)

  const makeBoard = () => {
    return gameBoard.map((row,i) =>
    <Row 
      stateRow= { row } 
      rowNum= { i }
      key= { i }/>
    )
  }

  return (
    <div 
      className={`relative centerStage flex-col flex-1 bg-transparent outline-none`}
      onKeyDown={ pauses.inPlay && !pauses.loading ? handleKeyChanges : undefined }
      tabIndex={-1}
      ref= { gameRef }
      onBlur= { updateFocus }
      >
  
      { makeBoard() }
      
      <Keyboard 
        rowEntered={rowStyle.flipRow}
        // keyboardKeyPress={keyboardKeyPress}
        />

      {((modalShow && !pauses.inPlay && !pauses.loading) || false) && <Modal content={realWord} onClose= {(() => setModalShow(false))}/>}

    </div>
  )
}


export default Game