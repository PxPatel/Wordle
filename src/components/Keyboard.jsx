/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useLayoutEffect, useRef, useMemo, useState } from 'react'
import { FULL_FLIP_WAIT, keyboardLayout, colorScheme } from '../util/constants'
import { useImmer } from 'use-immer'

const colorWeight = {
  [colorScheme.Keyboard.tileColors.absent] : 0,
  [colorScheme.Keyboard.tileColors.present] : 1,
  [colorScheme.Keyboard.tileColors.correct]: 2
}

const Keyboard = ({ rowEntered, onPress}) => {

    const [letterDict, setLetterDict] = useImmer({})

    const [letterPressed, setLetterPressed] = useState(null)
    
    useEffect(() => {
        letterPressed && onPress({key: letterPressed})
        setLetterPressed(null)
    }, [letterPressed, onPress])

    const getLetterPressed = useCallback(({key}) => {
        setLetterPressed(key)
    }, [])
    
    //If has oldData, return 1, else 0
    const onMountHasOldData = useRef(
        JSON.parse(window.sessionStorage.getItem('gameData'))?.storedPos?.currRow > 0 ? 1 : 0
    )

    const fullGameBoardFilter = useCallback((gameArr, styleArr) => {
        const unique = {}
        for (let i = 0; i < gameArr.length; i++) {
            for (let j = 0; j < gameArr[i].length; j++) {
              const letter = gameArr[i][j];
              
              if(!(Object.keys(unique)).includes(letter)) {
                unique[letter] = styleArr[i][j]
              }
              else if(unique[letter] !== styleArr[i][j] 
                      && colorWeight[unique[letter]] < colorWeight[styleArr[i][j]]){
                unique[letter] = styleArr[i][j]
              }
            }
          }

        return unique
    }, [])

    const newRowFilter = useCallback((gameRow, styleRow, usedLetterDict) => {
        const unique = { ...usedLetterDict }
        for (let i = 0; i < gameRow.length; i++) {
            const letter = gameRow[i];
            
            //If Letter is not used: Add it to the Dict and the first Style seen
            if(!(Object.keys(unique).includes(letter))) {
              unique[letter] = styleRow[i]
            }
            else if(unique[letter] !== styleRow[i] 
                    && colorWeight[unique[letter]] < colorWeight[styleRow[i]]){
              unique[letter] = styleRow[i]
            }
        }

        return unique
    }, [])

    useLayoutEffect(() => {
        //Only if there is old data, run full 2D array search
        if(onMountHasOldData.current){
            const storedData = JSON.parse(window.sessionStorage.getItem('gameData'))
            const savedGameboard = storedData?.storedGameState
            const savedStyles = storedData?.storedStyleState
            const usedLetters = fullGameBoardFilter(savedGameboard,savedStyles)
            setLetterDict(usedLetters)
        }
    }, [fullGameBoardFilter])

    useEffect(() => {
        if(rowEntered !== null){
            const row = rowEntered
            
            setTimeout(() => {
                const storedData = JSON.parse(window.sessionStorage.getItem('gameData'))
                const savedGameboard = storedData?.storedGameState
                const savedStyles = storedData?.storedStyleState
                const usedLetters = newRowFilter(savedGameboard[row], savedStyles[row], letterDict)
                setLetterDict(usedLetters)
            }, FULL_FLIP_WAIT);
        }
    }, [rowEntered, newRowFilter])

    //Change variable as no longer onMount 
    useEffect(() => {
        if(onMountHasOldData.current){
          onMountHasOldData.current = 0
        }
      }, []) 
    

  return (
    <>
      { useMemo(() =>
      <div id='keyboard-container'
          className='relative centerStage flex-col text-white w-full mt-5 font-TMS'>
          {keyboardLayout.map((row, rowIndex) =>
              <div 
                  id={`row-${rowIndex}`}
                  key={crypto.randomUUID()} 
                  className='centerStage mb-2 h-fit w-fit'>
                      {row.map((letter) =>
                          <div
                              id={letter}
                              key={crypto.randomUUID()}
                              className={`centerStage box-border h-[3.25rem] w-[2.5rem] border border-gray-600 rounded mx-1 font-semibold text-[1.25rem] ${colorScheme.Keyboard.text} ${letter in letterDict ? letterDict[letter] : colorScheme.Keyboard.uncolored} hover:cursor-pointer`}
                              onClick={() => getLetterPressed({key: letter})}
                              >
                              {letter}
                          </div>
                      )}
              </div>
          )}
      </div>,
      [letterDict]) }
    </>
  )
}

export default Keyboard