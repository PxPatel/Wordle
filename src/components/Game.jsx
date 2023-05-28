import React, { useCallback, useRef, useState } from 'react'
import Row from './Row'
import useFocusOnMe from '../hooks/useAutoFocus'
import { useGameState } from '../util/context'
import { FLIP_DELAY_BETWEEN_TILE, colorScheme } from '../util/constants'
import Modal from './Modal'
import Box from './Box'

const Game = () => {
  
  const { gameBoard, pauses, handleKeyChanges, realWord, styleState, rowStyle } = useGameState()
  const { Game } = colorScheme

  const [modalShow, setModalShow] = useState(true)
  const closeModal = useCallback(() => setModalShow(false), [])

  const gameRef = useRef(null);
  const [ updateFocus ] = useFocusOnMe(gameRef)

  const makeBoard = () => {
    return gameBoard.map((row, rowNum) =>
    <Row 
      stateRow = { row }
      rowNum = { rowNum }
      key= { rowNum }/>

      /* { 
        row.map((spite,j) =>
            <Box
            letter= { spite } 
            boxNum= { j }
            rowNum= { j }
            isInvalid = {rowStyle.invalidRow === rowNum}
            fill= { styleState[rowNum][j] }
            toFlip= { rowStyle.flipRow === rowNum }
            toBounce= { rowStyle.bounceRow === rowNum }
            delay= { rowStyle.flipRow === rowNum  || rowStyle.bounceRow === rowNum  ? `animation-delay-${FLIP_DELAY_BETWEEN_TILE*j}`: ''}
            key= { `${rowNum}${j}` } /> )
      } */

      // </Row>
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