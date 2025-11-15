/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00d4ff',
        'islamic-gold': '#d4af37',
      },
    },
  },
  plugins: [],
}
