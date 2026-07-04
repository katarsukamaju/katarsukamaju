/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
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
        surface: {
          DEFAULT: '#ffffff',
          dark: '#0f1117',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e2230',
          850: '#171b28',
          900: '#0f1117',
          950: '#090b12',
        }
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.02', letterSpacing: '-0.045em' }],
        'heading-1': ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.035em' }],
        'heading-2': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'heading-3': ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.025em' }],
        'heading-4': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
      },
      letterSpacing: {
        'tightest': '-0.045em',
        'tight': '-0.025em',
        'wide': '0.05em',
        'wider': '0.1em',
        'widest': '0.15em',
      },
      boxShadow: {
        'subtle': '0 1px 2px rgba(0,0,0,0.03), 0 1px 4px rgba(0,0,0,0.03)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.04)',
        'elevated': '0 8px 32px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
