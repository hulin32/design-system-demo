import type { App, Plugin } from 'vue';

// Components
export { Button, type ButtonVariant, type ButtonSize } from './components/Button';
export { Input, type InputSize, type InputType } from './components/Input';
export { Card, type CardVariant, type CardPadding } from './components/Card';

// Composables
export { useButtonLoading } from './composables';

// Tailwind preset
export { dsPreset } from './tailwind.preset';

// Tokens and type utilities
export {
  tokens,
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  zIndex,
} from './tokens';

export type {
  Tokens,
  ColorCategory,
  ColorShade,
  ColorValue,
  SpacingScale,
  BorderRadiusScale,
  ShadowScale,
  FontSizeScale,
  FontWeightScale,
  FontFamilyScale,
  LineHeightScale,
  TransitionScale,
  ZIndexScale,
} from './tokens';

// Utility
export { cn } from './utils/cn';

// Vue Plugin for global registration
import { Button } from './components/Button';
import { Input } from './components/Input';
import { Card } from './components/Card';

/**
 * Vue plugin that registers all design system components globally
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
    app.component('DsButton', Button);
    app.component('DsInput', Input);
    app.component('DsCard', Card);
  }
};

export default DsPlugin;
