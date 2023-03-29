import './App.css';
import NavBar from './components/NavBar';
import Game from './components/Game';
import { GCProvider } from './util/context';

const allowVisible = () => {
  const bodyClass = window.document.documentElement.style
  bodyClass.visibility = 'visible'
  bodyClass.opacity = 1
}

function App() {

  return (
     <>
      <GCProvider>
          <div id='app' className="flex flex-col relative min-h-screen min-w-screen max-h-screen max-w-screen m-0 select-none">
            <NavBar/>
            <Game/>
          </div>
      </GCProvider>

      {/* { allowVisible() } */}
     </>
  );
}

export default App;
