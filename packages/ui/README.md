# 📦 @yuva-devlab/ui

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/ui.svg)](https://www.npmjs.com/package/@yuva-devlab/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x%20%7C%206.x-3178c6.svg)](https://www.typescriptlang.org)

> Production-ready, fully-typed React component library engineered for the DevLab ecosystem. Built on accessible Radix UI primitives, powered by OKLCH CSS design tokens (`@yuva-devlab/tokens`), and modular W3C Cascade Layers (`@layer dl-*`).

---

## Features

- 🎨 **Multi-Brand Theme Architecture** - Seamless brand isolation across OrchestrAI, VitalAI, FinAI, Logs, and Portal.
- 📐 **Dynamic Theme-Driven Sizing** - Automatic adaptation across brand densities (compact telemetry logs, precision finance tables, athletic kinetic scaling).
- ⚡ **Modular Platform CSS** - Scoped W3C Cascade Layers (`@layer dl-components, dl-layout, dl-utilities`) and semantic design tokens.
- 📐 **Layout & Composition Primitives** - First-class `<Box>`, `<Flex>`, `<Stack>`, `<Grid>`, and `<Container>` primitives.
- ♿ **Accessible by Default** - Built on Radix UI primitives with complete WAI-ARIA and keyboard navigation compliance.
- 🧩 **62+ Core UI & Layout Primitives** - Buttons, Calendars, DatePickers, Drawers, Sheets, Sidebars, Menus, Modals, EmptyStates, Layouts, and more.
- 🔒 **End-to-End Type Safety** - First-class TypeScript definitions with full polymorphic `asChild` and `as` composition support.
- 📦 **Tree-Shakeable ESM & CJS** - Highly optimized builds producing clean dual artifacts.

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

In your application's root stylesheet (e.g. `globals.css` or `app.css`), establish the W3C Cascade Layer order and import your desired tokens and styles:

```css
/* 1. Establish W3C Cascade Layer hierarchy */
@layer dl-reset, dl-tokens, dl-components, dl-layout, dl-utilities, dl-app;

/* 2. Import design tokens & brand theme */
@import "@yuva-devlab/tokens/styles.css";
@import "@yuva-devlab/tokens/themes/orchestrai.css";

/* 3. Import UI components and layout styles */
@import "@yuva-devlab/ui/styles.css";
```

> **Tip:** You can import any theme preset from `@yuva-devlab/tokens/themes/*` (`orchestrai`, `vitalai`, `finai`, `logs`, `portal`).

### 2. Render Components & Layout Primitives

```tsx
import { Button, Card, DatePicker, Badge, Stack, Flex } from "@yuva-devlab/ui";
import { Sparkles } from "lucide-react";

export default function DashboardCard() {
  return (
    <Card>
      <Stack gap={4}>
        <Flex justify="between" align="center">
          <h2>DevLab Project</h2>
          <Badge variant="default">Production</Badge>
        </Flex>

        <DatePicker />

        <Button variant="primary">
          <Sparkles />
          Deploy Pipeline
        </Button>
      </Stack>
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

## Component Catalog (62 Components)

### Layout & Composition Primitives

- **Box** - Fundamental container with padding (`p`), border, radius, shadow, and surface backgrounds.
- **Flex** - 1D flexbox container (`direction`, `justify`, `align`, `wrap`, `gap`, `inline`).
- **Stack** - High-velocity vertical or horizontal flow with token-governed spacing.
- **Grid** - Responsive 2D grid (`cols`, `gap`, minItemWidth auto-fit).
- **Container** - Responsive centered layout container with max-width boundaries (`sm` to `2xl`).
- **AspectRatio**, **Panel**, **Resizable**, **ScrollArea**, **Separator**

### General & Display

- **Button**, **CopyButton**, **Card**, **MetricCard**, **SecretRevealCard**, **Badge**, **StatusBadge**, **StatusChip**, **Skeleton**, **LoadingState**, **EmptyState**

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
