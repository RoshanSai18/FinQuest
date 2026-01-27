/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#c8ff00',
          50: '#f7ffe6',
          100: '#eeffcc',
          200: '#ddff99',
          300: '#ccff66',
          400: '#c8ff00',
          500: '#b3e600',
          600: '#99cc00',
          700: '#7f9900',
          800: '#667700',
          900: '#4d5500',
        },
        dark: {
          DEFAULT: '#0B0C10',
          100: '#1a2235',
          200: '#0d1117',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'fade-up': 'fadeUp 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'gradient': 'gradient 3s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'typing': 'typing 3.5s steps(40, end), blink .75s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(200, 255, 0, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(200, 255, 0, 0.8)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#c8ff00' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
