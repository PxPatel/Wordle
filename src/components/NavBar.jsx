import React from 'react'
import useDarkMode from '../hooks/useDarkMode';

const NavBar = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  console.log(darkTheme)


  //border-b-[#568ce3]
  return (
    <div className='relative w-full h-24 bg-[#121213] border-b-2 border-b-[#c8d4e8]' >
      <div className={'relative h-full font-TMS flex centerStage place-items-center text-white text-4xl font-extrabold tracking-wide subpixel-antialiased'}>
        Wordle
      </div>

      <label className="absolute min-w-fit  inline-flex justify-start items-center cursor-pointer top-1/2 left-[90%] -translate-y-1/2">
        <input type="checkbox" value="" className="sr-only peer" onClick= {handleMode}/>
        <div className="dmButton"></div>
      </label>

    </div>

    // <div className='font-TMS flex justify-center bg-[#121213] p-6 text-white text-4xl font-extrabold tracking-wide subpixel-antialiased border-b-2 border-b-[#c8d4e8]' >
    //   Wordle
    // </div>  

  )
} 

export default NavBar