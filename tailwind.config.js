const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.js",
    "./index.html"
  ],
  theme: {
    extend: {},
    screens: {
      'min': '1px',
      ...defaultTheme.screens,
    },
  },
  plugins: [],
}
