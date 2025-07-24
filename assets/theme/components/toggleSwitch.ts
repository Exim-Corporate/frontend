import colors from '../colors';

/**
 * Toggle switch component theme customization
 */
const toggleSwitchSchema = {
  root: {
    width: '4rem',
    height: '2rem',
  },
  handle: {
    size: '1.5rem', // Smaller handle
    background: colors['text-light'], // White handle in both modes
    hoverBackground: colors['text-light'],
    checkedBackground: colors['text-light'],
    checkedHoverBackground: colors['text-light'],
  },
  colorScheme: {
    light: {
      root: {
        background: colors['background-gray'],
        hoverBackground: colors['background-gray-hover'],
        borderColor: 'transparent',
      },
      handle: {
        background: 'transparent',
        disabledBackground: 'transparent',
        hoverBackground: 'transparent',
        checkedBackground: 'transparent',
        checkedHoverBackground: 'transparent',
      },
    },
    dark: {
      root: {
        checkedBackground: colors['dark-background'],
        checkedHoverBackground: colors['navy-blue-hover'],
      },
      handle: {
        background: 'transparent',
        disabledBackground: 'transparent',
        hoverBackground: 'transparent',
        checkedBackground: 'transparent',
        checkedHoverBackground: 'transparent',
      },
    },
  },
};

export default toggleSwitchSchema;
