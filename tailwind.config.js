/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6E0D25',
          light: '#8B1A35',
          dark: '#4E0919',
        },
        secondary: {
          DEFAULT: '#FFFFB3',
          light: '#FFFFD1',
          dark: '#FFFF8F',
        },
        accent: {
          DEFAULT: '#DCAB6B',
          light: '#E5BF8F',
          dark: '#774E24',
        },
        neutral: {
          DEFAULT: '#6A381F',
          light: '#8A5A3F',
          dark: '#4A1800',
        },
      },
    },
  },
  plugins: [],
};