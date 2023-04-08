import React, { useCallback, useEffect, useRef, useState } from 'react'
import Row from './Row'
import useFocusOnMe from '../hooks/useAutoFocus'
import { useGameState } from '../util/context'
import { colorScheme } from '../util/constants'
import Modal from './Modal'

const Game = () => {
  
  const { gameBoard, pauses, handleKeyChanges, realWord } = useGameState()
  const { Game } = colorScheme

  const [modalShow, setModalShow] = useState(true)
  const closeModal = useCallback(() => setModalShow(false), [])

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
      className={`relative centerStage flex-col flex-1 ${Game.bgLight} ${Game.bgDark} min-h-fit min-w-screen outline-none`}
      onKeyDown={ pauses.inPlay && !pauses.loading ? handleKeyChanges : undefined }
      tabIndex={-1}
      ref= { gameRef }
      onBlur= { updateFocus }
      >
      { makeBoard() }

      {((modalShow && !pauses.inPlay && !pauses.loading) || false) && <Modal content={realWord} onClose= {closeModal}/>}

    </div>
  )
}


export default Game