export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        excellent: '#059669',
        good: '#0ea5e9',
        fair: '#f59e0b',
        poor: '#f43f5e',
        critical: '#be123c',
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#082f49',
        },
        earth: {
          50: '#fafdf3',
          100: '#f3fae8',
          200: '#e7f5d0',
          500: '#84cc16',
          600: '#65a30d',
          700: '#4d7c0f',
        },
      },
      spacing: {
        128: '32rem',
      },
      boxShadow: {
        'elevation': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'glow': '0 0 30px rgba(14, 165, 233, 0.15)',
      },
    },
  },
  plugins: [],
}
