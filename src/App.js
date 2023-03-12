import './App.css';
import NavBar from './components/NavBar';
import Game from './components/Game';
import { GCProvider } from './util/context';


//TODO:
//ADD DARK MODE
//Possibly using Ref

function App() {
  return (
     <GCProvider>
        <div className="flex flex-col min-h-screen min-w-screen max-h-screen max-w-screen m-0 select-none">
          <NavBar/>
          <Game/>
        </div>
     </GCProvider>
  );
}

export default App;
