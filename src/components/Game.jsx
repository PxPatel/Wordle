import React, { useEffect, useRef, useState } from 'react'
import Row from './Row'
import { useGameState } from '../util/context'

const Game = () => {
  
  const { gameState, pauses, handleKeyChanges } = useGameState()
  const [focusOnMe, updateState] = useState()
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) {
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

  // bg-[#145266]
  return (
    <div className='flex flex-1 flex-col relative place-content-center bg-[#121213] min-h-full min-w-screen outline-none' 
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