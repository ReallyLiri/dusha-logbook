/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7f0',
          100: '#fdeee0',
          200: '#fbd9c0',
          300: '#f9ae75',
          400: '#f69844',
          500: '#f4831f',
          600: '#e56815',
          700: '#be5014',
          800: '#974018',
          900: '#7a3617',
        },
        secondary: {
          50: '#f7f5f3',
          100: '#ede8e3',
          200: '#ddd2c8',
          300: '#c8b5a6',
          400: '#b09584',
          500: '#9b7553',
          600: '#8f6b4e',
          700: '#775742',
          800: '#614839',
          900: '#503d30',
        },
        neutral: {
          50: '#f4ede8',
          100: '#ede4dc',
          200: '#dbc9b8',
          300: '#c9ae94',
          400: '#b79370',
          500: '#a5784c',
          600: '#8a6340',
          700: '#6f4e34',
          800: '#543928',
          900: '#39241c',
        },
      },
      fontFamily: {
        hebrew: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
