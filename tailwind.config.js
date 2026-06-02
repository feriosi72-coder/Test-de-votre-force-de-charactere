/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAFAF7',
          100: '#F5F4EF',
          200: '#EDECE4',
        },
        navy: {
          50: '#E8EDF0',
          100: '#C5D0D8',
          200: '#9FB3C0',
          300: '#7896A8',
          400: '#4D7189',
          500: '#2E5266',
          600: '#1B3A4B',
          700: '#122A38',
          800: '#0A1C26',
          900: '#050E13',
        },
        sage: {
          50: '#EEF3EF',
          100: '#D5E4D7',
          200: '#B8D1BB',
          300: '#9ABDA0',
          400: '#7DAA84',
          500: '#6B8F71',
          600: '#557359',
          700: '#3E5642',
          800: '#28392C',
          900: '#141D16',
        },
        gold: {
          100: '#F5E9D0',
          200: '#EAD3A0',
          300: '#DFBD71',
          400: '#C9A96E',
          500: '#B8914A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.35s ease-out',
        'slide-in-left': 'slideInLeft 0.35s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(40px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        slideInLeft: { '0%': { opacity: '0', transform: 'translateX(-40px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        pulseSoft: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.6' } },
      },
    },
  },
  plugins: [],
};
