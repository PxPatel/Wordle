import React, { useContext, createContext } from "react"
import { deepCopify, dictify, wordAPI } from "./base"
import { FULL_FLIP_WAIT, INVALID_WAIT, colorScheme, FULL_BOUNCE_WAIT } from "./constants"
import useSavedGameState from "../hooks/useSavedGameState"

const GameContext = createContext()
const { boxDark, boxLight } = colorScheme.Box

export const useGameState = () =>{
    return useContext(GameContext)
}

export function GCProvider({ children }) {

    const [
        gameState,
        styleState,
        realWord,
        pauses,
        pos,
        rowStyle,
        setGameState,
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
        const nextState = deepCopify(gameState)
        nextState[pos.currRow][pos.currBox] = key
        setGameState(nextState)
        setPos({...pos, currBox : pos.currBox + 1})
    }


    function deleteLetter(){
        const nextState = deepCopify(gameState)
        nextState[pos.currRow][pos.currBox-1] = ""
        setGameState(nextState)
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
        const validWord = await wordAPI(gameState[pos.currRow].join("")) || false
        if(validWord){
            colorMeUp()
            flipRow()
            nextRow()
        }
        else{
            animateInvalidRow()
        }   
    }

    function colorMeUp(){
        const nextState = deepCopify(styleState)
        const row = nextState[pos.currRow]
        const guessArr = [...gameState[pos.currRow]]
        const realDict = dictify(realWord)

        for( let i = 0; i < guessArr.length; i++){
            if( guessArr[i] === realDict.get(i)){
                row[i] = `${boxLight.correct} ${boxDark.correct}`
                realDict.delete(i)
            }
        }    

        if(realDict.size === 0){
            setTimeout(() => {
                setRowStyle(prev => { return {...prev, bounceRow : pos.currRow} })
                setPauses(prev => { return {...prev, loading : true}})
            }, FULL_FLIP_WAIT)
            
            setTimeout(() => {
                setRowStyle(prev => { return {...prev, bounceRow : null} })
                setPauses({loading: false, inPlay : false})
            }, FULL_BOUNCE_WAIT + FULL_FLIP_WAIT)
            setStyleState(nextState)        
            return
        }

        const mapValues = [...realDict.values()]
        for(const key of realDict.keys()){
            if(mapValues.includes(guessArr[key])){
                row[key] = `${boxLight.present} ${boxDark.present}` 
                mapValues.splice(mapValues.indexOf(guessArr[key]),1)
            }
            else{ row[key] = `${boxLight.absent} ${boxDark.absent}` }
        }       
        setStyleState(nextState)        
    }

    function flipRow(){
        setPauses(prev => { return {...prev, loading : true}})
        setRowStyle(prev => { return {...prev, flipRow : pos.currRow}})
        setTimeout(() => {
            setRowStyle(prev => { return {...prev, flipRow : null}})
            setPauses(prev => { return {...prev, loading : false}})
        }, FULL_FLIP_WAIT)
    }

    function animateInvalidRow(){        
        setRowStyle(prev => { return {...prev, invalidRow : pos.currRow}})
        setTimeout(() => {
            setRowStyle(prev => { return {...prev, invalidRow : null}})
        }, INVALID_WAIT)
    }

    const value = {
        gameState,
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