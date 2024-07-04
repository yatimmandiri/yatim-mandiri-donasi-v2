/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        baseColor: {
          50: '#fef5ee',
          100: '#fde9d7',
          200: '#fbcead',
          300: '#f8ac79',
          400: '#f47f43',
          500: '#f16022',
          600: '#e24414',
          700: '#bb3113',
          800: '#952817',
          900: '#782416',
          950: '#410f09',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide'),
  ],
};
