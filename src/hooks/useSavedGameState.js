/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { createGameState, createStyleState, randomWordAPI } from "../util/base"
import useLocalStorage from "./useLocalStorage"

const useSavedGameState = () => {
    const [content, setContent] = useLocalStorage('gameData', {
        'storedGameState' : createGameState,
        'storedStyleState' : createStyleState,
        'storedRealWord' : '',
        'storedPauses': { inPlay: true, loading : false},
        'storedPos' : {currRow : 0, currBox : 0},
    })
    
    
    const [gameState, setGameState] = useState(content.storedGameState)
    const [styleState, setStyleState] = useState(content.storedStyleState)
    const [realWord, setRealWord] = useState(content.storedRealWord)
    const [pauses, setPauses] = useState(content.storedPauses)
    const [pos, setPos] = useState(content.storedPos)
    const [rowStyle, setRowStyle] = useState({ invalidRow : null, flipRow : null, bounceRow : null })
    
    useEffect(() => {
        const getWord = async() =>{
            setPauses(prev => { return {...prev, loading : true}})
            let output = content.storedRealWord.length === 5 ? content.storedRealWord : await randomWordAPI()
            setRealWord(output)
            setPauses(prev => { return {...prev, loading : false}})
            setContent(prev => {return {
                'storedGameState' : gameState,
                'storedStyleState' : styleState,
                'storedRealWord' : output,
                'storedPauses': { inPlay: pauses.inPlay, loading : false},
                'storedPos' : {currRow : pos.currRow, currBox : 0},
                }
            })
        }
        getWord()
    }, [])
    
    useEffect(() =>{
        setContent({
            'storedGameState' : gameState,
            'storedStyleState' : styleState,
            'storedRealWord' : realWord,
            'storedPauses': { inPlay: pauses.inPlay, loading : false},
            'storedPos' : {currRow : pos.currRow, currBox : 0},
        })
    }, [pos.currRow, pauses.inPlay])

    return [
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
    ]
}

export default useSavedGameState