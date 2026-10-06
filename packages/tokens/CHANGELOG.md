# @yuva-devlab/tokens

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
