import React from 'react'
import Row from './Row'
import { useGameState } from '../util/context'


const Game = (props) => {

  const { gameState, currRow, handleKeyChanges } = useGameState()

  const makeBoard = () => {
    const board = gameState.map((row,i) => { 
      return <Row stateRow= {row} isActive= { i === currRow ? true : false } key= { i } rowKey= {i}/>
    })
    return board
  }

  // bg-[#145266]

  return (
    <div className='flex flex-1 flex-col justify-center content-center bg-[#121213] min-h-full min-w-screen' 
      onKeyDown={ handleKeyChanges }
      tabIndex={-1}
      >
      { makeBoard() }

    </div>
  )
}

export default Game