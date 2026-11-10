# ⚙️ @yuva-devlab/config

> Shared configuration packages for TypeScript, ESLint, and Prettier used across the Yuva Devlab monorepo.

## Overview

This directory contains three configuration packages that ensure consistent code quality and formatting across all workspace packages:

- **[@yuva-devlab/typescript-config](#typescript-config)** - Shared TypeScript compiler settings
- **[@yuva-devlab/eslint-config](#eslint-config)** - Comprehensive ESLint rules
- **[@yuva-devlab/prettier-config](#prettier-config)** - Code formatting standards

## Benefits

- ✅ **Consistency** - Same rules across all packages
- 🔄 **Maintainability** - Update once, apply everywhere
- 📦 **Reusability** - Use in external projects
- 🎯 **Best Practices** - Curated, production-ready configurations

## Installation

### Install All Configs

```bash
npm install -D @yuva-devlab/typescript-config @yuva-devlab/eslint-config @yuva-devlab/prettier-config
```

### Install Individually

```bash
# TypeScript config
npm install -D @yuva-devlab/typescript-config

# ESLint config
npm install -D @yuva-devlab/eslint-config

# Prettier config
npm install -D @yuva-devlab/prettier-config
```

---

## TypeScript Config

### Installation

```bash
npm install -D @yuva-devlab/typescript-config
```

### Usage

Create or update your `tsconfig.json`:

```json
{
  "extends": "@yuva-devlab/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

### Available Configs

- `base.json` - Base configuration for all projects
- More configs coming soon (React, Node, etc.)

### Features

- Strict type checking enabled
- Modern ES module support
- Path mapping support
- Optimized for monorepos

---

## ESLint Config

### Installation

```bash
npm install -D @yuva-devlab/eslint-config eslint
```

### Usage

Create or update your `eslint.config.js`:

```js
import yuvaConfig from "@yuva-devlab/eslint-config";

export default [
  ...yuvaConfig,
  // Your custom rules
];
```

### Available Presets

- **Base** - Core JavaScript/TypeScript rules
- **React** - React-specific rules and hooks
- **Node** - Node.js environment rules
- **TypeScript** - TypeScript-specific rules

### Import Specific Presets

```js
import { base, react, typescript } from "@yuva-devlab/eslint-config";

export default [...base, ...react, ...typescript];
```

### Features

- ESLint 9+ flat config format
- TypeScript support with type-aware linting
- React hooks rules
- Import/export validation
- Accessibility (a11y) rules for React
- Prettier integration (no conflicts)

---

## Prettier Config

### Installation

```bash
npm install -D @yuva-devlab/prettier-config prettier
```

### Usage

#### Option 1: package.json

```json
{
  "prettier": "@yuva-devlab/prettier-config"
}
```

#### Option 2: prettier.config.js

```js
export { default } from "@yuva-devlab/prettier-config";
```

#### Option 3: .prettierrc.json

```json
"@yuva-devlab/prettier-config"
```

### Configuration

The config includes:

```js
{
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  printWidth: 80,
  arrowParens: "always"
}
```

### Features

- Consistent formatting across all file types
- Optimized for readability
- Compatible with ESLint config
- Supports TypeScript, JSX, JSON, Markdown, and more

---

## Development

### Building Configs

```bash
# Build all configs
pnpm --filter "@yuva-devlab/*-config" build

# Build specific config
pnpm --filter @yuva-devlab/eslint-config build
```

### Testing Configs

These configs are tested in production across all packages in the monorepo.

## Usage in External Projects

All three packages are published to npm and can be used in any project:

```bash
npm install -D @yuva-devlab/typescript-config
npm install -D @yuva-devlab/eslint-config
npm install -D @yuva-devlab/prettier-config
```

## Related Packages

- [@yuva-devlab/ui](../ui) - Uses these configs
- [@yuva-devlab/tokens](../tokens) - Uses these configs
- [@yuva-devlab/sdk](../sdk) - Uses these configs

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
