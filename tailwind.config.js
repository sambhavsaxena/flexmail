/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      colors: {
        neon: {
          blue: '#00f2fe',
          pink: '#ff00e5',
          green: '#39ff14',
        },
      },
    },
  },
  plugins: [],
};