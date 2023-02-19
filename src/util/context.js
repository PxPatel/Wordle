import { useContext, useState} from "react"
import { createContext } from "react"
import axios from "axios"

const GameContext = createContext()

export const useGameState = () =>{
    return useContext(GameContext)
}


export function GCProvider({ children}) {

    const createGameState = () => {
        let arr = []
      
        for(let i  = 0; i < 6; i++) {
          let row = []
            for(let j = 0; j < 5; j++) {
                row.push("")
              }
      
              arr.push(row)
          }
    
        return arr
      }
    
    const [gameState, setGameState] = useState(createGameState)
    // const [inPlay, setInPlay] = useState(true)
    const [currRow, setCurrRow] = useState(0)
    const [currBox, setCurrBox] = useState(0)
    const [invalidRow, setInvalidRow] = useState(null)
    

    function handleKeyChanges(e){
        const key = e.key
        const isLetter = key.length === 1 && /^[A-Za-z]*$/.test(key)
        switch(isLetter){
            case(true):
                updateLetter(key.toUpperCase())

            case(false):
                if(currBox > 0 && key === 'Backspace'){
                    deleteLetter()
                }
                else if(currBox === 5 && key === 'Enter'){
                    checkValidity()
                }
        }
    }

    function updateLetter(key) {
        if(currBox < 5){
            const nextState = [...gameState]
            nextState[currRow][currBox] = key
            setGameState(nextState)
            setCurrBox(currBox+1)
        }
    }

    function deleteLetter(){
        const nextState = [...gameState]
        nextState[currRow][currBox-1] = ""
        setGameState(nextState)
        setCurrBox(currBox-1)
    }

    function nextRow(){
    
        if(currRow < 5){ 
            setCurrRow(currRow+1)
            setCurrBox(0)
        }
    }
    
    async function checkValidity() {
        const validWord = await wordAPI(gameState[currRow].join("")) || false
        if(validWord){
            animateValidRow()
            nextRow()
        }
        else{
            animateInvalidRow()
        }

        async function wordAPI(word){
            const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
            const res = await axios.get(url + word)
                .then((response) => true)
                .catch((err) => false)
            return res
        }
    }


    function animateValidRow(){
        
    }

    async function animateInvalidRow(){
        var i = 1
        const blinkTimes = 2

        setInvalidRow(currRow)

        const intervalId = setInterval(() => {
            console.log("Stopped")
            setInvalidRow(null)

            if(i !== blinkTimes){
                i++
                console.log("Restarted")
                setTimeout(() => { setInvalidRow(currRow) },100)
            }
            else{
                clearInterval(intervalId)
            }
        }, 150)

        // https://stackoverflow.com/questions/22252214/making-text-blink-a-certain-number-of-times
        // https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke
        // https://dev.to/masteringjs/using-then-vs-async-await-in-javascript-2pma
    }

    const value = {
        gameState,
        // inPlay,
        currRow,
        invalidRow,
        handleKeyChanges,
    }

    return(
        <GameContext.Provider value = {value}>
            { children }
        </GameContext.Provider>
    )
}
