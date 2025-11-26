import type { Config } from 'tailwindcss';
import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  transitions,
  zIndex,
} from '@ds/tokens';

/**
 * Helper to transform object values
 */
const mapValues = <T, U>(
  obj: Record<string, T>,
  fn: (value: T, key: string) => U
): Record<string, U> =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value, key)])
  );

/**
 * Tailwind CSS preset that maps design system tokens to Tailwind theme
 *
 * Token additions are automatically reflected - no manual mapping needed!
 *
 * @example
 * ```ts
 * // tailwind.config.ts
 * import { dsPreset } from '@ds/vue';
 *
 * export default {
 *   presets: [dsPreset],
 *   content: [
 *     './src/**\/*.{vue,ts}',
 *     './node_modules/@ds/vue/**\/*.{js,ts,vue}',
 *   ],
 * };
 * ```
 */
export const dsPreset: Partial<Config> = {
  theme: {
    extend: {
      // Colors: spread directly (nested objects work with Tailwind)
      colors: { ...colors },

      // Spacing: spread directly
      spacing: { ...spacing },

      // Font family needs to be arrays for Tailwind
      fontFamily: mapValues(typography.fontFamily, (v) => [v]),

      // These can spread directly
      fontSize: { ...typography.fontSize },
      fontWeight: { ...typography.fontWeight },
      lineHeight: { ...typography.lineHeight },

      // Simple spreads - automatically includes new tokens
      borderRadius: { ...borderRadius },
      boxShadow: { ...shadows },

      // Transitions need parsing (extract duration from "150ms ease")
      transitionDuration: mapValues(transitions, (v) => v.split(' ')[0]),

      // zIndex needs string conversion for Tailwind
      zIndex: mapValues(zIndex, (v) => String(v)),
    },
  },
};

export default dsPreset;

