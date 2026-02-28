const buttonSchema = {
  root: {
    borderRadius: '9999px',
    paddingX: '1.75rem',
    paddingY: '1rem',
    sm: {
      paddingX: '1.25rem',
      paddingY: '0.75rem',
    },
    label: {
      fontWeight: '500',
    },
    transitionDuration: '0.3s',
  },
  colorScheme: {
    light: {
      root: {
        primary: {
          background: '#000000',
          hoverBackground: '#1a1a12',
          activeBackground: '#000000',
          borderColor: 'transparent',
          hoverBorderColor: 'transparent',
          activeBorderColor: 'transparent',
          color: '#EBE8D2',
          hoverColor: '#CBBB97',
          activeColor: '#EBE8D2',
        },
        contrast: {
          background: '#000000',
          hoverBackground: '#1a1a12',
          activeBackground: '#000000',
          borderColor: 'transparent',
          hoverBorderColor: 'transparent',
          activeBorderColor: 'transparent',
          color: '#EBE8D2',
          hoverColor: '#CBBB97',
          activeColor: '#EBE8D2',
        },
      },
    },
    dark: {
      root: {
        primary: {
          background: '#000000',
          hoverBackground: '#1a1a1a',
          activeBackground: '#000000',
          borderColor: 'transparent',
          hoverBorderColor: 'transparent',
          activeBorderColor: 'transparent',
          color: '#EBE8D2',
          hoverColor: '#CBBB97',
          activeColor: '#EBE8D2',
        },
        contrast: {
          background: '#000000',
          hoverBackground: '#1a1a1a',
          activeBackground: '#000000',
          borderColor: 'transparent',
          hoverBorderColor: 'transparent',
          activeBorderColor: 'transparent',
          color: '#EBE8D2',
          hoverColor: '#CBBB97',
          activeColor: '#EBE8D2',
        },
      },
    },
  },
};

export default buttonSchema;
