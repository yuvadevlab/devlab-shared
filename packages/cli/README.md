# 🛠️ @yuva-devlab/cli

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/cli.svg)](https://www.npmjs.com/package/@yuva-devlab/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Official CLI tool for scaffolding components and primitives in the Yuva Devlab
> ecosystem.

## ✨ Features

- 🚀 **Component Generation** - Create fully-structured UI components with
  styles and types
- 🧩 **Primitive Generation** - Scaffold headless primitives with proper
  architecture
- 📁 **Smart Templates** - Pre-configured file structures following best
  practices
- 🎯 **Monorepo Aware** - Automatically detects workspace root
- ✅ **Naming Conventions** - Enforces consistent kebab-case and PascalCase
  patterns
- 🔧 **Type-Safe** - Uses type aliases to avoid ESLint warnings
- ⚡ **Zero Config** - Works out of the box in the monorepo

## 📦 Installation

### Workspace Usage (Recommended)

If you're working within the yuva-devlab monorepo:

```bash
# npm
npx yuva create component button

# yarn
yarn yuva create component button

# pnpm
pnpm exec yuva create component button
```

> **Note:** The `yuva` command is not directly available in the monorepo. You
> must use your package manager's execution command.

### Global Installation

For direct `yuva` command access, install globally:

```bash
# npm
npm install -g @yuva-devlab/cli

# yarn
yarn global add @yuva-devlab/cli

# pnpm
pnpm add -g @yuva-devlab/cli
```

Then use anywhere without a package manager prefix:

```bash
yuva create component button
yuva create component checkbox --kind primitive
```

### Local Installation (External Projects)

For use in other projects:

```bash
# npm
npm install --save-dev @yuva-devlab/cli

# yarn
yarn add -D @yuva-devlab/cli

# pnpm
pnpm add -D @yuva-devlab/cli
```

Then use with your package manager:

```bash
# npm
npx yuva create component button

# yarn
yarn yuva create component button

# pnpm
pnpm exec yuva create component button
```

## 🚀 Commands

### `yuva create component <name>`

Generate a new styled UI component.

**Syntax:**

```bash
# In monorepo
pnpm exec yuva create component <name> [options]

# With global installation
yuva create component <name> [options]
```

**Options:**

- `-k, --kind <type>` - Type of component: `component` (default) or `primitive`

**Examples:**

```bash
# Create a styled component (monorepo)
pnpm exec yuva create component card

# Create a primitive component (monorepo)
pnpm exec yuva create component checkbox --kind primitive
# or shorthand
pnpm exec yuva create component checkbox -k primitive

# With global installation
yuva create component card
yuva create component checkbox -k primitive
```

## 📂 Generated Structure

### Styled Component

```bash
pnpm exec yuva create component card
```

**Generates:**

```
packages/ui/src/components/card/
├── card.tsx             # Component implementation
├── card.styles.css.ts   # Vanilla Extract styles
├── card.types.ts        # TypeScript type definitions
├── card.test.tsx        # Vitest test file
└── index.ts             # Barrel export
```

**File Contents:**

```tsx
// card.tsx
import React from "react";
import { CardPrimitive } from "@yuva-devlab/primitives";
import clsx from "clsx";

import * as styles from "./card.styles.css";
import type { CardProps } from "./card.types";

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <CardPrimitive
        ref={ref}
        className={clsx(styles.base, className)}
        {...rest}
      >
        {children}
      </CardPrimitive>
    );
  },
);

Card.displayName = "Card";
```

```ts
// card.types.ts
import type { CardPrimitiveProps } from "@yuva-devlab/primitives";

/**
 * Props for Card styled component.
 * Extends the primitive component props.
 * Add styled-specific props below as needed.
 */
export type CardProps = CardPrimitiveProps & {
  // Add styled-specific props here
  // Example:
  // variant?: "primary" | "secondary";
  // size?: "sm" | "md" | "lg";
};
```

```tsx
// card.tsx (Platform CSS + CVA)
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const cardVariants = cva("dl-card");
```

### Primitive Component

```bash
pnpm exec yuva create component checkbox --kind primitive
```

**Generates:**

```
packages/primitives/src/checkbox/
├── checkbox.primitive.tsx        # Primitive implementation
├── checkbox.primitive.types.ts   # TypeScript type definitions
└── index.ts                      # Barrel export
```

**File Contents:**

```tsx
// checkbox.primitive.tsx
import React from "react";

import type { CheckboxPrimitiveProps } from "./checkbox.primitive.types";

/**
 * Headless primitive for Checkbox.
 */
export const CheckboxPrimitive = React.forwardRef<
  HTMLDivElement,
  CheckboxPrimitiveProps
>(({ children, ...rest }, ref) => {
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});

CheckboxPrimitive.displayName = "CheckboxPrimitive";
```

```ts
// checkbox.primitive.types.ts
import React from "react";

/**
 * Props for CheckboxPrimitive component.
 * Extends all standard HTML div attributes.
 * Add primitive-specific props below as needed.
 */
export type CheckboxPrimitiveProps = React.HTMLAttributes<HTMLDivElement> & {
  // Add primitive-specific props here
  // Example:
  // disabled?: boolean;
};
```

## 🏗️ Architecture

The CLI follows a modular, maintainable architecture:

```
@yuva-devlab/cli/
├── src/
│   ├── commands/
│   │   └── create-component.ts    # Component creation logic
│   ├── templates/
│   │   ├── index.template.ts      # Barrel export templates
│   │   ├── primitive.template.ts  # Primitive templates
│   │   └── styled.template.ts     # Styled component templates
│   ├── utils/
│   │   ├── fs.ts                  # File system utilities
│   │   ├── helpers/               # Scaffolding helpers
│   │   └── strings.ts             # String transformations
│   └── index.ts                   # CLI entry point
├── vite.config.ts                 # ESM build configuration
└── package.json
```

## 🔧 Development

### Building the CLI

```bash
pnpm --filter @yuva-devlab/cli build
```

### Testing Locally

```bash
# Build the CLI
pnpm --filter @yuva-devlab/cli build

# Reinstall to update binary symlinks
pnpm install

# Test the CLI
pnpm exec yuva create component test-component
```

### Linking Globally

```bash
cd packages/cli
pnpm link --global

# Now use from anywhere
yuva create component button
```

## 📝 Naming Conventions

The CLI automatically handles name transformations:

| Input            | Component Name  | File Name            |
| ---------------- | --------------- | -------------------- |
| `button`         | `Button`        | `button.tsx`         |
| `card-header`    | `CardHeader`    | `card-header.tsx`    |
| `SelectMenu`     | `SelectMenu`    | `select-menu.tsx`    |
| `complex_widget` | `ComplexWidget` | `complex-widget.tsx` |

## 🗺️ Roadmap

- [x] Component scaffolding
- [x] Primitive scaffolding
- [x] ESM build support
- [x] Type-safe templates
- [ ] Interactive prompts mode
- [ ] Custom template support
- [ ] Storybook story generation
- [ ] Component migration tools
- [ ] Dependency graph visualization

## 🔗 Related Packages

- [@yuva-devlab/ui](../ui) - Styled component library
- [@yuva-devlab/primitives](../primitives) - Headless primitives
- [@yuva-devlab/tokens](../tokens) - Design tokens

## 📄 License

MIT © Yuva Devlab
