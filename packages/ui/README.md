# 📦 @yuva-devlab/ui

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/ui.svg)](https://www.npmjs.com/package/@yuva-devlab/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19.x-61dafb.svg)](https://react.dev)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)
[![W3C Cascade Layers](https://img.shields.io/badge/CSS-W3C%20Cascade%20Layers-22c55e.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)

> Production-ready, fully-typed React component library engineered for the DevLab ecosystem. Built on accessible Radix UI primitives, powered by OKLCH CSS design tokens (`@yuva-devlab/tokens`), and modular W3C Cascade Layers (`@layer dl-*`).

---

## What's New in v2.0.0

- **Pure Platform CSS Architecture**: Completely eliminated Tailwind CSS runtime and utility dependencies from components. Component styling is strictly governed by W3C Cascade Layers (`@layer dl-base, dl-tokens, dl-components, dl-utilities`), eliminating CSS specificity conflicts and removing build-step plugin overhead.
- **First-Class Typography Primitives**: Added `<Heading>` and `<Text>` primitives with decoupled semantic HTML tags (`as="h1"`..`as="h6"`, `span`, `div`) and visual scales (`size="display" | "h1".."h6"` and `variant="body-lg" | "body" | "body-sm" | "caption" | "code" | "metric"`).
- **64+ Accessible UI Primitives**: Expanded catalog with Radix UI accessibility compliance and multi-brand responsiveness.
- **Upgraded Design Tokens Peer**: Upgraded to `@yuva-devlab/tokens@^2.0.0` with isolated brand extensions and native VS Code autocomplete.

---

## Features

- 🎨 **Multi-Brand Theme Architecture** - Seamless brand isolation across OrchestrAI, VitalAI, FinAI, Logs, and Portal.
- 📐 **Dynamic Theme-Driven Sizing** - Automatic adaptation across brand densities (compact telemetry logs, precision finance tables, athletic kinetic scaling).
- ⚡ **Pure Platform CSS** - Scoped W3C Cascade Layers (`@layer dl-components, dl-layout, dl-utilities`) and semantic design tokens.
- 🔤 **Typography Primitives** - First-class `<Heading>` and `<Text>` primitives with semantic decoupling.
- 📐 **Layout & Composition Primitives** - First-class `<Box>`, `<Flex>`, `<Stack>`, `<Grid>`, and `<Container>` primitives.
- ♿ **Accessible by Default** - Built on Radix UI primitives with complete WAI-ARIA and keyboard navigation compliance.
- 🧩 **64+ Core UI & Layout Primitives** - Buttons, Calendars, DatePickers, Drawers, Sheets, Sidebars, Menus, Modals, EmptyStates, Layouts, and more.
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
@layer dl-base, dl-tokens, dl-components, dl-layout, dl-utilities, dl-app;

/* 2. Import design tokens & brand theme */
@import "@yuva-devlab/tokens/styles.css";
@import "@yuva-devlab/tokens/themes/finai.css";

/* 3. Import UI components and layout styles */
@import "@yuva-devlab/ui/styles.css";
```

> **Tip:** You can import any theme preset from `@yuva-devlab/tokens/themes/*` (`finai`, `vitalai`, `logs`, `orchestrai`, `portal`).

### 2. Render Components & Typography Primitives

```tsx
import {
  Heading,
  Text,
  Button,
  Card,
  Badge,
  Stack,
  Flex,
} from "@yuva-devlab/ui";
import { Sparkles } from "lucide-react";

export default function DashboardCard() {
  return (
    <Card>
      <Stack gap={4}>
        <Flex justify="between" align="center">
          {/* Decoupled semantic level and visual scale */}
          <Heading as="h2" size="h3">
            DevLab Portfolio
          </Heading>
          <Badge variant="default">Active</Badge>
        </Flex>

        <Text variant="caption">Last updated 5m ago</Text>
        <Text variant="metric">$1,248,390.50</Text>

        <Button variant="primary">
          <Sparkles />
          Execute Transaction
        </Button>
      </Stack>
    </Card>
  );
}
```

---

## Typography Primitives

### Heading Component

The `<Heading>` primitive decouples semantic HTML structure (`as`) from visual appearance (`size`):

```tsx
import { Heading } from "@yuva-devlab/ui";

// Semantic H1 rendered with compact H3 visual appearance
<Heading as="h1" size="h3">Compact Header</Heading>

// Display heading for landing pages
<Heading as="h1" size="display">DevLab Cloud</Heading>
```

| Prop    | Type                                                                                    | Default      | Description                                              |
| :------ | :-------------------------------------------------------------------------------------- | :----------- | :------------------------------------------------------- |
| `as`    | `"h1"` \| `"h2"` \| `"h3"` \| `"h4"` \| `"h5"` \| `"h6"` \| `"span"` \| `"div"`         | `"h2"`       | The semantic HTML element rendered to the DOM.           |
| `size`  | `"display"` \| `"h1"` \| `"h2"` \| `"h3"` \| `"h4"` \| `"h5"` \| `"h6"`                 | Matches `as` | The visual typographic scale applied via Cascade Layers. |
| `color` | `"default"` \| `"muted"` \| `"primary"` \| `"accent"` \| `"destructive"` \| `"success"` | `"default"`  | Semantic text color token.                               |

### Text Component

The `<Text>` primitive handles body text, captions, inline code, and tabular metric numerals:

```tsx
import { Text } from "@yuva-devlab/ui";

<Text variant="body-lg">Large intro body copy</Text>
<Text variant="body">Standard UI body text</Text>
<Text variant="body-sm">Small helper description</Text>
<Text variant="caption">Footnotes and timestamps</Text>
<Text variant="code">const token = useToken();</Text>
<Text variant="metric">3,492 req/s</Text>
```

---

## Multi-Brand Theming

DevLab UI supports multi-brand switching at runtime using `data-brand` and `data-theme` HTML attributes:

```html
<!-- Switch to FinAI Spacious Theme with Dark Mode -->
<html data-brand="finai" class="dark">
  ...
</html>
```

### Supported Brand Themes

| Brand Key    | Theme Name        | Primary Aesthetic         | Token Import                                |
| :----------- | :---------------- | :------------------------ | :------------------------------------------ |
| `finai`      | **FinAI**         | High-Finance Emerald      | `@yuva-devlab/tokens/themes/finai.css`      |
| `vitalai`    | **VitalAI**       | Athletic Volt Kinetic     | `@yuva-devlab/tokens/themes/vitalai.css`    |
| `logs`       | **DevLab Logs**   | High-Density Matrix Amber | `@yuva-devlab/tokens/themes/logs.css`       |
| `orchestrai` | **OrchestrAI**    | Midnight Neon Violet      | `@yuva-devlab/tokens/themes/orchestrai.css` |
| `portal`     | **DevLab Portal** | Enterprise Modern Indigo  | `@yuva-devlab/tokens/themes/portal.css`     |

---

## Component Catalog (64 Components)

### Typography Primitives

- **Heading** - Semantic heading with decoupled visual scale (`display`, `h1`..`h6`).
- **Text** - Multi-variant typography primitive (`body-lg`, `body`, `body-sm`, `caption`, `code`, `metric`).

### Layout & Composition Primitives

- **Box** - Fundamental container with padding, border, radius, shadow, and surface backgrounds.
- **Flex** - 1D flexbox container (`direction`, `justify`, `align`, `wrap`, `gap`, `inline`).
- **Stack** - Vertical or horizontal layout flow with token-governed spacing.
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
