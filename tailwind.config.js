module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '22': '5.5rem',
      },
      borderRadius: {
        'big': '30px' 
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
