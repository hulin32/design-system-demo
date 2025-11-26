# Cross-Platform Design System

A unified design system that works across Flutter, React, and Vue applications with full SSR support.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      FIGMA (Design Source)                       │
│                    + Tokens Studio Plugin                        │
└─────────────────────────────┬───────────────────────────────────┘
                              │ Export JSON
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DESIGN TOKENS (JSON)                          │
│         colors, spacing, typography, shadows, radii              │
└─────────────────────────────┬───────────────────────────────────┘
                              │ Style Dictionary
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
    ┌──────────┐        ┌──────────┐        ┌──────────┐
    │   CSS    │        │   Dart   │        │ TS/JS    │
    │Variables │        │Constants │        │Constants │
    └────┬─────┘        └────┬─────┘        └────┬─────┘
         │                   │                   │
         │                   ▼                   ▼
         │            ┌─────────────┐     ┌─────────────┐
         │            │   Flutter   │     │ Tailwind    │
         │            │   Package   │     │   Preset    │
         │            └─────────────┘     └──────┬──────┘
         │                                       │
         │                          ┌────────────┴────────────┐
         │                          ▼                         ▼
         │                   ┌─────────────┐           ┌─────────────┐
         │                   │    React    │           │     Vue     │
         │                   │  (Native)   │           │  (Native)   │
         │                   └─────────────┘           └─────────────┘
         │
         └──────────────────────────────────────────────────────────►
                              Storybook Docs
```

```
design-system/
├── packages/
│   ├── tokens/                 # Design tokens source + build
│   │   ├── src/
│   │   │   └── tokens.json     # Raw tokens from Figma
│   │   ├── build/              # Generated outputs
│   │   │   ├── css/            # CSS custom properties
│   │   │   ├── scss/           # SCSS variables
│   │   │   ├── dart/           # Flutter constants
│   │   │   └── ts/             # TypeScript constants + types
│   │   └── build.ts            # Style Dictionary config
│   │
│   ├── react/                  # Native React components
│   │   ├── src/
│   │   │   ├── components/     # Button, Input, Card
│   │   │   ├── tailwind.preset.ts
│   │   │   └── tokens.ts       # Token re-exports
│   │   └── package.json
│   │
│   ├── vue/                    # Native Vue components
│   │   ├── src/
│   │   │   ├── components/     # Button, Input, Card
│   │   │   ├── tailwind.preset.ts
│   │   │   └── tokens.ts       # Token re-exports
│   │   └── package.json
│   │
│   └── flutter/                # Flutter widget library
│       ├── lib/
│       │   ├── tokens/         # Generated Dart tokens
│       │   ├── components/     # Flutter widgets
│       │   └── theme/          # ThemeData integration
│       └── pubspec.yaml
│
├── docs/                       # Storybook documentation
└── package.json                # Monorepo root (pnpm workspaces)
```

## Packages

| Package            | Description                                    |
| ------------------ | ---------------------------------------------- |
| `@ds/tokens`       | Design tokens source, build, and type utilities |
| `@ds/react`        | Native React components with Tailwind          |
| `@ds/vue`          | Native Vue components with Tailwind            |
| `packages/flutter` | Flutter widget library                         |

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 9
- Flutter SDK (for Flutter package)

### Installation

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build
```

### Development

```bash
# Build tokens first
pnpm build:tokens

# Start development mode
pnpm dev

# Run Storybook documentation
pnpm storybook
```

## Design Tokens

Tokens are the single source of truth for the design system. They are defined in JSON format and transformed to platform-specific outputs:

- **CSS Custom Properties** - For Storybook and legacy usage
- **TypeScript Constants** - For type-safe JS usage with full autocomplete
- **Dart Constants** - For Flutter
- **Tailwind Preset** - Auto-generated theme configuration

### Token Categories

- **Colors** - Primary, secondary, neutral, success, warning, error, semantic
- **Spacing** - Consistent spacing scale (0-24)
- **Typography** - Font families, sizes, weights, line heights
- **Border Radius** - Rounded corner values
- **Shadows** - Elevation and shadow definitions
- **Transitions** - Animation timing
- **Z-Index** - Layering scale

### Type Utilities

Tokens include TypeScript type utilities for autocomplete:

```typescript
import { tokens, type ColorCategory, type SpacingScale } from '@ds/react';

// Full autocomplete
const primary500 = tokens.colors.primary['500'];  // "#3b82f6"

// Type-safe function
function getSpacing(key: SpacingScale): string {
  return tokens.spacing[key];
}
```

## Usage

### React (Next.js compatible)

```bash
npm install @ds/react
```

```typescript
// tailwind.config.ts
import { dsPreset } from '@ds/react';

export default {
  presets: [dsPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './node_modules/@ds/react/**/*.{js,ts,jsx,tsx}',
  ],
};
```

```tsx
import { Button, Input, Card } from '@ds/react';

function App() {
  return (
    <Card variant="elevated" padding="md">
      <Input label="Email" type="email" placeholder="Enter email" />
      <Button variant="primary" size="md">Submit</Button>
    </Card>
  );
}
```

### Vue (Nuxt compatible)

```bash
npm install @ds/vue
```

```typescript
// tailwind.config.ts
import { dsPreset } from '@ds/vue';

export default {
  presets: [dsPreset],
  content: [
    './components/**/*.vue',
    './node_modules/@ds/vue/**/*.{js,vue}',
  ],
};
```

```vue
<template>
  <Card variant="elevated" padding="md">
    <Input v-model="email" label="Email" type="email" />
    <Button variant="primary" @click="submit">Submit</Button>
  </Card>
</template>

<script setup>
import { Button, Input, Card } from '@ds/vue';
import { ref } from 'vue';

const email = ref('');
const submit = () => console.log(email.value);
</script>
```

### Flutter

```dart
import 'package:ds_flutter/ds_flutter.dart';

class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return DsButton(
      label: 'Click me',
      variant: DsButtonVariant.primary,
      size: DsButtonSize.md,
      onPressed: () {},
    );
  }
}
```

## Components

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'primary'` | Button style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable interactions |
| `fullWidth` | `boolean` | `false` | Full width button |

### Input

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'text' \| 'email' \| 'password' \| 'number' \| 'tel' \| 'url' \| 'search'` | `'text'` | Input type |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input size |
| `label` | `string` | - | Label text |
| `helper` | `string` | - | Helper text |
| `error` | `string` | - | Error message |

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'elevated' \| 'outlined' \| 'filled'` | `'elevated'` | Card style |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Card padding |
| `interactive` | `boolean` | `false` | Enable click interactions |

## Figma Integration

This design system integrates with Figma via the Tokens Studio plugin:

1. Install [Tokens Studio](https://tokens.studio/) plugin in Figma
2. Connect to this repository via GitHub sync
3. Design tokens are automatically synced when updated in Figma

## License

MIT
