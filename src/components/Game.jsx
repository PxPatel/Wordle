import React from 'react'
import Row from './Row'
import { useGameState } from '../util/context'


const Game = (props) => {

  const { gameState, inPlay } = useGameState()

  const makeBoard = () => {

    var i = -1
    const board = gameState.map(row => { 
      i++
      return <Row stateRow= {row} key= { i }/>
    })

    console.log(board)
    return board
  }

  return (
    <div className='flex content-center flex-col justify-center bg-blue-200 min-h-screen min-w-screen' >
      { makeBoard() }
    </div>
  )
}

export default Game