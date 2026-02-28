import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';
import colors from './colors';
import buttonSchema from './components/button';
import inputTextSchema from './components/inputtext';

const Noir = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {},
        secondary: {
          background: colors['background-gray'],
          color: colors['text-dark'],
        },
      },
    },
  },
  components: {
    button: {
      root: buttonSchema.root,
      colorScheme: buttonSchema.colorScheme,
    },
    inputtext: inputTextSchema, 
  },
});

export default Noir;
