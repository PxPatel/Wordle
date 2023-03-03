/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        EMPTY: "#121213",
        CORRECT: "#86efac",
        PRESENT: "#fef08a",
        ABSENT: "#a1a1aa"
      },

      fontFamily:{
        ATW: "American Typewriter",
        TMS: "Trebuchet MS"
      },

      keyframes: {
        Pop: {
          '0%': {transform : 'scale(.75)'},
          '50%': {transform : 'scale(1.1)'},
          // '100%': {transform : 'scale(1)'}
        },

        Shake: {
          '0%': {transform : 'translateX(-200px)'},
          '40%': {transform : 'translateX(400px)'},
        }
      },

      animation: {
        pop: 'Pop 100ms ease-in-out 1',
        shake: 'Shake 400ms ease-in-out 1' //Make iteration 2 times. Make Duration 200ms
      }

    },
  },
  plugins: [],
}