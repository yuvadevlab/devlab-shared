# 📚 @yuva-devlab/ui-storybook

[![Storybook 8](https://img.shields.io/badge/Storybook-8.x-ff4785.svg)](https://storybook.js.org)
[![Vite](https://img.shields.io/badge/Vite-5.x-646cff.svg)](https://vitejs.dev)
[![React 19](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev)
[![W3C Cascade Layers](https://img.shields.io/badge/CSS-W3C%20Cascade%20Layers-22c55e.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> Isolated component development environment, visual regression workbench, and accessibility testing playground for `@yuva-devlab/ui` powered by Storybook 8 and Vite.

---

## Features

- ⚡ **Vite-Powered Instant HMR**: Sub-second hot module replacement for ultra-fast component development.
- 🎨 **Multi-Brand Theme Toolbar**: Switch between FinAI, OrchestrAI, Logs, VitalAI, Guard, and IncidentAI themes with one click.
- 📐 **Density Profile Matrix**: Toggle between `compact`, `regular`, and `spacious` density profiles dynamically.
- ♿ **Automated Accessibility Testing**: Real-time a11y audit powered by `@storybook/addon-a11y` testing contrast, ARIA tags, and keyboard focus traps.
- 📦 **Zero-Config Component Import**: Automatically discovers and hot-reloads `*.stories.tsx` files across `packages/ui`.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Scripts](#scripts)
3. [Storybook Configuration](#storybook-configuration)
4. [Writing Stories](#writing-stories)
5. [Author & Attribution](#author--attribution)

---

## Getting Started

### Prerequisites

- Node.js >= 22.0.0
- pnpm >= 10.0.0

### Run Storybook Locally

From the root of `devlab-shared` or the `apps/ui-storybook` directory:

```bash
# Start Storybook on http://localhost:6005
pnpm --filter @yuva-devlab/ui-storybook storybook
```

---

## Scripts

| Script            | Command                               | Purpose                                        |
| :---------------- | :------------------------------------ | :--------------------------------------------- |
| `storybook`       | `storybook dev -p 6005`               | Starts Storybook local dev server              |
| `build-storybook` | `storybook build -o storybook-static` | Generates static export in `storybook-static/` |

---

## Writing Stories

Stories are co-located alongside components in `packages/ui/src/components/<component>/`:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@yuva-devlab/ui";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Execute Trade",
    variant: "default",
    size: "md",
  },
};
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
