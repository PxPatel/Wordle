import { useContext, useState} from "react"
import { createContext } from "react"

const GameContext = createContext()

export const useGameState = () =>{
    return useContext(GameContext)
}

 const createGameState = () => {
    let arr = []
  
    for(let i  = 0; i < 5; i++) {
      let row = []
        for(let j = 0; j < 5; j++) {
            row.push(j)
          }
  
          arr.push(row)
      }

    return arr
    // console.log(arr)
  }

export function GCProvider({ children}) {
    
    const [gameState, setGameState] = useState(createGameState)
    const [inPlay, setInPlay] = useState(true)
  
    const value = {
        gameState,
        inPlay
    }

    return(
        <GameContext.Provider value = {value}>
            { inPlay && children }
        </GameContext.Provider>
    )
}
