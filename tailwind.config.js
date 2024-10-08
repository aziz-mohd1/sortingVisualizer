/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./SortingVisualizer/**/*.{html,js}"],
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        'customLight': 'inset 0px 0px 4px rgba(0, 0, 0, 0.2)',
        'backLight': '3px 3px 10px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.bg-clip-text': {
          '-webkit-background-clip': 'text',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}
