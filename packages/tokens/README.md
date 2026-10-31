# 🎨 @yuva-devlab/tokens

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/tokens.svg)](https://www.npmjs.com/package/@yuva-devlab/tokens)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![W3C Cascade Layers](https://img.shields.io/badge/CSS-W3C%20Cascade%20Layers-22c55e.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> Core design token engine, OKLCH color palettes, typography scales, responsive density profiles, and pure W3C Cascade Layers for the DevLab ecosystem. Built with a pure TypeScript single-source-of-truth architecture that compiles zero-runtime CSS stylesheets, native VS Code autocomplete data, and typed constants.

---

## What's New in v2.0.0

- **Pure TypeScript Single-Source-of-Truth**: All token schemas, core dimensions, spacing scales, and brand themes are authored in pure TypeScript. Zero static CSS is committed to source control; all W3C Cascade Layer stylesheets are compiled dynamically on build.
- **Isolated Brand Extensions Architecture**: Common tokens (spacing, typography, dimensions, control heights, radii) are shared with identical names across all brands. Domain-specific extensions (FinAI charts/equity, Logs severity telemetry, VitalAI biomarkers, OrchestrAI agent states) compile _strictly_ into that brand's theme stylesheet, guaranteeing **zero-waste bundles**.
- **Native VS Code Custom Data Autocomplete**: Includes machine-readable `css-data.json` distributed directly in the npm package for instant IntelliSense across utility classes (`dl-display`, `dl-h1`..`dl-h6`, `dl-body`, `dl-metric`, `glass`, `execution-grid`) without third-party marketplace plugins.
- **Typed Brand Constants for Recharts & Canvas**: Auto-generated constants (`FINAI_EXTENSIONS`, `LOGS_EXTENSIONS`, `VITALAI_EXTENSIONS`, etc.) provide 100% type safety and IDE autocomplete for JavaScript and charting consumers.
- **W3C Cascade Layers Architecture**: Standardized layers (`@layer dl-base, dl-tokens, dl-components, dl-utilities`) eliminate CSS specificity wars and remove build-step CSS plugin requirements.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start & W3C Cascade Layers](#quick-start--w3c-cascade-layers)
3. [Architecture Overview](#architecture-overview)
4. [Multi-Brand Theme Architecture](#multi-brand-theme-architecture)
5. [Brand Extensions & Zero-Waste Bundles](#brand-extensions--zero-waste-bundles)
6. [Typography Scale & Utility Classes](#typography-scale--utility-classes)
7. [VS Code & IDE Native Autocomplete](#vs-code--ide-native-autocomplete)
8. [TypeScript Constants for Recharts & Canvas](#typescript-constants-for-recharts--canvas)
9. [Programmatic Brand Discovery](#programmatic-brand-discovery)
10. [v1 to v2 Migration Guide](#v1-to-v2-migration-guide)

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

## Quick Start & W3C Cascade Layers

Import the baseline styles and your desired brand theme in your root CSS file (e.g. `globals.css` or `app.css`):

```css
/* 1. Establish W3C Cascade Layer order */
@layer dl-base, dl-tokens, dl-components, dl-layout, dl-utilities, dl-app;

/* 2. Import core tokens, reset, typography, and utility classes */
@import "@yuva-devlab/tokens/styles.css";

/* 3. Import your application's brand theme */
@import "@yuva-devlab/tokens/themes/finai.css";
```

### Available Brand Theme Stylesheets

| Brand Theme       | Import Path                                 | Signature Aesthetic                               | Default Density |
| :---------------- | :------------------------------------------ | :------------------------------------------------ | :-------------- |
| **FinAI**         | `@yuva-devlab/tokens/themes/finai.css`      | High-Finance Emerald (`oklch(0.68 0.2 155)`)      | Spacious        |
| **VitalAI**       | `@yuva-devlab/tokens/themes/vitalai.css`    | Athletic Volt Kinetic (`oklch(0.93 0.23 125)`)    | Spacious        |
| **DevLab Logs**   | `@yuva-devlab/tokens/themes/logs.css`       | High-Density Matrix Amber (`oklch(0.78 0.18 75)`) | Compact / High  |
| **OrchestrAI**    | `@yuva-devlab/tokens/themes/orchestrai.css` | Midnight Neon Violet (`oklch(0.65 0.24 285)`)     | Standard        |
| **DevLab Portal** | `@yuva-devlab/tokens/themes/portal.css`     | Enterprise Modern Indigo (`oklch(0.62 0.22 260)`) | Standard        |

---

## Architecture Overview

`@yuva-devlab/tokens` uses a pure TypeScript design token pipeline:

```
packages/tokens/
├── src/
│   ├── schema/
│   │   └── tokens.schema.ts      # TypeScript interfaces and contracts
│   ├── core/
│   │   ├── spacing.ts            # Spacing grid (0.25rem - 4rem)
│   │   ├── dimensions.ts         # Control heights, icon sizes, border radii
│   │   ├── typography.ts         # Base typography scale specifications
│   │   ├── root.ts               # Neutral fallback palette & base layer resets
│   │   └── utilities.ts          # Cybernetic grids, glassmorphism, keyframes
│   ├── brands/
│   │   ├── finai.tokens.ts       # FinAI palette, typography, isolated extensions
│   │   ├── vitalai.tokens.ts     # VitalAI palette, typography, isolated extensions
│   │   ├── logs.tokens.ts        # Logs palette, typography, isolated extensions
│   │   ├── orchestrai.tokens.ts  # OrchestrAI palette, typography, isolated extensions
│   │   └── portal.tokens.ts      # Portal palette, typography, isolated extensions
│   └── generated/
│       └── index.ts              # Prettier-formatted TS constants for Recharts
├── scripts/
│   ├── generate-tokens.ts        # Master compiler runner
│   ├── theme-generator.ts        # Brand CSS compiler with isolated extensions
│   ├── root-generator.ts         # Root CSS & utility stylesheets compiler
│   └── data-generator.ts         # VS Code custom data generator
└── styles/                       # Generated build artifacts (npm distributed)
    ├── root.css
    ├── typography.css
    ├── utilities.css
    ├── styles.css
    ├── preset.css
    └── themes/*.css
```

---

## Multi-Brand Theme Architecture

Themes are applied dynamically using HTML attributes:

```html
<!-- FinAI in Dark Mode -->
<html data-brand="finai" class="dark">
  <body>
    ...
  </body>
</html>

<!-- VitalAI in Light Mode -->
<html data-brand="vitalai" class="light">
  <body>
    ...
  </body>
</html>
```

### Common Semantic Tokens

Every brand provides an identical set of core semantic CSS variables:

- **Surfaces**: `--background`, `--foreground`, `--surface`, `--surface-2`, `--card`, `--card-foreground`, `--popover`, `--border`, `--input`
- **Actions**: `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--accent`, `--accent-foreground`, `--muted`, `--muted-foreground`
- **Feedback**: `--destructive`, `--warning`, `--success`, `--info`
- **Geometry**: `--radius`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-2xl`
- **Control Heights**: `--control-height-xs`, `--control-height-sm`, `--control-height-md`, `--control-height-lg`, `--control-height-xl`
- **Spacing**: `--space-1` (0.25rem) through `--space-16` (4rem)

---

## Brand Extensions & Zero-Waste Bundles

A core innovation in v2.0.0 is the **Isolated Brand Extensions Architecture**.

While common tokens (spacing, buttons, headings) share identical variable names across all apps, domain-specific needs (e.g. financial equity states vs telemetry severity) are isolated to prevent cross-brand bundle bloat.

### Brand Extensions Matrix

| Brand             | Isolated Extension Categories  | Generated CSS Variables                                                                                                                 |
| :---------------- | :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **FinAI**         | Charts, Financial Domain       | `--chart-bullish`, `--chart-bearish`, `--chart-yield`, `--equity-positive`, `--equity-negative`, `--trade-pending`                      |
| **DevLab Logs**   | Severity Telemetry, Charts     | `--log-fatal`, `--log-error`, `--log-warn`, `--log-info`, `--log-debug`, `--log-ai`, `--chart-fatal`, `--chart-warn`                    |
| **VitalAI**       | Biomarkers, Recovery, Charts   | `--chart-volt`, `--chart-cyan`, `--chart-ember`, `--chart-heartrate`, `--chart-oxygen`, `--vital-recovery-high`, `--vital-recovery-mod` |
| **OrchestrAI**    | Agent Lifecycle States, Charts | `--agent-idle`, `--agent-running`, `--agent-completed`, `--agent-failed`, `--agent-paused`, `--chart-1`..`--chart-5`                    |
| **DevLab Portal** | Multi-Tenant Accent Palettes   | `--mint`, `--blue`, `--amber`, `--rose`, `--teal`, `--chart-1`..`--chart-5`                                                             |

### Zero-Waste Guarantee

When `finai` imports `@yuva-devlab/tokens/themes/finai.css`:

- The bundle contains **only** FinAI's base palette and FinAI's extensions.
- Telemetry log severity tokens (`--log-fatal`) or clinical recovery tokens (`--vital-recovery-high`) are **never downloaded** into the FinAI consumer bundle.

---

## Typography Scale & Utility Classes

`@yuva-devlab/tokens` includes a standardized typographic scale compiled into `@layer dl-components`:

| Class Selector | Size               | Line Height | Weight | Description                           |
| :------------- | :----------------- | :---------- | :----- | :------------------------------------ |
| `.dl-display`  | `3rem` (48px)      | `1.15`      | `800`  | High-impact hero and display titles   |
| `.dl-h1`       | `2.25rem` (36px)   | `1.2`       | `700`  | Primary page heading                  |
| `.dl-h2`       | `1.75rem` (28px)   | `1.25`      | `600`  | Section heading                       |
| `.dl-h3`       | `1.375rem` (22px)  | `1.3`       | `600`  | Card and panel heading                |
| `.dl-h4`       | `1.125rem` (18px)  | `1.35`      | `600`  | Sub-section header                    |
| `.dl-h5`       | `1rem` (16px)      | `1.4`       | `500`  | Component-level header                |
| `.dl-h6`       | `0.875rem` (14px)  | `1.45`      | `500`  | Small header and label                |
| `.dl-body-lg`  | `1.125rem` (18px)  | `1.55`      | `400`  | Lead paragraph and article body       |
| `.dl-body`     | `0.9375rem` (15px) | `1.5`       | `400`  | Standard UI body text                 |
| `.dl-body-sm`  | `0.8125rem` (13px) | `1.45`      | `400`  | Secondary description and helper text |
| `.dl-caption`  | `0.75rem` (12px)   | `1.4`       | `500`  | Microcopy, timestamps, and captions   |
| `.dl-code`     | `0.8125rem` (13px) | `1.45`      | `400`  | Monospace inline code                 |
| `.dl-metric`   | `2rem` (32px)      | `1.2`       | `700`  | Tabular numeric telemetry & KPIs      |

### Surface & Background Utilities

- `.glass` - Frosted glass effect with backdrop blur and border transparency.
- `.execution-grid` - Fine technical grid background pattern for dashboards.
- `.topology-grid` - Dotted cybernetic topology grid for canvas and telemetry surfaces.

---

## VS Code & IDE Native Autocomplete

Autocomplete for DevLab utility classes (`dl-display`, `dl-h1`, `glass`, etc.) is powered by **VS Code's native Custom Data API**. No third-party marketplace extensions are required.

### Setup in Consumer Applications

In your project's `.vscode/settings.json`:

```json
{
  "css.customData": ["./node_modules/@yuva-devlab/tokens/css-data.json"],
  "html.customData": ["./node_modules/@yuva-devlab/tokens/css-data.json"]
}
```

Once added, every developer who clones your repository gets instant autocompletion and hover documentation for all DevLab utility classes in `.tsx`, `.html`, and `.css` files.

---

## TypeScript Constants for Recharts & Canvas

For JavaScript and charting libraries (Recharts, TradingView, HTML5 Canvas) where CSS variables cannot be accessed via CSS classes, `@yuva-devlab/tokens` exports auto-generated, type-safe color constants:

```tsx
import { FINAI_EXTENSIONS } from "@yuva-devlab/tokens";
import { AreaChart, Area } from "recharts";

export function PortfolioPerformance({ data }) {
  return (
    <AreaChart data={data}>
      <Area
        dataKey="bullish"
        stroke={FINAI_EXTENSIONS.common.charts["chart-bullish"]}
        fill={FINAI_EXTENSIONS.common.charts["chart-bullish"]}
      />
      <Area
        dataKey="bearish"
        stroke={FINAI_EXTENSIONS.common.charts["chart-bearish"]}
        fill={FINAI_EXTENSIONS.common.charts["chart-bearish"]}
      />
    </AreaChart>
  );
}
```

### Available Brand Constants

- `FINAI_EXTENSIONS` - Bullish, bearish, yield, and equity state colors.
- `LOGS_EXTENSIONS` - Telemetry severity colors (`fatal`, `error`, `warn`, `info`, `debug`, `ai`).
- `VITALAI_EXTENSIONS` - Biomarker colors (`heartrate`, `oxygen`, `volt`) and recovery levels.
- `ORCHESTRAI_EXTENSIONS` - Agent lifecycle colors (`running`, `idle`, `failed`, `completed`).
- `PORTAL_EXTENSIONS` - Multi-tenant brand accents (`mint`, `blue`, `amber`, `rose`, `teal`).

---

## Programmatic Brand Discovery

Query themes, active configurations, and brand density metadata in TypeScript:

```typescript
import { THEMES, THEME_CONFIGS, BRAND_MODES } from "@yuva-devlab/tokens";

console.log(THEMES);
// ["orchestrai", "finai", "portal", "logs", "vitalai"]

console.log(THEME_CONFIGS.finai);
// {
//   name: "finai",
//   label: "FinAI",
//   density: "spacious",
//   fontSans: '"Inter", sans-serif',
//   fontDisplay: '"Inter", sans-serif',
//   fontMono: '"JetBrains Mono", monospace',
//   radius: "0.75rem",
//   defaultMode: "dark"
// }
```

---

## v1 to v2 Migration Guide

### 1. Update CSS Import Statements

Ensure your root stylesheet establishes W3C Cascade Layers:

```diff
- /* Legacy Tailwind @utility or custom imports */
+ @layer dl-base, dl-tokens, dl-components, dl-layout, dl-utilities, dl-app;
+ @import "@yuva-devlab/tokens/styles.css";
+ @import "@yuva-devlab/tokens/themes/finai.css";
```

### 2. Replace Legacy Tailwind Typography Classes

Replace arbitrary utility combinations with standardized DevLab typography classes or `<Heading>` / `<Text>` primitives from `@yuva-devlab/ui`:

```diff
- <h1 className="text-3xl font-bold tracking-tight">Title</h1>
+ <h1 className="dl-h1">Title</h1>
+ <!-- Or using @yuva-devlab/ui: -->
+ <Heading as="h1" size="h1">Title</Heading>
```

### 3. Adopt Typed Chart Extensions

Replace hardcoded hex or OKLCH strings in Recharts components with typed brand constants:

```diff
- stroke="oklch(0.65 0.18 150)"
+ stroke={FINAI_EXTENSIONS.common.charts["chart-bullish"]}
```

---

## License

MIT © [Yuva DevLab](https://github.com/yuvadevlab)
