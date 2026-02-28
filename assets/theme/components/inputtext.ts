import colors from '../colors';

const inputTextSchema = {
  root: {
    background: 'transparent',
    borderColor: 'transparent',
    hoverBorderColor: 'transparent',
    focusBorderColor: 'transparent',
    color: colors['text-dark'],
    placeholderColor: colors['text-secondary'],
    shadow: 'none',
    paddingX: '1rem',
    paddingY: '0.75rem',
    borderRadius: '0',
    focusRing: {
      width: '0',
      color: 'transparent',
      offset: '0',
      shadow: 'none',
    },
    transitionDuration: '0.2s',
  },
};

export default inputTextSchema;
