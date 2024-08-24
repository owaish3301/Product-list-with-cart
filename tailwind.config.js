/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      colors : {
        "rose-100": "hsl(13, 31%, 94%)",
        "rose-300" : "hsl(14, 25%, 72%)",
        "rose-400" : "hsl(7, 20%, 60%)",
        "red" : "hsl(14, 86%, 42%)"
      },
      fontFamily : {
        "red-hat" : ["Red-hat"]
      }
    },
  },
  plugins: [],
}