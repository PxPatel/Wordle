import React, { useContext, createContext } from "react"
import { dictify, wordAPI } from "./base"
import { FULL_FLIP_WAIT, INVALID_WAIT, FULL_BOUNCE_WAIT, colorScheme } from "./constants"
import useSavedGameState from "../hooks/useSavedGameState"

const GameContext = createContext()
const { boxDark, boxLight } = colorScheme.Box

export const useGameState = () =>{
    return useContext(GameContext)
}

export function GCProvider({ children }) {

    const [
        gameBoard,
        styleState,
        realWord,
        pauses,
        pos,
        rowStyle,
        setGameBoard,
        setStyleState,
        setPauses,
        setPos,
        setRowStyle
    ] = useSavedGameState()
    
    function handleKeyChanges(e){
        const key = e.key
        const isLetter = key.length === 1 && /^[A-Za-z]*$/.test(key)

        if(isLetter && pos.currBox < 5){
            updateLetter(key.toUpperCase())
        }
        else if(key === 'Backspace' && pos.currBox > 0){
            deleteLetter()
        }
        else if(key === 'Enter' && pos.currBox === 5){
            checkValidity()
        }
    }

    function updateLetter(key) { 
        setGameBoard(draft => {
            draft[pos.currRow][pos.currBox] = key
        })
        setPos({...pos, currBox : pos.currBox + 1})
    }


    function deleteLetter(){
        setGameBoard(draft => {
            draft[pos.currRow][pos.currBox-1] = ''
        })
        setPos({...pos, currBox : pos.currBox - 1})
    }

    function nextRow(){
        if(pos.currRow < 6){
            if(pos.currRow + 1 === 6){
                setPauses(prev => { return {...prev, inPlay : false}})
            }
            setPos({currRow : pos.currRow + 1, currBox : 0})
        }
    }
    
    async function checkValidity() {
        const validWord = await wordAPI(gameBoard[pos.currRow].join(""))
        if(validWord){
            setPauses(prev => { return {...prev, loading : true}})
            const isGuessCorrect = initialWordCheck(gameBoard, realWord)
            colorMeUp(isGuessCorrect)
            flipRow(isGuessCorrect)
            isGuessCorrect ? bounceRow() : nextRow()
        }
        else{
            animateInvalidRow()
        }   
    }
    
    function initialWordCheck(gameBoard, realWord){
        const guessWord = gameBoard[pos.currRow].join("")
        return guessWord === realWord
    }
    
    function colorMeUp(isWordCorrect){
        // const nextState = deepCopify(styleState)
        // const row = nextState[pos.currRow]
        // const guessArr = [...gameBoard[pos.currRow]]
        // const realDict = dictify(realWord)

        // for( let i = 0; i < guessArr.length; i++){
        //     if( guessArr[i] === realDict.get(i)){
        //         row[i] = `${boxLight.correct} ${boxDark.correct}`
        //         realDict.delete(i)
        //     }
        // }    

        // const mapValues = [...realDict.values()]
        // for(const key of realDict.keys()){
        //     if(mapValues.includes(guessArr[key])){
        //         row[key] = `${boxLight.present} ${boxDark.present}` 
        //         mapValues.splice(mapValues.indexOf(guessArr[key]),1)
        //     }
        //     else{ row[key] = `${boxLight.absent} ${boxDark.absent}` }
        // }       
        // setStyleState(nextState) 
        
        
        setStyleState(draft => {
            const row = draft[pos.currRow]
            const guessArr = [...gameBoard[pos.currRow]]
            const realDict = dictify(realWord)

            for( let i = 0; i < guessArr.length; i++){
                if( guessArr[i] === realDict.get(i)){
                    row[i] = `${boxLight.correct} ${boxDark.correct}`
                    realDict.delete(i)
                }
            }    

            const mapValues = [...realDict.values()]
            for(const key of realDict.keys()){
                if(mapValues.includes(guessArr[key])){
                    row[key] = `${boxLight.present} ${boxDark.present}` 
                    mapValues.splice(mapValues.indexOf(guessArr[key]),1)
                }
                else{ row[key] = `${boxLight.absent} ${boxDark.absent}` }
            }       
        })
    }

    function flipRow(isWordCorrect){
        setRowStyle(prev => { return {...prev, flipRow : pos.currRow}})
        setTimeout(() => {
            setRowStyle(prev => { return {...prev, flipRow : null}})
            !isWordCorrect && setPauses(prev => { return {...prev, loading : false}})
        }, FULL_FLIP_WAIT)
    }
    
    function bounceRow(){
        setTimeout(() => {
            setRowStyle(prev => { return {...prev, bounceRow : pos.currRow} })
        }, FULL_FLIP_WAIT)
        
        setTimeout(() => {
            setRowStyle(prev => { return {...prev, bounceRow : null} })
            setPauses({loading: false, inPlay : false})
        }, FULL_BOUNCE_WAIT + FULL_FLIP_WAIT)
    }

    function animateInvalidRow(){        
        setRowStyle(prev => { return {...prev, invalidRow : pos.currRow}})
        setTimeout(() => {
            setRowStyle(prev => { return {...prev, invalidRow : null}})
        }, INVALID_WAIT)
    }

    const value = {
        gameBoard,
        styleState,
        realWord,
        pauses,
        pos,
        rowStyle,
        handleKeyChanges,
    }

    return(
        <GameContext.Provider value = {value}>
            { children }
        </GameContext.Provider>
    )
}