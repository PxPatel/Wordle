
https://stackoverflow.com/questions/22252214/making-text-blink-a-certain-number-of-times
https://dev.to/lydiahallie/javascript-visualized-promises-async-await-5gke
https://dev.to/masteringjs/using-then-vs-async-await-in-javascript-2pma

<!-- THIS is the JSX for slider along with the WORDLE Title -->
<div className='relative w-full h-24 bg-[#121213] border-b-2 border-b-[#c8d4e8]' >
      <div className={'relative h-full font-TMS flex centerStage place-items-center text-white text-4xl font-extrabold tracking-wide subpixel-antialiased'}>
        Wordle
      </div>

      <label className="absolute min-w-fit  inline-flex justify-start items-center cursor-pointer top-1/2 left-[85%] -translate-y-1/2">
        <input type="checkbox" value="" className="sr-only peer" onClick= {handleMode}/>
        <div className="dmButton"></div>
      </label>

</div>