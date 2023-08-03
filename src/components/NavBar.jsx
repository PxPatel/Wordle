import React, { useRef } from 'react'
import useDarkMode from '../hooks/useDarkMode';
import { FaSun, FaMoon } from 'react-icons/fa'
import { TbKeyboardShow, TbKeyboardHide } from 'react-icons/tb';
import { colorScheme } from '../util/constants';

const NavBar = ({ activeKB, setKB }) => {


  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme)

  const toggleAllowed = useRef(true)

  const { NavBar: NavBarColor } = colorScheme

  const resetGame = () => {
    window.sessionStorage.removeItem('gameData')
    window.location.reload()
  }

  return (
    <div className={`relative w-full h-[5.5rem] ${NavBarColor.bgDark} ${NavBarColor.bgLight} border-b-2 border-b-[#3e4f6d]`} >

      <div 
        className={`relative h-full font-TMS centerStage place-items-center ${NavBarColor.textDark} ${NavBarColor.textLight} text-4xl font-extrabold tracking-wide subpixel-antialiased`}
        tabIndex={-1}
        onClick={resetGame}
        >
        Wordle
      </div>

      <div
        className="optKeyboardButton absolute centerStage min-w-fit top-1/2 left-[80%] -translate-y-1/2 group"
        onClick={() => setKB(curr => !curr)}
        tabIndex={0}
        >
          { activeKB ? (
            <TbKeyboardHide size='22' className='hover:text-[#06B6D4]'/>
          ) : (
            <TbKeyboardShow size='22' className='hover:text-cyan-500'/>
          )}
      </div>

      <div 
        className="dmButton absolute centerStage min-w-fit top-1/2 left-[85%] -translate-y-1/2 group"
        onClick={handleMode}
        tabIndex={0}
        onKeyDown= {(e) => {
          if(e.key === 'Enter' && toggleAllowed.current){ handleMode(); toggleAllowed.current = false; }
          }
        }
        onKeyUp= {(e) => {
          e.key === 'Enter' && (toggleAllowed.current = !toggleAllowed.current)
        }}
      >

        {darkTheme ? ( 
            <FaSun size='24' className='hover:text-[#F87171]' />
          ) : (
            <FaMoon size='24' className='hover:text-[#F87171]' />
          )
          }
          <span className="sidebar-tooltip scale-0 group-hover:scale-100">
            Toggle {darkTheme ? 'Light' : 'Dark'} Mode
          </span>
      </div>

    </div>
  )
} 

export default NavBar