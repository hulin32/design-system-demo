import type { Preview } from '@storybook/web-components';
import '@ds/tokens/css';
import '@ds/web-components';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#fafafa' },
        { name: 'dark', value: '#18181b' },
        { name: 'white', value: '#ffffff' }
      ]
    }
  }
};

export default preview;

