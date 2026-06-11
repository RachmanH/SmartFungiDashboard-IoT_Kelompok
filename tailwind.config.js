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
        // Neobrutalist base colors
        cream: {
50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
        },
        // Status colors - solid neobrutalist
        aman: {
          DEFAULT: '#22c55e',
          bg: '#dcfce7',
          text: '#166534',
          border: '#16a34a',
        },
        waspada: {
          DEFAULT: '#eab308',
          bg: '#fef9c3',
          text: '#854d0e',
          border: '#ca8a04',
        },
        tinggi: {
          DEFAULT: '#f97316',
          bg: '#ffedd5',
          text: '#9a3412',
          border: '#ea580c',
        },
        sangatTinggi: {
          DEFAULT: '#ef4444',
          bg: '#fee2e2',
          text: '#991b1b',
          border: '#dc2626',
        },
 },
      boxShadow: {
        // Neobrutalist hard shadows
        'neo': '4px 4px 0px 0px #000000',
        'neo-sm': '2px 2px 0px 0px #000000',
        'neo-lg': '6px 6px 0px 0px #000000',
        'neo-xl': '8px 8px 0px 0px #000000',
        'neo-dark': '4px 4px 0px 0px rgba(255,255,255,0.2)',
        'neo-dark-sm': '2px 2px 0px 0px rgba(255,255,255,0.2)',
        'neo-dark-lg': '6px 6px 0px 0px rgba(255,255,255,0.2)',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
 },
  },
  plugins: [],
}