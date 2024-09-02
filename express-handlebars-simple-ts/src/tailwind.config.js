const plugin = require('tailwindcss/plugin')

function addZindex() {
  let result = {};
  let zindex = 990

  for (let i = 0; i < 20; i++) {
      let value = zindex - (i*10);
      result[`.z-${value}`] = {
          'z-index': value
      }
  }

  return result;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: ["./src/**/*.{html,js,hbs}"],
  theme: {
    extend: {
      
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ...addZindex()
      })
    })
  ],
}

