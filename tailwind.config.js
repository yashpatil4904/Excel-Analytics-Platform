/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF5FF',
          100: '#C5DCFA',
          200: '#A0C4F1',
          300: '#7AACE9',
          400: '#5594E0',
          500: '#4A90E2',
          600: '#3B72C5',
          700: '#2D5599',
          800: '#1E386D',
          900: '#101C41',
        },
        secondary: {
          50: '#F6F8FE',
          100: '#EAE4F2',
          200: '#D4CBE4',
          300: '#BEB1D7',
          400: '#A798C9',
          500: '#8A7FBB',
          600: '#6772E5',
          700: '#5152A3',
          800: '#3B3676',
          900: '#251B49',
        },
        success: {
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          500: '#EF4444',
          600: '#DC2626',
        }
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};