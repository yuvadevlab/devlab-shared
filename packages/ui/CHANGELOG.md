# @yuva-devlab/ui

## 1.3.1

### Patch Changes

- Updated dependencies [c5523e6]
  - @yuva-devlab/tokens@1.1.1

## 1.3.0

### Minor Changes

- 9438a02: - **alert**: Fixed CSS grid layout so icon, title, and description align cleanly without column collapse.
  - **dialog**: Added `size="xl"` / `size="2xl"` max-height constraints (85vh) and scrollable body normalization.
  - **sonner**: Exported `Toaster` and `toast` with design token styling, stories, and showcase documentation.
  - **table**: Expanded data table with responsive breakpoints and horizontal scrolling wrapper.
  - **docs & stories**: Colocated Storybook stories (`*.stories.tsx`) and MDX documentation (`*.mdx`) across all core components.

## 1.2.0

### Minor Changes

- 4dc5bb4: - **Standalone Tokens Package (`@yuva-devlab/tokens`)**:
  - Extracted modular design tokens, baseline resets (`root.css`), Tailwind 4 preset bridge (`preset.css`), and brand themes (`themes/orchestrai.css`, `themes/finai.css`).
  - Standalone CSS and TypeScript declaration exports.

  - **Modular Pure CSS Architecture (`@yuva-devlab/ui`)**:
    - Reorganized components into dedicated folders (`src/components/{name}/{name}.tsx` + `{name}.css` + `index.ts`).
    - Eliminated runtime Tailwind dependency in component templates in favor of scoped `dl-*` styles under `@layer dl-components`.
    - Added build-time CSS bundling with Prettier formatting in `tsup.config.ts`.

  - **Style Collision & Consumer Integration Fixes**:
    - Fixed search box icon/placeholder collision and eliminated double outline rings on focused inputs.
    - Added first-class `startIcon` and `endIcon` support to `Input`.

  - **Rich JSDoc & IntelliSense Documentation**:
    - Added comprehensive JSDoc annotations, prop type definitions, default value documentations, and copy-pasteable `@example` blocks across all 35+ UI components.

### Patch Changes

- Updated dependencies [4dc5bb4]
  - @yuva-devlab/tokens@1.1.0

## 1.1.0

### Minor Changes

- d152d4d: - Added `@yuva-devlab/logger` package with isomorphic logger and Express HTTP request logging middleware.
  - Consolidated brand themes (FinAI, OrchestrAI) and Tailwind CSS 4 preset bridge directly into `@yuva-devlab/ui`.
  - Added brand-aware `ConfigProvider` / `ThemeProvider` with `brand="finai" | "orchestrai"`.
  - Rebranded repository to `devlab-shared`, unified package scripts, and marked internal tooling as private.

## 1.0.1

### Patch Changes

- 0bbe683: Add `cursor-pointer` and primary focus outline ring styles to interactive components (`Button`, `Tabs`, `Select`, `Checkbox`, `DropdownMenu`, `Breadcrumb`).

## 1.0.0

### Major Changes

- b622a41: Migrate to Tailwind CSS 4 and remove legacy Vanilla Extract:

  - `@yuva-devlab/ui`: Rebuilt component suite using Radix UI primitives, class-variance-authority (CVA), and Tailwind CSS 4 utilities compiled with tsup.
  - `@yuva-devlab/tokens`: Refactored into a pure CSS package providing Tailwind CSS 4 `@theme inline` preset and OKLCH application themes (FinAI, OrchestrAI).
  - `@yuva-devlab/cli`: Modernized component scaffolding templates to generate Tailwind + CVA components.
  - Removed deprecated `@yuva-devlab/primitives` and `@yuva-devlab/colors` packages.

### Minor Changes

- cb8e920: If adding the "use client"; banner is a new feature that enables compatibility with Next.js/RSC.

## 0.2.0

### Minor Changes

- 61f9888: Standardize form inputs & add semantic layout components.
  - Added new Divider component.
  - Added semantic layout components: Header, Footer, Main, Section, Nav, Aside,
    Article.
  - Standardized transitions and focus styles for Select, Checkbox, Radio,
    Switch, Input.

### Patch Changes

- Updated dependencies [61f9888]
  - @yuva-devlab/primitives@0.2.0

## 0.1.2

### Patch Changes

- 38c0267: Migrate CLI to ESM, replace StyleX with Vanilla Extract, and
  standardize documentation

  CLI now uses ES modules for better compatibility with modern tools like Chalk
  v5. Component templates have been updated to use Vanilla Extract instead of
  StyleX, matching the actual project implementation. All package READMEs now
  show consistent examples for npm, yarn, and pnpm.

  Breaking: CLI requires Node.js 18+ for ESM support

- Updated dependencies [38c0267]
  - @yuva-devlab/primitives@0.1.2
  - @yuva-devlab/colors@0.1.2
  - @yuva-devlab/tokens@0.1.2

## 0.1.1

### Patch Changes

- 2cc8dcf: Complete documentation rewrite with comprehensive examples and API
  reference
- Updated dependencies [2cc8dcf]
  - @yuva-devlab/primitives@0.1.1
  - @yuva-devlab/colors@0.1.1
  - @yuva-devlab/tokens@0.1.1

## 0.1.0

### Minor Changes

- 16c5cc8: Initial Alpha release of the complete Yuva Devlab UI Library
  ecosystem. Includes:
  - Headless Radix Primitives
  - Vanilla Extract Styling System
  - Comprehensive Design Tokens
  - Modern React Components
  - Scalable Monorepo Configuration
  - CLI tool for component scaffolding

### Patch Changes

- Updated dependencies [16c5cc8]
  - @yuva-devlab/tokens@0.1.0
  - @yuva-devlab/primitives@0.1.0
  - @yuva-devlab/colors@0.1.0
