// Components
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from './components/Button';
export { Input, type InputProps, type InputSize, type InputType } from './components/Input';
export { Card, type CardProps, type CardVariant, type CardPadding } from './components/Card';

// Tailwind preset for consumers
export { dsPreset } from './tailwind.preset';

// Tokens and type utilities for autocomplete
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

// Utility (optional export for consumers who want to use it)
export { cn } from './utils/cn';
