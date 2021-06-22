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
      },
      fontSize: {
       '3xl': '1.875rem',
       '4xl': '2.25rem',
       '5xl': '3rem',
       '6xl': '4rem',
       '7xl': '5rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
