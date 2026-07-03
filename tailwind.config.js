/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#F8F8F8',
        card: '#FFFFFF',
        primary: '#111827',
        secondary: '#6B7280',
        accent: '#8B5CF6',
        border: '#E5E7EB',
        success: '#22C55E',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(17, 24, 39, 0.06)',
        card: '0 4px 24px rgba(17, 24, 39, 0.08)',
        elevated: '0 20px 60px rgba(17, 24, 39, 0.12)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
      },
    },
  },
  plugins: [],
}
