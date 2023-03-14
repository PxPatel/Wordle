import React, { useContext, createContext, useEffect, useState} from "react"
import { createStyleState, createGameState, deepCopify, dictify, randomWordAPI, wordAPI } from "./base"
import { FUll_FLIP_WAIT, INVALID_WAIT } from "./constants"

const GameContext = createContext()

export const useGameState = () =>{
    return useContext(GameContext)
}

export function GCProvider({ children }) {

    const [gameState, setGameState] = useState(createGameState)
    const [styleState, setStyleState] = useState(createStyleState)
    const [realWord, setRealWord] = useState()
    const [inPlay, setInPlay] = useState(true)
    const [loading, setLoading] = useState(false)

    //TODO: Better name for states
    const [pos, setPos] = useState({currRow : 0, currBox : 0})
    const [rowStyle, setRowStyle] = useState({ invalidRow : null, flipRow : null, bounceRow : null })

    useEffect(() => {
        const getWord = async() =>{
            setLoading(prev => true)
            let output = await randomWordAPI()
            setRealWord(output)
            setLoading(prev => false)
            console.log(output)
        }
        getWord()
    }, [])

    //TODO: Storage Capability
    // useEffect(() => {
    //     if( !(sessionStorage.getItem('PriWordle')) ){
    //         const game = {
    //             boardState : gameState.map((arr) => arr.join("")),
    //             realWord : realWord,
    //             currRowIndex : pos.currRow,
    //             inPlay : pauses.inPlay,
    //         }
    //         sessionStorage.setItem('PriWordle', JSON.stringify(game))
    //         console.log("Setted")
    //     }

    //     else{
    //         const data = JSON.parse(sessionStorage.getItem('PriWordle'))
    //         console.table(data)

    //         // // setGameState(prev => data.boardState)
    //         setRealWord(prev => data.realWord)
    //         setPos(prev => ({currRow : data['currRowIndex'], currBox : 0}))
    //         setPauses(prev => ({...pauses, inPlay : data['inPlay']}))
    //     }

    //     return () => {
    //         // sessionStorage.clear()
    //         // alert('Cleared')
    //     }
    // }, [realWord])
    
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
             setInPlay(prev => false)
            }
            setPos({currRow : pos.currRow + 1, currBox : 0})
        }
    }
    
    async function checkValidity() {
        const validWord = await wordAPI(gameState[pos.currRow].join("")) || false
        if(validWord){
            colorMeUp()
            flipMyRow()
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

        //Iterate and delete letters that are on perfect index
        for( let i = 0; i < guessArr.length; i++){
            if( guessArr[i] === realDict.get(i)){
                row[i] = 'bg-CORRECT'
                realDict.delete(i)
            }
        }    

        if(realDict.size === 0){
            setInPlay(prev => false)
            setTimeout(() => {
                setRowStyle(prev => { return {...prev, bounceRow : pos.currRow} })
            }, FUll_FLIP_WAIT)
            setStyleState(nextState)        
            return
        }

        const mapValues = [...realDict.values()]
        for(const key of realDict.keys()){
            if(mapValues.includes(guessArr[key])){
                row[key] = 'bg-PRESENT' 
                mapValues.splice(mapValues.indexOf(guessArr[key]),1)
            }
            else{ row[key] = 'bg-ABSENT' }
        }       
        setStyleState(nextState)        
    }

    function flipMyRow(){
        setLoading(prev => true)
        setRowStyle(prev => { return {...prev, flipRow : pos.currRow}})
        setTimeout(() => {
            setRowStyle(prev => { return {...prev, flipRow : null}})
            setLoading(prev => false)   
        }, FUll_FLIP_WAIT)
    }

    function animateInvalidRow(){        
        setRowStyle(prev => { return {...prev, invalidRow : pos.currRow}})
        setTimeout(() => {
            setRowStyle(prev => { return {...prev, invalidRow : null}})
        }, INVALID_WAIT)

        // https://stackoverflow.com/questions/22252214/making-text-blink-a-certain-number-of-times
        // https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke
        // https://dev.to/masteringjs/using-then-vs-async-await-in-javascript-2pma
    }

    const value = {
        gameState,
        styleState,
        inPlay,
        loading,
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