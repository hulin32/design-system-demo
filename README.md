# Cross-Platform Design System

A unified design system that works across Flutter, React, and Vue applications.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      FIGMA (Design Source)                       │
│                    + Tokens Studio Plugin                        │
└─────────────────────────┬───────────────────────────────────────┘
                          │ Export JSON
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DESIGN TOKENS (JSON)                          │
│         colors, spacing, typography, shadows, radii              │
└─────────────────────────┬───────────────────────────────────────┘
                          │ Style Dictionary
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │   CSS    │    │   Dart   │    │ TS/JS    │
    │Variables │    │Constants │    │Constants │
    └────┬─────┘    └────┬─────┘    └────┬─────┘
         │               │               │
         ▼               ▼               ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ Web Comps   │   │   Flutter   │   │  React/Vue  │
│   (Lit)     │   │   Package   │   │  Wrappers   │
└─────────────┘   └─────────────┘   └─────────────┘
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
│   │   │   └── ts/             # TypeScript constants
│   │   └── config.js           # Style Dictionary config
│   │
│   ├── web-components/         # Lit-based web components
│   │   ├── src/
│   │   │   ├── button/
│   │   │   ├── input/
│   │   │   └── ...
│   │   └── package.json
│   │
│   ├── react/                  # React wrapper components
│   │   └── src/
│   │
│   ├── vue/                    # Vue wrapper components  
│   │   └── src/
│   │
│   └── flutter/                # Flutter widget library
│       ├── lib/
│       │   ├── tokens/         # Generated Dart tokens
│       │   ├── components/     # Flutter widgets
│       │   └── theme/          # ThemeData integration
│       └── pubspec.yaml
│
├── docs/                       # Storybook documentation
├── .github/                    # CI/CD for token sync
└── package.json                # Monorepo root (pnpm workspaces)
```

## Packages

| Package              | Description                             |
| -------------------- | --------------------------------------- |
| `@ds/tokens`         | Design tokens source and build pipeline |
| `@ds/web-components` | Lit-based web components                |
| `@ds/react`          | React wrapper components                |
| `@ds/vue`            | Vue wrapper components                  |
| `packages/flutter`   | Flutter widget library                  |

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

- **CSS Custom Properties** - For web components
- **TypeScript Constants** - For type-safe JS usage
- **Dart Constants** - For Flutter

### Token Categories

- **Colors** - Primary, secondary, neutral, semantic colors
- **Spacing** - Consistent spacing scale
- **Typography** - Font families, sizes, weights
- **Border Radius** - Rounded corner values
- **Shadows** - Elevation and shadow definitions

## Usage

### React

```tsx
import { DsButton } from '@ds/react';

function App() {
  return <DsButton variant="primary" size="md">Click me</DsButton>;
}
```

### Vue

```vue
<template>
  <ds-button variant="primary" size="md">Click me</ds-button>
</template>

<script setup>
import '@ds/web-components';
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

## Figma Integration

This design system integrates with Figma via the Tokens Studio plugin:

1. Install [Tokens Studio](https://tokens.studio/) plugin in Figma
2. Connect to this repository via GitHub sync
3. Design tokens are automatically synced when updated in Figma

## License

MIT

