import './App.css';
import NavBar from './components/NavBar';
import { GCProvider } from './util/context';
import { colorScheme } from './util/constants'
import Game from './components/Game';
// import Keyboard from './components/Keyboard';

function App() {

  //TODO: Maybe we can seperate Game and Key if we define a state here and then pass the set into Game
  //State would describe if a valid 'ENTER' has been pressed

  return (
     <>
      <GCProvider>
          <div id='app' className={`flex flex-col relative min-h-screen min-w-screen max-h-screen max-w-screen m-0 ${colorScheme.Game.bgLight} ${colorScheme.Game.bgDark} select-none`}>
            <NavBar/>
            <Game/>
          </div>
      </GCProvider>
     </>
  );
}

export default App;
