import './App.css';
import NavBar from './components/NavBar';
import Game from './components/Game';
import { GCProvider } from './util/context';

function App() {
  return (
     <GCProvider>
        <div className="min-h-screen min-w-screen m-0">
          <NavBar/>
          <Game/>
        </div>
     </GCProvider>
  );
}

export default App;
