---
"@yuva-devlab/ui": minor
---

### Architecture Overhaul, Style De-duplication & AI Element Suite

- **Eliminate Monolithic CSS Duplication & Enforce 250-Line Limit (`@yuva-devlab/ui`)**:
  - Removed the 6,395-line `src/styles/components.css` build artifact from source control, cutting redundant CSS in `packages/ui/src` by nearly 50% (6,474 lines eliminated).
  - Updated `tsup.config.ts` to output `components.css` strictly into `dist/components.css` and `dist/styles/components.css`, preventing duplicate generated copies in `src/`.
  - Enforced strict 250-line maximum rule compliance across all stylesheets in `@yuva-devlab/ui/src`.
  - Added automatic purge of stale component and stylesheet artifacts in `dist/` before build copying.

- **Component Encapsulation & Specificity Collision Fixes (`@yuva-devlab/ui`)**:
  - Removed duplicate `.dl-status-badge` rules from `badge/badge.css` in favor of standalone `StatusBadge` component styles in `status-badge/status-badge.css`.
  - Removed leaky `.dl-date-picker-content` selector override from `popover/popover.css` to respect component boundaries.
  - De-duplicated `@keyframes dl-spin` and removed redundant Sonner toast selectors from `common.css`.
  - Cleaned up redundant tokens import in `preset.css` to prevent duplicate stylesheet evaluations.

- **AI Elements & UI Component Suite (`@yuva-devlab/ui`)**:
  - Added new AI elements: `prompt-input`, `message`, `suggestion`, `terminal`, `trace`, `code-block`, `confirmation`, `model-selector`, `plan`, `sources`, `file-tree`, `stack-trace`, `subagent`, `context`, `queue`, and `test-results`.
  - Added core primitives: `input-number`, `multi-select`, `data-table`, and floating notification badge.
