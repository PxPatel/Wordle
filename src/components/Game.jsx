import React, { useCallback, useEffect, useRef, useState } from 'react'
import Row from './Row'
import { useGameState } from '../util/context'
import { colorScheme } from '../util/constants'
import Modal from './Modal'

const Game = () => {
  
  const { gameState, pauses, handleKeyChanges, realWord } = useGameState()
  const gameRef = useRef(null);
  
  const [modalShow, setModalShow] = useState(true)
  
  const closeModal = useCallback(() => setModalShow(false), [])
  
  const { Game } = colorScheme
  
  // const [focusOnMe, updateState] = useState()
  // useEffect(() => {

  //   if(gameRef.current){
  //     gameRef.current.focus();
  //   }
  // }, [focusOnMe]);

  // const forceUpdate = useCallback(() => updateState({}), [])
  
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
      // onBlur= { forceUpdate }
      >
      { makeBoard() }
        
      {/* <Row stateRow= {gameState[0]} rowNum={0} key= {0}/>
      <Row stateRow= {gameState[1]} rowNum={1} key= {1}/>
      <Row stateRow= {gameState[2]} rowNum={2} key= {2}/>
      <Row stateRow= {gameState[3]} rowNum={3} key= {3}/>
      <Row stateRow= {gameState[4]} rowNum={4} key= {4}/>
      <Row stateRow= {gameState[5]} rowNum={5} key= {5}/> */}

      {(modalShow && !pauses.inPlay && !pauses.loading || true) && <Modal content={realWord} onClose= {closeModal}/>}

    </div>
  )
}

export default Game