/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111111',
        'primary-light': '#333333',
        'primary-dark': '#000000',
        accent: '#e8c96d',
        'accent-light': '#f0d88a',
        light: '#f9f9f9',
        'light-2': '#f2f2f0',
        'light-3': '#ebebeb',
        'dark-text': '#1a1a1a',
      },
      animation: {
        'teal-shine': 'teal-shine 3s linear infinite',
        'fabric-weave': 'fabric-weave 4s ease-in-out infinite',
        'cloth-ripple': 'cloth-ripple 0.8s ease-out',
        'gsm-pulse': 'gsm-pulse 2s ease-in-out infinite',
        'yarn-flow': 'yarn-flow 8s linear infinite',
        'marquee': 'marquee 20s linear infinite',
        'reveal-up': 'reveal-up 0.7s ease forwards',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
      },
      keyframes: {
        'teal-shine': {
          '0%': { backgroundPosition: '0% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'fabric-weave': {
          '0%, 100%': { backgroundPosition: '0 0', filter: 'brightness(1)' },
          '50%': { backgroundPosition: '20px 20px', filter: 'brightness(1.05)' },
        },
        'gsm-pulse': {
          '0%, 100%': { transform: 'scaleY(0.95)', opacity: '0.8' },
          '50%': { transform: 'scaleY(1.05)', opacity: '1' },
        },
        'yarn-flow': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100% 0' },
        },
      },
    },
  },
  plugins: [],
}