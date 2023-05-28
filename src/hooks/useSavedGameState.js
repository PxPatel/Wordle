/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { createGameState, createStyleState, randomWordAPI } from "../util/base"
import useLocalStorage from "./useLocalStorage"
import { useImmer } from "use-immer"

const useSavedGameState = () => {    
    const [gameData, setGameData] = useLocalStorage('gameData', {
        'storedPauses': { inPlay: true, loading : false},
        'storedPos' : {currRow : 0, currBox : 0},
    })
    
    const [gameBoard, setGameBoard] = useImmer(gameData.storedGameState || createGameState)
    const [styleState, setStyleState] = useImmer(gameData.storedStyleState || createStyleState)
    const [realWord, setRealWord] = useState(gameData.storedRealWord)
    const [pauses, setPauses] = useState(gameData.storedPauses)
    const [pos, setPos] = useState(gameData.storedPos)
    const [rowStyle, setRowStyle] = useState({ invalidRow : null, flipRow : null, bounceRow : null })

    useEffect(() => {
        const getWord = async() =>{

            if(gameData.storedRealWord?.length === 5){
                setRealWord(gameData.storedRealWord)
            }
            else{
                setPauses(prev => { return {...prev, loading : true}})
                const output = await randomWordAPI()
                setRealWord(output)
                setPauses(prev => { return {...prev, loading : false}})
                setGameData(prev => { return {...gameData, 'storedRealWord': output}})
            }
        }
        getWord()
    }, [])
    
    useEffect(() =>{
        setGameData(prev => { return {
            'storedGameState' : gameBoard,
            'storedStyleState' : styleState,
            'storedRealWord' : realWord,
            'storedPauses': { inPlay: pauses.inPlay, loading : false},
            'storedPos' : {currRow : pos.currRow, currBox : 0},
        }})
    }, [pos.currRow, pauses.inPlay])

    return [
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
    ]
}

export default useSavedGameState