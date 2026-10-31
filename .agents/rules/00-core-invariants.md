# Core Invariants — DevLab Shared

These invariants are mandatory and non-negotiable across all packages and applications in the DevLab Shared repository.

## 1. Hard 250-Line Maximum Rule

- Every source file (`.ts`, `.tsx`, `.js`, `.jsx`) and stylesheet (`.css`) across `packages/*/src/` and `apps/*/src/` must remain strictly under 250 lines of code.
- Deconstruct early at 200 lines into focused helper modules, atomic subcomponents, or scoped stylesheets.
- Monolithic stylesheets or god-components are strictly prohibited.

## 2. Standardized Absolute Imports (`@/*`)

- All intra-package and intra-app source imports must use `@/*` absolute path aliases mapping to `./src/*`.
- Relative parent directory traversals (`../`, `../../`, etc.) are prohibited in `src/`.
- Modern TypeScript configurations use `moduleResolution: "bundler"` with `paths: { "@/*": ["./src/*"] }` (omitting deprecated `baseUrl`).
- Bundlers (tsup, Vite, Next.js) must have matching path aliases configured.

## 3. Pure Platform CSS & W3C Cascade Layers

- Styling architecture is built on native W3C Cascade Layers in standardized priority order:
  ```css
  @layer dl-reset, dl-tokens, dl-components, dl-layout, dl-utilities, dl-app;
  ```
- Stylesheets must be modular and scoped to domains (tokens, reset, layout, components, pages) within `src/styles/`.
- No utility-first framework dependencies in runtime component code.

## 4. Prohibition of Inline Styles

- Inline styles (`style={{ ... }}`) are strictly prohibited across components and registry documentation.
- Sizing, layout, positioning, and colors must be expressed through CSS classes and design token custom properties.

## 5. Dynamic Multi-Brand Sizing & Density

- Components must dynamically conform to active brand themes by consuming token variables:
  - Control heights: `var(--control-height-sm)`, `var(--control-height-md)`, `var(--control-height-lg)`
  - Spacing: `var(--space-1)` through `var(--space-12)`
  - Radii: `var(--radius-sm)`, `var(--radius-md)`, `var(--radius-lg)`, `var(--radius-full)`
- Seamlessly adapts across densities: compact telemetry (Logs), precision financial layouts (FinAI), and standard consumer/enterprise (Portal, VitalAI, KnowledgeAI).

## 6. Strict TypeScript, Dual ESM/CJS Builds & Public Artifacts

- All packages build with `tsup` or `vite` generating dual ESM (`.js`) and CJS (`.cjs`) outputs alongside `.d.ts` declaration bundles.
- Every package must define valid `publishConfig: { "access": "public" }` and standard `exports` maps.
- Strict TypeScript (`strict: true`, no implicit any, exact optional property types).

## 7. Zero Circular Dependencies & Clean Workspace Graph

- Workspace dependency graphs must be strictly acyclic.
- Foundation packages (`@yuva-devlab/core`, `@yuva-devlab/errors`) must maintain zero internal workspace dependencies.
- Shared domain contracts belong in `@yuva-devlab/shared-types` or base core packages.

## 8. Comprehensive JSDoc Documentation

- 100% of exported functions, classes, interfaces, types, and constants must feature comprehensive JSDoc annotations detailing purpose, `@param`, `@returns`, and `@throws` where applicable.

## 9. Mandatory UI Documentation & Storybook Parity

- Whenever creating or updating any UI component in `packages/ui`, agents MUST simultaneously verify, add, or update:
  1. The interactive live demonstration and registry entry in `apps/ui-docs` (`src/registry/components/` and `src/config/components-*.ts`).
  2. The interactive CSF story suite in `packages/ui/src/components/<component>/<component>.stories.tsx` for `apps/ui-storybook`.
- Component drift between `packages/ui`, `apps/ui-docs`, and `apps/ui-storybook` is strictly prohibited. Every component must be fully visible and testable across both documentation platforms.

## 10. Quality Gates & Commit Governance

- Changes must pass all quality gates prior to commit: `turbo lint typecheck build test` and `pnpm --filter @yuva-devlab/ui-storybook build-storybook`.
- Conventional Commits enforced (`feat(scope): ...`, `fix(scope): ...`, `chore(scope): ...`, `refactor(scope): ...`).
- AI agents must request explicit user approval before executing `git commit` or `git push`.
