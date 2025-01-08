// Theme-related constants and styles
import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    brand: {
      background: '#1A1A1A',
      primary: '#2A4C3B',
      secondary: '#E5FF44',
      accent: '#FF4444',
      text: '#FFFFFF',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.background',
        color: 'brand.text',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
      },
      variants: {
        solid: {
          bg: 'brand.primary',
          color: 'brand.text',
          _hover: {
            bg: 'brand.secondary',
            color: 'brand.background',
          },
        },
      },
    },
  },
});
