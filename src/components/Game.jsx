import React, { useEffect, useRef, useState } from 'react'
import Row from './Row'
import { useGameState } from '../util/context'
import { colorScheme } from '../util/constants'

const Game = () => {
  
  const { gameState, pauses, handleKeyChanges } = useGameState()
  const [focusOnMe, updateState] = useState()
  const gameRef = useRef(null);

  const { Game } = colorScheme

  useEffect(() => {

    if(gameRef.current){
      gameRef.current.focus();
    }
  }, [focusOnMe]);

  const forceUpdate = React.useCallback(() => updateState({}), [])
  
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
      // className={`relative flex-1 ${Game.bgLight} ${Game.bgDark} min-h-full min-w-screen outline-none`}
      className={`relative centerStage flex-col flex-1 ${Game.bgLight} ${Game.bgDark} min-h-fit min-w-screen outline-none`}
      onKeyDown={ pauses.inPlay && !pauses.loading ? handleKeyChanges : undefined }
      tabIndex={-1}
      ref= { gameRef }
      onBlur= { forceUpdate }
      >
        { makeBoard() } 
    </div>
  )
}

export default Game