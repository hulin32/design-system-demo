/**
 * Custom Flutter transforms for Style Dictionary
 */
import type StyleDictionary from 'style-dictionary';

export function registerTransforms(sd: typeof StyleDictionary): void {
  // Transform for Flutter color values
  sd.registerTransform({
    name: 'color/flutter',
    type: 'value',
    transitive: true,
    filter: (token) => token.type === 'color' || token.path[0] === 'color',
    transform: (token) => {
      const value = token.value as string;
      const hex = value.replace('#', '');
      if (hex.length === 6) {
        return `Color(0xFF${hex.toUpperCase()})`;
      }
      if (hex.length === 8) {
        return `Color(0x${hex.toUpperCase()})`;
      }
      return value;
    }
  });

  // Transform for Flutter spacing (px to double)
  sd.registerTransform({
    name: 'size/flutter',
    type: 'value',
    filter: (token) =>
      token.type === 'spacing' ||
      token.type === 'fontSize' ||
      token.type === 'borderRadius',
    transform: (token) => {
      const value = parseFloat(token.value as string);
      return isNaN(value) ? (token.value as string) : `${value}`;
    }
  });

  // Transform group for Flutter
  sd.registerTransformGroup({
    name: 'flutter',
    transforms: ['attribute/cti', 'name/camel', 'color/flutter', 'size/flutter']
  });
}

