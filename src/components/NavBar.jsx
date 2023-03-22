import React from 'react'
import useDarkMode from '../hooks/useDarkMode';
import { FaSun, FaMoon } from 'react-icons/fa';
import { colorScheme } from '../util/constants';

const NavBar = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  const { NavBar } = colorScheme

  //border-b-[#568ce3]
  return (
    <div className={`relative w-full h-24 ${NavBar.bgDark} ${NavBar.bgLight} border-b-2 border-b-[#3e4f6d]`} >
      <div className={`relative h-full font-TMS centerStage place-items-center ${NavBar.textDark} ${NavBar.textLight} text-4xl font-extrabold tracking-wide subpixel-antialiased`}>
        Wordle
      </div>

      <div className="dmButton centerStage place-items-center absolute min-w-fit top-1/2 left-[85%] -translate-y-1/2"
          onClick={handleMode}>

        {darkTheme ? ( 
            <FaSun size='24' className='hover:text-pink-600' />
          ) : (
            <FaMoon size='24' className='hover:text-pink-600' />
          )
          }
      </div>

    </div>

    // <div className='font-TMS flex justify-center bg-[#121213] p-6 text-white text-4xl font-extrabold tracking-wide subpixel-antialiased border-b-2 border-b-[#c8d4e8]' >
    //   Wordle
    // </div>  

  )
} 

export default NavBar