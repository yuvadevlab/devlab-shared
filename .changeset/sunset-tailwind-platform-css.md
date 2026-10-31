---
"@yuva-devlab/ui": major
"@yuva-devlab/tokens": major
---

### Breaking Changes & Major Architecture Overhaul

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
