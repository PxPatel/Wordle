import { useContext, useEffect, useState} from "react"
import { createContext } from "react"
import { createStyleState, createGameState, deepCopify, dictify, randomWordAPI, wordAPI, delay } from "./base"

const GameContext = createContext()

export const useGameState = () =>{
    return useContext(GameContext)
}

export function GCProvider({ children }) {

    const [gameState, setGameState] = useState(createGameState)
    const [styleState, setStyleState] = useState(createStyleState)
    // console.table(styleState)
    const [realWord, setRealWord] = useState() //Try storing in Local Memory
    const [inPlay, setInPlay] = useState(true)
    const [loading, setLoading] = useState()
    const [currRow, setCurrRow] = useState(0)
    const [currBox, setCurrBox] = useState(0)
    const [invalidRow, setInvalidRow] = useState(null)

    const invalidDelay = 300 

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
        switch(isLetter){
            case(true):
                updateLetter(key.toUpperCase())
                break
            case(false):
                if(currBox > 0 && key === 'Backspace'){
                    deleteLetter()
                }
                else if(currBox === 5 && key === 'Enter'){
                    checkValidity()
                }
                break
            default:
                break
        }
    }

    function updateLetter(key) {
        if(currBox < 5){
            const nextState = deepCopify(gameState)
            nextState[currRow][currBox] = key

            // addPop(currRow, currBox)
            setGameState(nextState)
            setCurrBox(currBox+1)
        }
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

        // const nextStyleState = deepCopify(styleState)
        // nextStyleState[currRow][currBox-1][1] = ' '

        // setStyleState(nextStyleState)
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
            nextRow()
        }
        else{
            animateInvalidRow()
        }   
    }

    function colorMeUp(){
        const nextState = deepCopify(styleState)
        const row = nextState[currRow]
        // console.log(realWord)
        // console.log([...gameState[currRow]].join(""))
        // if(realWord === ([...gameState[currRow]].join(""))){ 
            
        //     console.log("PERFECT") 
        // }
        // else{ console.log("STUPID")}

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
        //Check if in arr ? row[i] = Yellow
        //Check if correct idx ? row[i] = Green


        //Iterate and delete letters that are on perfect index
        for( let i = 0; i < guessArr.length; i++){
            if( guessArr[i] === realDict.get(i)){
                row[i][0] = 'bg-CORRECT'
                realDict.delete(i)
            }
        }

        const mapValues = [...realDict.values()]
        for(const key of realDict.keys()){
            mapValues.includes(guessArr[key]) ? row[key][0] = 'bg-PRESENT' : row[key][0] = 'bg-ABSENT'
        }
        setStyleState(nextState)
    }

    async function animateInvalidRow(){
        // var i = 1
        // const blinkTimes = 2

        // setInvalidRow(currRow)

        // const intervalId = setInterval(() => {
        //     console.log("Stopped")
        //     setInvalidRow(null)

        //     if(i !== blinkTimes){
        //         i++
        //         console.log("Restarted")
        //         setTimeout(() => { setInvalidRow(currRow) },100)
        //     }
        //     else{
        //         clearInterval(intervalId)
        //     }
        // }, 150)

        setInvalidRow(currRow)
        setTimeout(() => setInvalidRow(null), invalidDelay)

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
        handleKeyChanges,
    }

    return(
        <GameContext.Provider value = {value}>
            { children }
        </GameContext.Provider>
    )
}
