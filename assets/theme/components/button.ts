import colors from '../colors';

/**
 * Button component theme customization
 */
const buttonSchema = {
  light: {
    root: {
      contrast: {
        color: colors['text-light'],
        background: colors.accent,
        hoverBackground: colors['accent-hover'],
        borderColor: colors['accent'],
        hoverColor: colors['text-light'],
        activeColor: colors['accent-active'],
      },
    },
    outlined: {
      primary: {
        color: colors['text-light'],
        background: colors['background-gray-hover'],
        borderColor: colors['background-gray-hover'],
        hoverColor: colors['text-dark'],
        hoverBackground: colors['background-gray-hover'],
        activeBackground: 'transparent',
        activeColor: colors['text-dark'],
      },
    },
  },
  dark: {
    root: {
      contrast: {
        color: colors['text-light'],
        hoverColor: colors['text-light'],
        background: colors['accent'],
        hoverBackground: colors['accent-hover'],
        activeBackground: colors['accent-active'],
      },
    },
  },
};

export default buttonSchema;
