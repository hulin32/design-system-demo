/**
 * Type-safe token accessor with full autocomplete
 *
 * Re-exports tokens from @ds/tokens for convenient access in React apps.
 * All token values and types are available with full TypeScript support.
 *
 * @example
 * ```tsx
 * import { tokens, type ColorCategory, type SpacingScale } from '@ds/react';
 *
 * // Full autocomplete for token values
 * const primaryColor = tokens.colors.primary[500];  // "#3b82f6"
 * const space4 = tokens.spacing[4];                  // "16px"
 * const radiusMd = tokens.borderRadius.md;           // "8px"
 *
 * // Type-safe function parameters
 * function getColor(category: ColorCategory, shade: string) {
 *   return tokens.colors[category][shade as keyof typeof tokens.colors[typeof category]];
 * }
 * ```
 */

// Re-export tokens object and all individual token groups
export {
  tokens,
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  zIndex,
} from '@ds/tokens';

// Re-export all type utilities for autocomplete
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
} from '@ds/tokens';

