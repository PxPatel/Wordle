import React, { useCallback, useEffect, useRef, useState } from 'react'
import Row from './Row'
import { useGameState } from '../util/context'
import { colorScheme } from '../util/constants'
import Modal from './Modal'

const Game = () => {
  
  const { gameState, pauses, handleKeyChanges, realWord } = useGameState()
  const [focusOnMe, updateState] = useState()

  const [modalShow, setModalShow] = useState(true)

  const closeModal = useCallback(() => setModalShow(false), [])

  const { Game } = colorScheme
  
  const gameRef = useRef(null);
  useEffect(() => {

    if(gameRef.current){
      gameRef.current.focus();
    }
  }, [focusOnMe]);

  const forceUpdate = useCallback(() => updateState({}), [])
  
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
      onBlur= { forceUpdate }
      >
      { makeBoard() } 

      {(modalShow && !pauses.inPlay && !pauses.loading) && <Modal content={realWord} onClose= {closeModal}/>}

    </div>
  )
}

export default Game