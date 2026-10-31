# 📦 @yuva-devlab/ui

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/ui.svg)](https://www.npmjs.com/package/@yuva-devlab/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x%20%7C%206.x-3178c6.svg)](https://www.typescriptlang.org)

> Production-ready, fully-typed React component library engineered for the DevLab ecosystem. Built on accessible Radix UI primitives, powered by OKLCH CSS design tokens (`@yuva-devlab/tokens`), and fully compatible with Tailwind CSS 4.

---

## Features

- 🎨 **Multi-Brand Theme Architecture** - Seamless brand isolation across OrchestrAI, VitalAI, FinAI, Logs, and Portal.
- ⚡ **Zero-Runtime Overhead** - Driven by standard CSS custom properties and modern OKLCH color spaces.
- ♿ **Accessible by Default** - Built on Radix UI primitives with complete WAI-ARIA and keyboard navigation compliance.
- 🧩 **56+ Core UI Components** - Buttons, Calendars, DatePickers, Drawers, Sheets, Sidebars, Menus, Modals, and more.
- 🔒 **End-to-End Type Safety** - First-class TypeScript definitions with full polymorphic `asChild` composition support.
- 📦 **Tree-Shakeable ESM & CJS** - Optimized builds producing clean dual artifacts.

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/ui @yuva-devlab/tokens lucide-react

# npm
npm install @yuva-devlab/ui @yuva-devlab/tokens lucide-react

# yarn
yarn add @yuva-devlab/ui @yuva-devlab/tokens lucide-react
```

### Peer Dependencies

Ensure your project has the required peer dependencies installed:

```bash
pnpm add react@^19.0.0 react-dom@^19.0.0 sonner@^2.0.0
```

---

## Quick Start

### 1. Configure Styles

In your application's root stylesheet (e.g. `globals.css` or `app.css`), import the token preset, desired brand theme, and component styles:

```css
@import "tailwindcss";
@import "@yuva-devlab/tokens/preset.css";
@import "@yuva-devlab/tokens/themes/orchestrai.css";
@import "@yuva-devlab/ui/components.css";
```

> **Tip:** You can import any theme preset from `@yuva-devlab/tokens/themes/*` (`orchestrai`, `vitalai`, `finai`, `logs`, `portal`).

### 2. Render Components

```tsx
import { Button, Card, DatePicker, Badge } from "@yuva-devlab/ui";
import { Sparkles } from "lucide-react";

export default function DashboardCard() {
  return (
    <Card className="p-6 max-w-md shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">DevLab Project</h2>
        <Badge variant="default">Production</Badge>
      </div>

      <div className="space-y-4">
        <DatePicker />
        <Button variant="primary" className="w-full">
          <Sparkles className="w-4 h-4 mr-2" />
          Deploy Pipeline
        </Button>
      </div>
    </Card>
  );
}
```

---

## Multi-Brand Theming

DevLab UI supports multi-brand switching at runtime using `data-brand` and `data-theme` HTML attributes:

```html
<!-- Switch to VitalAI Athletic Theme with Dark Mode -->
<html data-brand="vitalai" class="dark">
  ...
</html>
```

### Supported Brand Themes

| Brand Key    | Theme Name        | Primary Aesthetic         | Token Import                                |
| :----------- | :---------------- | :------------------------ | :------------------------------------------ |
| `orchestrai` | **OrchestrAI**    | Midnight Neon Violet      | `@yuva-devlab/tokens/themes/orchestrai.css` |
| `vitalai`    | **VitalAI**       | Athletic Volt Kinetic     | `@yuva-devlab/tokens/themes/vitalai.css`    |
| `finai`      | **FinAI**         | High-Finance Emerald      | `@yuva-devlab/tokens/themes/finai.css`      |
| `logs`       | **DevLab Logs**   | High-Density Matrix Amber | `@yuva-devlab/tokens/themes/logs.css`       |
| `portal`     | **DevLab Portal** | Enterprise Modern Indigo  | `@yuva-devlab/tokens/themes/portal.css`     |

---

## Component Catalog (61 Components)

### Layout & Composition Primitives (Zero Tailwind)

- **Box** - Fundamental container with padding (`p`), border, radius, shadow, and surface backgrounds.
- **Flex** - 1D flexbox container (`direction`, `justify`, `align`, `wrap`, `gap`, `inline`).
- **Stack** - High-velocity vertical or horizontal flow with token-governed spacing.
- **Grid** - Responsive 2D grid (`cols`, `gap`, minItemWidth auto-fit).
- **Container** - Responsive centered layout container with max-width boundaries (`sm` to `2xl`).
- **AspectRatio**, **Panel**, **Resizable**, **ScrollArea**, **Separator**

### General & Display

- **Button**, **CopyButton**, **Card**, **MetricCard**, **SecretRevealCard**, **Badge**, **StatusBadge**, **StatusChip**, **Skeleton**, **LoadingState**

### Form & Data Entry

- **Input**, **Textarea**, **Checkbox**, **Switch**, **Slider**, **RadioGroup**, **Select**, **SearchableSelect**, **DatePicker**, **Calendar**, **InputOTP**, **Toggle**, **ToggleGroup**, **Form**

### Navigation

- **Sidebar**, **NavigationMenu**, **Menubar**, **Breadcrumb**, **Tabs**, **Pagination**

### Overlays & Dialogs

- **Dialog**, **AlertDialog**, **ConfirmDialog**, **Drawer**, **Sheet**, **Popover**, **Tooltip**, **HoverCard**, **DropdownMenu**, **ContextMenu**

### Feedback & Display

- **Alert**, **Progress**, **Toaster** (Sonner integration), **Avatar**, **Table**, **Accordion**, **Collapsible**, **Carousel**, **Chart**, **Command**

---

## TypeScript & Polymorphic Support

All components export full TypeScript definitions and support polymorphic composition via the `asChild` prop:

```tsx
import Link from "next/link";
import { Button } from "@yuva-devlab/ui";

<Button asChild variant="secondary">
  <Link href="/dashboard">Navigate to Dashboard</Link>
</Button>;
```

---

## Documentation & Live Previews

Explore the interactive component playground, live documentation, and API references at:

- **Documentation**: [https://github.com/yuvadevlab/devlab-shared](https://github.com/yuvadevlab/devlab-shared)
- **Repository**: [https://github.com/yuvadevlab/devlab-shared](https://github.com/yuvadevlab/devlab-shared)

---

## License

MIT © [Yuva DevLab](https://github.com/yuvadevlab)
