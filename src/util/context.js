import { useContext, useEffect, useState} from "react"
import { createContext } from "react"
import { createStyleState, createGameState, deepCopify, dictify, randomWordAPI, wordAPI } from "./base"

const GameContext = createContext()

export const useGameState = () =>{
    return useContext(GameContext)
}

export function GCProvider({ children }) {

    const [gameState, setGameState] = useState(createGameState)
    const [styleState, setStyleState] = useState(createStyleState)
    const [realWord, setRealWord] = useState() //Try storing in Local Memory
    const [inPlay, setInPlay] = useState(true)
    const [loading, setLoading] = useState()
    const [currRow, setCurrRow] = useState(0)
    const [currBox, setCurrBox] = useState(0)
    const [invalidRow, setInvalidRow] = useState()
    const [rowStyle, setRowStyle] = useState({ flipRow : null, delay: 150})

    const invalidDelay = 300 
    const flipDelay = 10000

    useEffect(() => {
        async function getWord(){
            setLoading(true)
            let output = await randomWordAPI()
            setRealWord(output)
            // setRealWord("")
            setLoading(false)
            console.log(output)
        }
        getWord()
    }, [])
    
    function handleKeyChanges(e){
        const key = e.key
        const isLetter = key.length === 1 && /^[A-Za-z]*$/.test(key)

        if(isLetter && currBox < 5){
            updateLetter(key.toUpperCase())
        }
        else if(key === 'Backspace' && currBox > 0){
            deleteLetter()
        }
        else if(key === 'Enter' && currBox === 5){
            checkValidity()
        }
    }

    function updateLetter(key) { 
        const nextState = deepCopify(gameState)
        nextState[currRow][currBox] = key

        // addPop(currRow, currBox)
        setGameState(nextState)
        setCurrBox(currBox+1)
    }

    // const addPop = (cRow, cBox) => {
    //     const nextStyleState = deepCopify(styleState)
    //     nextStyleState[cRow][cBox][1] = 'animate-pop'

    //     setStyleState(nextStyleState)
    //     console.log(cRow + " " + cBox + "Its Popping")
    //     removePop(cRow, cBox, nextStyleState)
    // }

    // const removePop = async (cRow, cBox, nextStyleState) =>{
    //     await delay(1000)
    //     nextStyleState[cRow][cBox][1] = ' '
    //     setStyleState(nextStyleState)
    // }


    function deleteLetter(){
        const nextState = deepCopify(gameState)
        nextState[currRow][currBox-1] = ""
        setGameState(nextState)
        setCurrBox(currBox-1)
    }

    function nextRow(){
        if(currRow < 6){ 
            if(currRow + 1 === 6){
                setInPlay(false)
            }
            setCurrRow(currRow+1)
            setCurrBox(0)
        }
    }
    
    async function checkValidity() {
        const validWord = await wordAPI(gameState[currRow].join("")) || false
        if(validWord){
            colorMeUp()
            flipMyRow()
            // flipMyBoxes()
            nextRow()
        }
        else{
            animateInvalidRow()
        }   
    }

    function colorMeUp(){
        const nextState = deepCopify(styleState)
        const row = nextState[currRow]
        
        const guessArr = [...gameState[currRow]]
        const realDict = dictify(realWord)

        //[a, p, a, l, e]   R
        /**
         * {
            2: a,
            4: e
            }
        **/
        //[a, p, p, l, y]   G
        //[G, G, E, G, E] 

        //Iterate and delete letters that are on perfect index
        for( let i = 0; i < guessArr.length; i++){
            if( guessArr[i] === realDict.get(i)){
                row[i].colorState = 'bg-CORRECT'
                realDict.delete(i)
            }
        }

        const mapValues = [...realDict.values()]
        for(const key of realDict.keys()){
            mapValues.includes(guessArr[key]) ? row[key].colorState = 'bg-PRESENT' : row[key].colorState = 'bg-ABSENT'
        }
        setStyleState(nextState)
    }

    function flipMyRow(){
        setLoading(true)

        const nextStyleState = deepCopify(styleState)
        const original = deepCopify(styleState)
        const row = nextStyleState[currRow]

        for(let el of row){
            console.log(el)
            el.flipState = true
        }   

        setStyleState(nextStyleState)
        setTimeout(() => {
            setStyleState(original)
            setLoading(false)
        }, flipDelay)
    }

    function animateInvalidRow(){

        setRowStyle({...rowStyle, invalidRow : currRow})
        
        setInvalidRow(currRow)
        
        setTimeout(() => {
            setInvalidRow(null)
        }, invalidDelay)

        // https://stackoverflow.com/questions/22252214/making-text-blink-a-certain-number-of-times
        // https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke
        // https://dev.to/masteringjs/using-then-vs-async-await-in-javascript-2pma
    }

    const value = {
        gameState,
        styleState,
        inPlay,
        loading,
        invalidRow,
        rowStyle,
        handleKeyChanges,
    }

    return(
        <GameContext.Provider value = {value}>
            { children }
        </GameContext.Provider>
    )
}