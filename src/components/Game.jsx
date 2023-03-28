import React, { useCallback, useEffect, useRef, useState } from 'react'
import Row from './Row'
import { useGameState } from '../util/context'
import { colorScheme } from '../util/constants'
import Modal from './Modal'

const Game = () => {
  
  const { gameState, pauses, handleKeyChanges, realWord } = useGameState()
  
  const [modalShow, setModalShow] = useState(true)
  
  const closeModal = useCallback(() => setModalShow(false), [])
  
  const { Game } = colorScheme
  
  const gameRef = useRef(null);
  const [focusOnMe, updateState] = useState()
  useEffect(() => {

      if(gameRef.current){
      gameRef.current.focus();
      }

  }, [focusOnMe]);

  const updateFocus = useCallback(() => updateState({}), [])

  const makeBoard = () => {
    const board = gameState.map((row,i) => { 
      return <Row 
        stateRow= { row } 
        rowNum= { i }
        key= { i }/>
    })
    return board  
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

      {(modalShow && !pauses.inPlay && !pauses.loading || false) && <Modal content={realWord} onClose= {closeModal}/>}

    </div>
  )
}

export default Game