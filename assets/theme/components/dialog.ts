import colors from '../colors';

const dialogSchema = {
  root: {
    borderRadius: '1.25rem',
    background: '#FFFFFF',
    color: colors['text-dark'],
    borderColor: 'transparent',
    shadow: '0 24px 60px rgba(0, 0, 0, 0.12)',
  },
  header: {
    padding: '0.5rem',
  },
  content: {
    padding: '2.5rem 2.5rem 3.5rem 2.5rem',
  },
  colorScheme: {
    light: {
      root: {
        background: '#FFFFFF',
        color: colors['text-dark'],
      },
    },
    dark: {
      root: {
        background: '#FFFFFF',
        color: colors['text-dark'],
      },
    },
  },
};

export default dialogSchema;
