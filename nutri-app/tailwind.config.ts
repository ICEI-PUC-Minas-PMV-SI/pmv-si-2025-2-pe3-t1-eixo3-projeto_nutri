/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#27911E',
        },
        'background-light': '#ffffff',
        'background-card': '#fafdff',
        'text-base': '#333333',
        'stroke': '#D1D9DF',
        'text-muted': '#666666',
      },

      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: []
}