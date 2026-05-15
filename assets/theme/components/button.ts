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
        secondary: {
          background: '#E5E7EB',
          hoverBackground: '#D1D5DB',
          activeBackground: '#CBD5E1',
          borderColor: 'transparent',
          hoverBorderColor: 'transparent',
          activeBorderColor: 'transparent',
          color: '#111827',
          hoverColor: '#000000',
          activeColor: '#000000',
        },
        contrast: {
          background: '#111111',
          hoverBackground: '#000000',
          activeBackground: '#000000',
          borderColor: 'transparent',
          hoverBorderColor: 'transparent',
          activeBorderColor: 'transparent',
          color: '#F3F4F6',
          hoverColor: '#FFFFFF',
          activeColor: '#FFFFFF',
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
        secondary: {
          background: '#374151',
          hoverBackground: '#4B5563',
          activeBackground: '#4B5563',
          borderColor: 'transparent',
          hoverBorderColor: 'transparent',
          activeBorderColor: 'transparent',
          color: '#F3F4F6',
          hoverColor: '#FFFFFF',
          activeColor: '#FFFFFF',
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
