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

    //Done: Put the data fetch in the setTimeOut, so that you don't use many props and don't trigger rerender

    //When init render: Checks for LocalStorage gameBoard. If found, checks each letter and changes dict

    //Upon entering a word, the algo reruns on the current row, and checks for new letters, immediately coloring the tiles

    //Memory will be checked on init render, and states will used thereafter

    //When keybutton is clicked: Change context. Handle with a callback from context provider

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

    //DONE: Works Well. Fix the Algo to account for letters that were yellow and now green
    const fullGameBoardFilter = useCallback((gameArr, styleArr) => {
        const unique = {}
        for (let i = 0; i < gameArr.length; i++) {
            for (let j = 0; j < gameArr[i].length; j++) {
              const letter = gameArr[i][j];
              
              if(!(Object.keys(unique)).includes(letter)) {
                unique[letter] = styleArr[i][j]
              }

              //DONE: FIXME - The boolean logic to account for the special cases. 
              //Idea: Compare colorweights and heavier weight becomes new color
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

    // useEffect(() => {
    //     //Fix for showing colors after a reload
        
    //     if(rowState.flipRow !== null ){
    //         const result = fullGameBoardFilter(gameState, styleState)
    //         console.log(result)

    //         setTimeout(() => {
    //             setLetterDict(result)
    //         }, FULL_FLIP_WAIT)
    //     }   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [rowState])


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

    /**
     * Okay: So 3 Stages: 
     *  DONE: 1. If it is new reload with old data: fetch the localStorage and run the full 2D array algo
     *  
     *  DONE: 2. If it a new reload with no data: Do nothing in terms of colors
     *
     *  DONE: 3. If it not a reload, but has new data: Run a simple 1D array search Algo
     * 
     * LETS FRICKING GO. WE FINISHED
     */
    

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
                          // DONE: FIXME - Why is LightMode not working...
                              id={letter}
                              key={crypto.randomUUID()}
                              // MAKE CONSTANTS FOR BG AND BORDER and TEXT in constants.js
                              className={`centerStage box-border h-[3.25rem] w-[2.5rem] border border-gray-600 rounded mx-1 font-semibold text-[1.25rem] ${colorScheme.Keyboard.text} ${letter in letterDict ? letterDict[letter] : colorScheme.Keyboard.uncolored} hover:cursor-pointer`}
                              //It works perfectly for HandleKeyChanges, but not for memo'd function
                              //So stupidddddd
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

/**
 * 
 * I need a keyboard that will change colors based on the output of a user's word
 * Shape of Keyboard: How to create the qwerty shape of the keyboard
 * 
 * Passing Info: How is information going to pass down to color the keytiles
 * 1. Use useGameState
 * 2. Use props passed from <Game> in the form of a dictionary
 * 3. Use LocalStorage to cache info and pull from there
 * 
 * Leaning towards 3, and 1 combo  
 *
 * 
 * First thing first: Shape. 
 * We can use a row technique: Probably so 
 * 
 * 
 * Have a large map. Each letter is assigned 
*/