import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-playfair)', 'serif'],
      },
      colors: {
        midnight: '#020617',
        'navy-light': '#0F172A',
        'rose-accent': '#FDA4AF',
        'rose-dark': '#FB7185',
        lavender: '#818CF8',
        'white-ghost': '#F8FAFC',
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.05) translate(2%, 2%)' },
          '100%': { transform: 'scale(1.1) translate(4%, 4%)' },
        },
        typewriter: {
          from: { width: '0', visibility: 'hidden' },
          to: { width: '100%', visibility: 'visible' },
        },
        slideLeftIn: {
          from: { opacity: '0', transform: 'translateX(100%)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        floatUp: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-80px) scale(0.5)' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 8s ease-in-out infinite',
        typewriter: 'typewriter 0.05s steps(1) forwards',
        'slide-left-in': 'slideLeftIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'fade-in': 'fadeIn 0.6s ease-in',
        'float-up': 'floatUp 1.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

export default config
