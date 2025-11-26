import type { App, Plugin } from 'vue';

// Import web components to register them
import '@ds/web-components';

// Re-export types from web components
export type {
  ButtonVariant,
  ButtonSize,
  InputSize,
  InputType,
  CardVariant,
  CardPadding
} from '@ds/web-components';

/**
 * Vue plugin that configures the app to use design system web components
 *
 * @example
 * ```ts
 * import { createApp } from 'vue';
 * import { DsPlugin } from '@ds/vue';
 *
 * const app = createApp(App);
 * app.use(DsPlugin);
 * app.mount('#app');
 * ```
 */
export const DsPlugin: Plugin = {
  install(app: App) {
    // Configure Vue to recognize ds-* elements as custom elements
    app.config.compilerOptions.isCustomElement = (tag: string) => {
      return tag.startsWith('ds-');
    };
  }
};

/**
 * Type augmentations for Vue to provide better IntelliSense
 * when using ds-* elements in templates
 */
declare module 'vue' {
  export interface GlobalComponents {
    'ds-button': {
      variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
      size?: 'sm' | 'md' | 'lg';
      disabled?: boolean;
      loading?: boolean;
      type?: 'button' | 'submit' | 'reset';
    };
    'ds-input': {
      value?: string;
      type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
      placeholder?: string;
      label?: string;
      helper?: string;
      error?: string;
      size?: 'sm' | 'md' | 'lg';
      disabled?: boolean;
      required?: boolean;
      readonly?: boolean;
      name?: string;
    };
    'ds-card': {
      variant?: 'elevated' | 'outlined' | 'filled';
      padding?: 'none' | 'sm' | 'md' | 'lg';
      interactive?: boolean;
    };
  }
}

export default DsPlugin;

