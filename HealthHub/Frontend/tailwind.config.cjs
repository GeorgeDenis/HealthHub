/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'surface-darkest': '#184E30',
        'surface-dark': '#22613e',
        'surface-mid': '#28ba72',
        'surface-mid-dark': '#5e5a66',
        'surface-mid-light': '#76737e',
        'surface-light-dark': '#a9ccb2',
        'surface-light' : '#FFFFFF',
        'primary': '#84bd6a',
        'secondary': '#2a8a32'
      },
    },
  },
  plugins: [],
});

// 'surface-darkest': '#124304',
//         'surface-dark': '#22613e',
//         'surface-mid': '#28ba72',
//         'surface-mid-dark': '#5e5a66',
//         'surface-mid-light': '#76737e',
//         'surface-light-dark': '#a9ccb2',
//         'surface-light' : '#FFFFFF',
//         'primary': '#84bd6a',
//         'secondary': '#2a8a32'