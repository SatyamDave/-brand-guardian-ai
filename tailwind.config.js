/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canva: {
          purple: '#8b3dff',
          'purple-dark': '#7c3aed',
          'purple-light': '#a855f7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'canva': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'canva-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'canva-xl': '0 12px 32px rgba(139, 61, 255, 0.2)',
      },
    },
  },
  plugins: [],
}
