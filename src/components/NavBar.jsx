import React from 'react'

const NavBar = () => {
  return (

    <div className='relative w-full h-24 bg-[#121213] border-b-2 border-b-[#c8d4e8]' >
      <div className={'relative h-full font-TMS flex centerStage place-items-center text-white text-4xl font-extrabold tracking-wide subpixel-antialiased'}>
        Wordle
      </div>

      <label className="absolute min-w-fit  inline-flex justify-start items-center cursor-pointer top-1/2 left-[90%] -translate-y-1/2">
        <input type="checkbox" value="" className="sr-only peer"/>
        <div className="z-[1] relative w-10 h-5 bg-gray-200 rounded-full 
              peer-checked:after:translate-x-full  after:content-[''] after:absolute after:top-[2px] after:left-[4px] 
        after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[16px] after:w-[16px] 
        after:transition-all after:duration-300 peer-checked:bg-gray-700"></div>
      </label>

    </div>

    // <div className='font-TMS flex justify-center bg-[#121213] p-6 text-white text-4xl font-extrabold tracking-wide subpixel-antialiased border-b-2 border-b-[#c8d4e8]' >
    //   Wordle
    // </div>  

  )
} 

export default NavBar