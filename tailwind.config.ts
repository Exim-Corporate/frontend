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
