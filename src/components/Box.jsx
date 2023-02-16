import React from 'react'

const Box = (props) => {

  const { letter } = props

  const reg = <div className= ' bg-[#121213] w-[50px] h-[50px] border-2 border-box border-[#3a3a3c] m-1'>    
                { letter }
              </div>

  const filled = <div className= 'flex justify-center content-center text-center text-white bg-[#121213] w-[50px] h-[50px] border-2 border-box border-[#565758] m-1'>    
                  { letter }
                  </div>

  return (
    <div>
      { letter !== '' ? filled : reg }
    </div>
  )
}

export default Box
