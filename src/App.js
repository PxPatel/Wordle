import React, { useState } from 'react';
import Game from './components/Game';
import NavBar from './components/NavBar';
import { GCProvider } from './util/gameContext';
import { colorScheme } from './util/constants'
import './App.css';
// import Keyboard from './components/Keyboard';

function App() {

  //TODO: Maybe we can seperate Game and Key if we define a state here and then pass the set into Game
  //State would describe if a valid 'ENTER' has been pressed

  const [activeKeyboard, setActiveKeyBoard] = useState(true)

  return (
     <>
      <GCProvider>
          <div id='app' className={`flex flex-col relative min-h-screen min-w-screen max-h-screen max-w-screen m-0 ${colorScheme.Game.bgLight} ${colorScheme.Game.bgDark} select-none`}>
            <NavBar 
            setKB={setActiveKeyBoard}
            />
            <Game 
            activeKB={activeKeyboard} 
            />
          </div>
      </GCProvider>
     </>
  );
}

export default App;
