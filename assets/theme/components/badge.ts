import colors from '../colors';

/**
 * Badge component theme customization
 */
const badgeSchema = {
  root: {
    borderRadius: '0.375rem', // rounded-md equivalent
    fontWeight: '600', // font-semibold equivalent
    paddingX: '1.75rem', // px-3 equivalent
    paddingY: '0.5rem', // py-2 equivalent
    fontSize: '0.875rem', // text-sm equivalent
    // Add base transition for smooth hover effects
    transitionDuration: '200ms',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionProperty: 'background-color, color, border-color',
  },
  // Define color schemes based on severity
  colorScheme: {
    light: {
      primary: {
        background: colors['accent'], // Use primary color from shared colors
        color: colors['text-light'],
        hoverBackground: colors['navy-blue-hover'],
      },
      secondary: {
        background: colors['background-gray'],
        color: colors['text-dark'],
        hoverBackground: colors['background-gray-hover'],
      },
      // Add other severities if needed (info, success, warning, error)
      info: { background: '{blue.100}', color: '{blue.700}' },
      success: { background: '{green.100}', color: '{green.700}' },
      warning: { background: '{yellow.100}', color: '{yellow.700}' },
      error: { background: '{red.100}', color: '{red.700}' },
      contrast: { background: '{surface.950}', color: '{surface.0}' },
    },
    dark: {
      primary: {
        background: colors.accent, // Use accent color for dark primary
        color: colors['navy-blue'], // Dark text on accent background
        hoverBackground: colors['accent-hover'],
      },
      secondary: {
        background: colors['dark-surface'],
        color: colors['dark-text-secondary'],
        hoverBackground: colors['dark-border'],
      },
      // Add other severities if needed
      info: { background: '{blue.950}', color: '{blue.50}' },
      success: { background: '{green.950}', color: '{green.50}' },
      warning: { background: '{yellow.950}', color: '{yellow.50}' },
      error: { background: '{red.950}', color: '{red.50}' },
      contrast: { background: '{surface.0}', color: '{surface.950}' },
    },
  },
};

export default badgeSchema;
