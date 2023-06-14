import React, { useState } from 'react';
import Game from './components/Game';
import NavBar from './components/NavBar';
import { GCProvider } from './util/gameContext';
import { colorScheme } from './util/constants'
import './App.css';

function App() {
  

  //TODO: New Idea: Click on the Wordle Logo and cause a reset with new word
  const [activeKeyboard, setActiveKeyBoard] = useState(true)

  return (
     <>
      <GCProvider>
          <div id='app' className={`flex flex-col relative min-h-screen min-w-screen max-h-screen max-w-screen m-0 ${colorScheme.Game.bgLight} ${colorScheme.Game.bgDark} select-none`}>
            <NavBar 
            activeKB={activeKeyboard}
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
