/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    'text-primary', 'text-primary-dark',
    'bg-bg-dark', 'bg-bg-light',
    'text-white', 'text-black',
    'text-blue-500', 'text-purple-500',
    'hover:bg-gray-100', 'hover:text-white',
    'shadow-lg', 'hover:shadow-xl',
    'rounded-full', 'rounded-lg',
    'text-sm', 'text-lg', 'text-xl', 'text-2xl',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7a63ff',
        'primary-dark': '#6850eb',
        'bg-dark': '#0f0d24',
        'bg-light': '#dfdfdf',
      },
      fontFamily: {
        gilroy: ['Gilroy', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(122, 99, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(122, 99, 255, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
