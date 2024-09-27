/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'M10': '#624E88',
        'M9': '#8967B3',
        'M8': '#CB80AB',
        'M7': '#E6D9A2',
      },
      keyframes: {
        vibrate: {
          '0%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(0)' },
          '75%': { transform: 'translateX(5px)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        vibrate: 'vibrate 0.5s infinite',
      },
    },
  },
  plugins: [],
}