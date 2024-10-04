/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      boxShadow: {
        'customLight': 'inset 0px 0px 4px rgba(0, 0, 0, 0.2)',
        'backLight': '3px 3px 10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}

