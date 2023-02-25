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
        PARTIAL: "#fef08a",
        INCORRECT: "#a1a1aa"
      }
    },
  },
  plugins: [],
}