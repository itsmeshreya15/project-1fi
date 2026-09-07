/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6C2BD9',
          light: '#8B5CF6',
          lighter: '#C4B5FD',
          lightest: '#EDE9FE',
          dark: '#5521B5',
        },
        brand: {
          purple: '#6C2BD9',
          lavender: '#F3EEFF',
          darkPurple: '#1D006B',
          bgApp: '#F5F5F7',
        },
      },
      maxWidth: {
        app: '520px',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        scaleIn: {
          'from': { opacity: '0', transform: 'scale(0.95)' },
          'to': { opacity: '1', transform: 'scale(1)' },
        },
        fadeInUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.4s ease-in-out infinite',
        float: 'float 3.5s ease-in-out infinite',
        scaleIn: 'scaleIn 0.3s ease forwards',
        fadeInUp: 'fadeInUp 0.4s ease forwards',
      },
    },
  },
  plugins: [],
};
