/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        paper: {
          DEFAULT: '#f3f1e9',
          raised: '#faf9f4',
          sunken: '#e9e7df',
          border: '#d8dbd1',
        },
        ink: {
          DEFAULT: '#202b26',
          muted: '#647069',
          subtle: '#87918a',
        },
        accent: {
          DEFAULT: '#c9583c',
          dark: '#a7432c',
          light: '#e0745a',
        },
        acid: {
          DEFAULT: '#d4ec7a',
          dark: '#c7df75',
        },
        forest: {
          950: '#0c1210',
          900: '#111815',
          850: '#141d19',
          800: '#18211d',
          700: '#23302a',
          600: '#303a35',
          500: '#35413b',
          400: '#4a5951',
        },
        dark: {
          950: '#0c1210',
          900: '#111815',
          850: '#141d19',
          800: '#18211d',
          700: '#23302a',
          600: '#303a35',
        }
      }
    },
  },
  plugins: [],
}
