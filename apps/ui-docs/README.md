# 📖 @yuva-devlab/ui-docs

[![Next.js 15](https://img.shields.io/badge/Next.js-15.x-black.svg)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev)
[![W3C Cascade Layers](https://img.shields.io/badge/CSS-W3C%20Cascade%20Layers-22c55e.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Interactive design system documentation portal, component playground, token explorer, and code copy registry for the DevLab UI ecosystem.

---

## Features

- ⚡ **Next.js 15 App Router & React 19**: Server-rendered documentation pages with zero client-side layout shift.
- 🎨 **Pure W3C Cascade Layers & Tokens**: Powered by `@yuva-devlab/tokens` and `@yuva-devlab/ui` without any third-party utility dependencies.
- 🎛️ **Interactive Variant Playground**: Dynamically toggle component sizes, variants, density profiles, and states in real time.
- 🌈 **Multi-Brand Theme Switcher**: Preview components live across DevLab brand themes (FinAI, OrchestrAI, Logs, Guard, IncidentAI).
- 💻 **Shiki Syntax Highlighting**: Accurate code snippets with one-click copy and TypeScript definitions.
- 📱 **Multi-Device Responsive Previews**: Inspect components across desktop, tablet, and mobile viewports.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Scripts](#scripts)
3. [Architecture & Component Registry](#architecture--component-registry)
4. [Adding New Component Documentation](#adding-new-component-documentation)
5. [Author & Attribution](#author--attribution)

---

## Getting Started

### Prerequisites

- Node.js >= 22.0.0
- pnpm >= 10.0.0

### Run Locally

From the root of `devlab-shared` or the `apps/ui-docs` directory:

```bash
# Start documentation portal on http://localhost:3030
pnpm --filter @yuva-devlab/ui-docs dev
```

---

## Scripts

| Script      | Command        | Purpose                                 |
| :---------- | :------------- | :-------------------------------------- |
| `dev`       | `next dev`     | Starts local Next.js development server |
| `build`     | `next build`   | Produces production build in `.next`    |
| `start`     | `next start`   | Starts the production server            |
| `typecheck` | `tsc --noEmit` | Validates TypeScript types across pages |

---

## Architecture & Component Registry

The documentation app sources components directly from `@yuva-devlab/ui` and tokens from `@yuva-devlab/tokens`:

```
apps/ui-docs/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── components/[slug]/    # Dynamic component documentation views
│   │   ├── docs/tokens/          # Design token catalog & scale explorer
│   │   ├── layout.tsx            # Global layout with theme provider
│   │   └── page.tsx              # Documentation homepage & pillars
│   ├── components/               # Documentation shell UI (sidebar, header, playground)
│   └── registry/                 # Live component demos and API tables
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
