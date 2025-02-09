/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Active le mode sombre
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#1a1a1a',
          100: '#2d2d2d',
          200: '#404040',
          300: '#535353',
          400: '#666666',
          500: '#808080',
        }
      },
      backgroundColor: {
        dark: {
          DEFAULT: '#121212',
          card: '#1e1e1e',
          nav: 'rgba(30, 30, 30, 0.8)',
        }
      },
      textColor: {
        dark: {
          DEFAULT: '#e5e5e5',
          muted: '#a3a3a3',
        }
      },
      borderColor: {
        dark: {
          DEFAULT: '#2d2d2d',
        }
      }
    },
  },
  plugins: [],
}
