import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import colors from './colors';
import buttonSchema from './components/button';
import toggleSwitchSchema from './components/toggleSwitch';
import badgeSchema from './components/badge'; // Import badge schema

/**
 * Main theme preset that configures PrimeVue components
 */
const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
    colorScheme: {
      light: {
        primary: {},
        secondary: {
          // Define secondary colors for light mode
          background: colors['background-gray'],
          color: colors['text-dark'],
          hoverBackground: colors['background-gray-hover'],
        },
      },
      dark: {
        primary: {
          color: colors['text-light'],
        },
        secondary: {
          // Define secondary colors for dark mode
          background: colors['dark-surface'],
          color: colors['dark-text-secondary'],
          hoverBackground: colors['dark-border'],
        },
      },
    },
  },
  components: {
    toggleswitch: toggleSwitchSchema,
    button: {
      colorScheme: {
        light: buttonSchema.light,
        dark: buttonSchema.dark,
      },
    },
    badge: badgeSchema, // Add badge configuration
  },
});

export default Noir;
