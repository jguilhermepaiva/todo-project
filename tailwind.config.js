/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'min700': '700px',
        'min701': '701px',
      },
      colors: {
        customPurple: '#787CAF',
        customLavender: '#99729F',
      },
      fontSize: {},
      clipPath: {
        //banner secondary
        'polygon-9': 'polygon(66px 2px, 99% 0px, 87% 100%, 52px 104%, 36% 49%)',
        'polygon-10': 'polygon(63px 0px, 99% 0px, 77% 121%, 49px 106%, 28% 49%)',
        'polygon-sm': 'polygon(67px 2px, 99% 0px, 87% 121%, 49px 106%, 20% 47%)',
        'polygon-md': 'polygon(61px 0px, 100% 0px, 85% 150%, 54px 104%, 13% 48%)',
        'polygon-lg': 'polygon(64px 0px, 99% 0px, 83% 100%, 56px 100%, 12% 49%)',
        //banner main - 1
        'polygon-m1-1': 'polygon(3% 0%, 98% 0%, 87% 100%, 11% 100%)',
        'polygon-m1-2': 'polygon(4% 0%, 96% 0%, 83% 100%, 17% 100%)',
        'polygon-m1-3': 'polygon(7% 0%, 96% 0%, 75% 100%, 23% 100%)',
        'polygon-m1-4': 'polygon(8% 0%, 100% 0%, 80% 100%, 29% 100%)',
        'polygon-m1-5': 'polygon(7% 0%, 100% 0%, 78% 100%, 28% 100%)',
        //banner main - 2
        'polygon-m2-1': 'polygon(0% -4%, 100% 1%, 85% 100%, 1% 100%)',
        'polygon-m2-2': 'polygon(0% 0%, 99% 0%, 84% 99%, 2% 99%)',
        'polygon-m2-3': 'polygon(0% -8%, 98% 0%, 82% 100%, 2% 100%)',
        'polygon-m2-4': 'polygon(0% 0%, 100% 0%, 78% 100%, 2% 100%)',
        'polygon-m2-5': 'polygon(0% 0%, 100% 0%, 83% 100%, 6% 100%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {
        '.clip-polygon-sm': {
          clipPath: theme('clipPath.polygon-sm'),
        },
        '.clip-polygon-md': {
          clipPath: theme('clipPath.polygon-md'),
        },
        '.clip-polygon-lg': {
          clipPath: theme('clipPath.polygon-lg'),
        },
        '.clip-polygon-10': {
          clipPath: theme('clipPath.polygon-10'),
        },
        '.clip-polygon-9': {
          clipPath: theme('clipPath.polygon-9'),
        },
        '.clip-polygon-m1-1': {
          clipPath: theme('clipPath.polygon-m1-1'),
        },
        '.clip-polygon-m1-2': {
          clipPath: theme('clipPath.polygon-m1-2'),
        },
        '.clip-polygon-m1-3': {
          clipPath: theme('clipPath.polygon-m1-3'),
        },
        '.clip-polygon-m1-4': {
          clipPath: theme('clipPath.polygon-m1-4'),
        },
        '.clip-polygon-m1-5': {
          clipPath: theme('clipPath.polygon-m1-5'),
        },
        '.clip-polygon-m2-1': {
          clipPath: theme('clipPath.polygon-m2-1'),
        },
        '.clip-polygon-m2-2': {
          clipPath: theme('clipPath.polygon-m2-2'),
        },
        '.clip-polygon-m2-3': {
          clipPath: theme('clipPath.polygon-m2-3'),
        },
        '.clip-polygon-m2-4': {
          clipPath: theme('clipPath.polygon-m2-4'),
        },
        '.clip-polygon-m2-5': {
          clipPath: theme('clipPath.polygon-m2-5'),
        },
      };
      addUtilities(newUtilities, ['responsive']); // Assegura que as utilidades são aplicadas de forma responsiva
    },
  ],
};