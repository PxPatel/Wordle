import React, { useRef } from 'react'
import useDarkMode from '../hooks/useDarkMode';
import { FaSun, FaMoon } from 'react-icons/fa';
import { colorScheme } from '../util/constants';

const NavBar = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  const toggleAllowed = useRef(true)
  
  const { NavBar } = colorScheme

  return (
    <div className={`relative w-full h-24 ${NavBar.bgDark} ${NavBar.bgLight} border-b-2 border-b-[#3e4f6d]`} >
      <div 
        className={`relative h-full font-TMS centerStage place-items-center ${NavBar.textDark} ${NavBar.textLight} text-4xl font-extrabold tracking-wide subpixel-antialiased`}
        tabIndex={-1}
        >
        Wordle
      </div>

      {/* TODO: Add the bit of text that shows up on hover to show the command */}
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
            <FaSun size='24' className='hover:text-pink-600' />
          ) : (
            <FaMoon size='24' className='hover:text-pink-600' />
          )
          }
          <span className="sidebar-tooltip scale-0 group-hover:scale-100">
            Toggle {darkTheme ? 'Dark' : 'Light'} Mode
          </span>
      </div>

    </div>
  )
} 

export default NavBar