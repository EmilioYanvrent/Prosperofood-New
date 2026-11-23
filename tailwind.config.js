/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cocoa: {
          950: '#130E0B',
          900: '#1A130F',
          850: '#1E1611',
        },
        line: { DEFAULT: '#2C211A', soft: '#3A2C22', strong: '#4A3A2E' },
        cream: { DEFAULT: '#F2E8D9', soft: '#E5D6C2', dim: '#CDBBA6' },
        muted: '#A8957F',
        gold: { DEFAULT: '#C99A62', light: '#E2B985' },
        link: '#E9C99A',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Work Sans"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
