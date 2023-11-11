/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          background: 'linear-gradient(to right, #6dd5ed, #7deb9d)',
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'font-weight': '700', 
          'font-size': '2rem', 
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}