# 🎨 @yuva-devlab/tokens

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/tokens.svg)](https://www.npmjs.com/package/@yuva-devlab/tokens)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind%20CSS-v4.x-38bdf8.svg)](https://tailwindcss.com)

> Core design token engine, OKLCH color palettes, typography scales, responsive density profiles, and Tailwind CSS 4 preset bridge for the DevLab ecosystem.

---

## Features

- 🌈 **Modern OKLCH Color Space** - Perceptually uniform, wide-gamut color scales optimized for high-dynamic displays.
- ⚡ **Zero-Runtime CSS Variables** - Pure CSS custom properties with zero JavaScript runtime overhead.
- 🏷️ **Multi-Brand Theme Architecture** - Scoped brand theming for OrchestrAI, VitalAI, FinAI, Logs, and Portal.
- 📐 **Density & Geometry Controls** - Brand-aware control heights, padding tokens, border radii, and typography scaling.
- 🌉 **Tailwind CSS 4 Bridge** - Native `@theme` declarations providing seamless utility class integration.
- 📦 **Typed Metadata Exports** - Full TypeScript contracts for programmatic brand discovery and switching.

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/tokens

# npm
npm install @yuva-devlab/tokens

# yarn
yarn add @yuva-devlab/tokens
```

---

## Usage

### 1. Tailwind CSS 4 Integration

Import the preset and your chosen brand theme in your root CSS file (e.g. `globals.css` or `app.css`):

```css
@import "tailwindcss";
@import "@yuva-devlab/tokens/preset.css";
@import "@yuva-devlab/tokens/themes/orchestrai.css";
```

### 2. Available Brand Themes

Import any brand theme stylesheet from `@yuva-devlab/tokens/themes/*`:

| Brand Theme       | Import Path                                 | Signature Aesthetic                               |
| :---------------- | :------------------------------------------ | :------------------------------------------------ |
| **OrchestrAI**    | `@yuva-devlab/tokens/themes/orchestrai.css` | Midnight Neon Violet (`oklch(0.65 0.24 285)`)     |
| **VitalAI**       | `@yuva-devlab/tokens/themes/vitalai.css`    | Athletic Volt Kinetic (`oklch(0.93 0.23 125)`)    |
| **FinAI**         | `@yuva-devlab/tokens/themes/finai.css`      | High-Finance Emerald (`oklch(0.68 0.2 155)`)      |
| **DevLab Logs**   | `@yuva-devlab/tokens/themes/logs.css`       | High-Density Matrix Amber (`oklch(0.78 0.18 75)`) |
| **DevLab Portal** | `@yuva-devlab/tokens/themes/portal.css`     | Enterprise Modern Indigo (`oklch(0.62 0.22 260)`) |

---

## Dynamic Brand Switching

Themes are scoped using `data-brand` and `data-theme` HTML attributes:

```html
<!-- VitalAI in Dark Mode -->
<html data-brand="vitalai" class="dark">
  <body>
    ...
  </body>
</html>
```

---

## TypeScript Brand Metadata

For programmatic brand switching, `@yuva-devlab/tokens` exports brand constants and density metadata:

```typescript
import { BRAND_THEMES, BRAND_PROFILES } from "@yuva-devlab/tokens";

console.log(BRAND_THEMES);
// ["orchestrai", "vitalai", "finai", "logs", "portal"]

console.log(BRAND_PROFILES.vitalai);
// {
//   name: "VitalAI",
//   primary: "oklch(0.93 0.23 125)",
//   fontFamily: "Barlow Condensed, Inter, sans-serif",
//   density: "athletic"
// }
```

---

## Token Specifications

Every theme defines a comprehensive set of semantic CSS custom properties:

- **Surfaces**: `--background`, `--foreground`, `--card`, `--popover`, `--surface`, `--surface-2`
- **Actions**: `--primary`, `--primary-foreground`, `--secondary`, `--accent`, `--muted`
- **Feedback**: `--destructive`, `--warning`, `--success`, `--info`
- **Geometry**: `--radius`, `--control-height-xs` to `--control-height-xl`
- **Spacing**: `--space-1` to `--space-10`
- **Glassmorphism**: `--glass`, `--glass-border`, `--shadow-glass`, `--glow`

---

## License

MIT © [Yuva DevLab](https://github.com/yuvadevlab)
