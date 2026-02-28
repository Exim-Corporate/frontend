import colors from '../colors';

const badgeSchema = {
  root: {
    borderRadius: '0.375rem',
    fontWeight: '600',
    paddingX: '1.75rem',
    paddingY: '0.5rem',
    fontSize: '0.875rem',
  },
  colorScheme: {
    light: {
      secondary: {
        background: colors['background-gray'],
        color: colors['text-dark'],
      },
    },
  },
};

export default badgeSchema;
