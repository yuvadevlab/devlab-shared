# @yuva-devlab/tokens

## 2.0.0

### Major Changes

- 40931fb: ### Breaking Changes & Major Architecture Overhaul

  - **Pure TypeScript Token Engine & Architecture (`@yuva-devlab/tokens`)**:
    - Re-architected all design tokens to a pure TypeScript single source of truth under `src/core`, `src/brands`, and `src/schema`.
    - Zero static CSS files committed in source control; all W3C Cascade Layer stylesheets (`root.css`, `typography.css`, `utilities.css`, `styles.css`, `preset.css`, and brand themes) are compiled dynamically on build into `styles/` and `dist/`.
    - Pure canonical extensionless TypeScript imports and exports across all modules.

  - **Isolated Brand Extensions Architecture (`@yuva-devlab/tokens`)**:
    - Common tokens (spacing, typography, dimensions, control heights, radii) are shared with identical names across all brands.
    - Domain-specific extensions (FinAI charts/equity, Logs severity telemetry, VitalAI biomarkers/recovery, OrchestrAI agent states) compile strictly into that brand's theme stylesheet, guaranteeing zero-waste bundles.

  - **Native VS Code Custom Data Autocomplete (`@yuva-devlab/tokens`)**:
    - Distributes machine-readable `css-data.json` directly inside the npm package for instant native IDE IntelliSense across utility classes (`dl-display`, `dl-h1`..`dl-h6`, `dl-body`, `dl-metric`, `glass`, `execution-grid`) with zero marketplace extensions required.

  - **Type-Safe Color & Chart Constants (`@yuva-devlab/tokens`)**:
    - Auto-generated TypeScript brand extension constants (`FINAI_EXTENSIONS`, `LOGS_EXTENSIONS`, `VITALAI_EXTENSIONS`, `ORCHESTRAI_EXTENSIONS`, `PORTAL_EXTENSIONS`) for Recharts, canvas, and JavaScript consumers.

  - **Pure Platform CSS Architecture (`@yuva-devlab/ui`)**:
    - Completely eliminated Tailwind CSS runtime and utility dependencies from all components.
    - Component styles are strictly governed by W3C Cascade Layers (`@layer dl-base, dl-tokens, dl-components, dl-utilities`), eliminating style collision and specificity conflicts.

  - **First-Class Typography Primitives (`@yuva-devlab/ui`)**:
    - Added `<Heading>` primitive with decoupled semantic HTML heading levels (`as="h1"` through `as="h6"`, `span`, `div`) and visual presentation sizes (`size="display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"`).
    - Added `<Text>` primitive with rich semantic variants (`variant="body-lg" | "body" | "body-sm" | "caption" | "code" | "metric"`).
    - Full Storybook suites and interactive UI documentation included.

## 1.3.1

### Patch Changes

- 2c1bec2: docs(ui, tokens): update package quick start guides, READMEs, and registry metadata for Tailwind CSS 4 and multi-brand theme imports
- 721761f: refactor(tokens): update VitalAI theme to athletic volt kinetic palette and clean legacy macro variables

## 1.3.0

### Minor Changes

- d36a44b: Add VitalAI clinical porcelain & bioluminescent teal brand theme (`vitalai.css`), telemetry tokens for macros and biomarkers (calories, protein, carbs, fats, water, vital), and register VitalAI in the design tokens index.

## 1.2.0

### Minor Changes

- c23ae13: - **tokens**: Add DevLab Portal OKLCH theme tokens (`portal.css`).
  - **ui**: Add new reusable components (`MetricCard`, `MetricsGrid`, `CopyButton`, and `SecretRevealCard`).
  - **dialog**: Dynamic content-driven height (`height: auto`) with fixed upper boundary (`max-height`) across modal variants (`lg`, `xl`, `2xl`, `full`).

## 1.1.1

### Patch Changes

- c5523e6: Isolate brand themes to prevent token cross-contamination, remove cross-brand references, clean unused variables in OrchestrAI, preserve FinAI 3rd blue investment color, and establish neutral unbranded preset fallback tokens.

## 1.1.0

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
