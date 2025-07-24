import 'tsconfig-paths/register';
import type { Config } from 'tailwindcss';
import PrimeUI from 'tailwindcss-primeui';
import { tailwindColors } from './assets/theme/shared-colors';
// import { tailwindColors } from '@/assets/theme/shared-colors';

export default {
  content: [
    // '.',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './assets/**/*.{css,scss,ts}',
  ],
  theme: {
    extend: {
      colors: tailwindColors,
      backgroundImage: {
        'tech-gradient': 'linear-gradient(135deg, #0A1F44 0%, #4CA1FF 100%)',
        'indigo-gradient': 'linear-gradient(135deg, #2E1A47 0%, #4CA1FF 100%)',
        'frosted-light': 'linear-gradient(135deg, #FFFFFF 0%, #F5F7FA 100%)',
      },
    },
  },
  plugins: [PrimeUI],
  darkMode: 'class',
} satisfies Config;
