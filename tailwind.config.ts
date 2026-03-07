import type { Config } from 'tailwindcss';
import sharedColors, { tailwindColors } from './assets/theme/shared-colors';

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './assets/**/*.{css,scss,ts}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '3rem',
        xl: '3.125rem',
        '2xl': '3.125rem',
      },
      screens: {
        xl: '1400px',
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Shippori Mincho"', 'serif'],
      },
      colors: tailwindColors,
      backgroundImage: {
        'btn-gradient': `linear-gradient(180deg, ${sharedColors['btn-gradient-from']} 0%, ${sharedColors['btn-gradient-to']} 100%)`,
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} satisfies Config;
