/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        dark: {
          950: '#090d13',
          900: '#0d1117',
          850: '#11161d',
          800: '#161b22',
          700: '#21262d',
          600: '#30363d',
        }
      }
    },
  },
  plugins: [],
}
