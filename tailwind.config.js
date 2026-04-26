/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink:     '#0d0d0d',
        paper:   '#f5f0e8',
        paper2:  '#ede8de',
        dot:     '#1a1a1a',
        empty:   '#e0dbd0',
        accent:  '#c8440a',
        line:    '#ccc5b5',
      },
      fontFamily: {
        mono:    ['"DM Mono"', 'monospace'],
        display: ['"Unbounded"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
