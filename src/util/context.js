import { useContext, useState} from "react"

const GameContext = React.createContext()

export const useGameState = () =>{
    return useContext(GameContext)
}

export const createGameState = () => {
    arr = []
  
    for(let i  = 0; i < 5; i++) {
      row = []
          for(let j = 0; j < 5; j++) {
            row.push("")
          }
  
          arr.push(row)
      }
  }

export function GCProvider({ children}) {
    
    const [gameState, setGameState] = useState()
    const [inPlay, setInPlay] = useState(true)
    
    arr = []

    for(let i  = 0; i < 5; i++) {
        row = []
        for(let j = 0; j < 5; j++) {
            row.push("")
        }
    }

        arr.push(row)


  
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
