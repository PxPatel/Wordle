import React from 'react'
import Row from './Row'
import { useGameState } from '../util/context'


const Game = (props) => {

  const { gameState, inPlay } = useGameState()

  const makeBoard = (gameState) => {
    const board = gameState.map(row => {
      <Row stateRow= {row}/>
    })

    return board
  }

  return (
    <div>{ makeBoard }</div>
  )
}

export default Game