/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')
module.exports = {

  //Safelist utility classes to use variable dynamic styles
  safelist: [
    { pattern: /animation-delay-(0|150|300|450|600|1000|2000|3000|4000)/, },
  ],

  content: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/util/**/*.{js,jsx,ts,tsx}",
    "./src/App.js",
    "./public/index.html"
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
        },

        Shake: {
          '0%': {transform : 'translateX(-2px)'},
          '40%': {transform : 'translateX(4px)'},
        },

        Flip: {
          "50%" : {
            transform : 'rotateX(-90deg)'
          },
        },

        Bounce: {
          "20%" : {
            transform: 'translateY(-18px)',
          },
          "40%" : {
            transform: 'translateY(8px)', 
          },

          "60%" : {
            transform: 'translateY(-9px)', 
          },

          "80%" : {
            transform: 'translateY(-4px)',
          },
        },
      },

      animation: {
        pop: 'Pop 100ms ease-in-out 1',
        shake: 'Shake 150ms ease-in-out 2',
        flip: 'Flip 1000ms ease-in-out 1',
        bounce: 'Bounce 1000ms ease-in-out 1',
      },
    },


  }, 
  plugins: [
    plugin(function({ matchUtilities, addComponents, theme }) {
      //Animation delay utility Class
      matchUtilities(
        {
          'animation-delay': (value) => ({
            'animation-delay' : value
          }),
        },
        { values: theme('animationDelay') }
      )

      //Component plugin for standard flexbox
      addComponents(
        {
          '.centerStage' : { 
            'display' : 'flex',
            'place-content' : 'center',
          }
        },
      )
    },
    //End of Additions
    
    //Default values of plugins
    {
      theme : {
        animationDelay : {
          0: '0ms',
          150: '150ms',
          300: '300ms',
          450: '450ms',
          600: '600ms',
          1000: '1000ms',
          2000: '2000ms',
          3000: '3000ms',
          4000: '4000ms',
        },
      }
    })
    //End of Plugin
  ],
}