import React, { useEffect } from 'react'

const NavBar = () => {

  useEffect(() =>{
    console.log("Nav")
  })

  return (
    <div className='flex justify-center bg-[#121213] p-6 text-white text-4xl font-extrabold tracking-wide subpixel-antialiased border-b-2 border-b-[#c8d4e8]' >
      Wordle
    </div>
  )
} 

export default NavBar