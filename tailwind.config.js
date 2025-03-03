/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // Dark mode pink theme
        dark: {
          primary: {
            50: '#ffe2f0',
            100: '#ffc6e2',
            200: '#ff9dce',
            300: '#ff74b9',
            400: '#ff4ba5',
            500: '#ff0096',
            600: '#e6007d',
            700: '#cc0071',
            800: '#b30064',
            900: '#990057',
          },
          bg: {
            light: '#2d2d2d',
            DEFAULT: '#1c1c1c',
            dark: '#141414',
          },
          text: {
            primary: '#ffffff',
            secondary: '#cccccc',
            muted: '#999999',
          }
        }
      },
    },
  },
  plugins: [],
}