import type { Preview } from '@storybook/react-vite';
import '../styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      options: {
        light: { name: 'light', value: '#fafafa' },
        dark: { name: 'dark', value: '#18181b' },
        white: { name: 'white', value: '#ffffff' }
      }
    }
  },

  initialGlobals: {
    backgrounds: {
      value: 'light'
    }
  }
};

export default preview;
