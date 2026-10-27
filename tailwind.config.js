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
        graphite: '#0C0C0D',
        ink: '#151517',
        bone: '#EFEAE0',
        mist: '#A8A398',
        signal: {
          DEFAULT: '#FF4F1F',
          glow: 'rgba(255, 79, 31, 0.35)',
        },
        phosphor: {
          DEFAULT: '#B6FF5C',
          glow: 'rgba(182, 255, 92, 0.35)',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Inter Tight"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        hand: ['Caveat', 'cursive'],
      },
      borderRadius: {
        DEFAULT: '3px',
        sm: '2px',
        md: '4px',
        lg: '6px',
      },
      boxShadow: {
        'signal-glow': '0 0 24px -2px rgba(255, 79, 31, 0.45)',
        'phosphor-glow': '0 0 20px -2px rgba(182, 255, 92, 0.4)',
      },
      transitionTimingFunction: {
        'portfolio-ease': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
    },
  },
  plugins: [],
}
