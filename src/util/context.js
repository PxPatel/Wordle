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
    
    async function checkValidity() {
        const validWord = await wordAPI(gameState[currRow].join("")) || false
        console.log("ValidWord: " + validWord)
        if(validWord){
            // animateRow()
            nextRow()
        }
    }

    async function wordAPI(word){
        const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
        const res = await axios.get(url + word)
            .then((response) => true)
            .catch((err) => false)
        return res
    }

    function animateRow(){

    }

    function animateBoxChange(){
        console.log('HEHE')
    }

    function nextRow(){
    
        if(currRow < 5){ 
            setCurrRow(currRow+1)
            setCurrBox(0)
        }
    }

    function clearBox(){

    }
  
    const value = {
        gameState,
        // inPlay,
        currRow,
        handleKeyChanges
    }

    return(
        <GameContext.Provider value = {value}>
            { children }
        </GameContext.Provider>
    )
}
