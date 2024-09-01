/** @type {import('tailwindcss').Config} */
module.exports = {
  relative: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '.6rem',
      },
      colors: {
        'primary': '#00D1FF',
        'secondary': '#061728',
        'tertiary': '#82ca9d',
      },
      animation: {
        'fade-in': 'fadeIn 0.75s ease-in',
        'fade-out': 'fadeOut 0.75s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 }
        }
      },
      borderWidth: {
        '1': '1px',
      },
      transitionProperty: {
        'height': 'height',
      },
    },
  },
  plugins: [],
}
