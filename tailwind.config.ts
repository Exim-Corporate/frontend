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
  plugins: [
    ({ addComponents }: any) => {
      addComponents({
        '.container': {
          width: '100%',
          maxWidth: '1400px',
          marginInline: 'auto',
          paddingInline: '1rem',
          '@media (min-width: 640px)': {
            paddingInline: '1.5rem',
          },
          '@media (min-width: 1024px)': {
            paddingInline: '3rem',
          },
          '@media (min-width: 1280px)': {
            paddingInline: '3.125rem',
          },
        },
      });
    },
  ],
  darkMode: 'class',
} satisfies Config;
