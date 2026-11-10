# Core Invariants — DevLab Shared

These invariants are mandatory and non-negotiable across all packages and applications in the DevLab Shared repository.

## 0. Strict Git Commit & Push Restriction

- **NEVER** run `git commit`, `git push`, or create pull requests without explicit, affirmative user authorization.
- General task triggers like "start", "proceed", or "fix" authorize code authoring, linting, and testing ONLY.
- Changes must remain in the working tree or staging until the user explicitly says to commit.

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

## 11. Organization Standards & .github Inheritance

- Branch naming must strictly follow: `^(feat|fix|refactor|perf|chore|docs|test|ci|hotfix)/[a-z0-9-]+$`.
- Pull Requests must conform to the 5-section high-signal template in `yuvadevlab/.github` (Summary, Changes, How to Test, Proof of Verification, Risks).
- Author and committer metadata standardized to `yuva.devlab@gmail.com`.

## 12. NPM Packages Environment Isolation Rule

- NPM packages (`packages/*`) must **NEVER** access `process.env` directly.
- The consumer application is responsible for managing its environment and passing URLs, credentials, or flags via props/options.
- Any canonical URLs or endpoint paths must be declared as package constants in `src/constants/` so they can be changed in a single location.

## 13. Zero Hardcoded Strings & UI Copy Catalogs

- UI components must never include hardcoded user-facing strings (labels, buttons, titles, descriptions, error banners).
- All user-facing copy must be cataloged in centralized copy constant dictionaries.

## 14. Enums Over Raw String Unions (Change Resilience)

- Avoid declaring types as raw string literal unions (e.g. `type Status = "ACTIVE" | "INACTIVE"`).
- Always declare TypeScript `enum`s or key-value object dictionaries (`as const`).
- This ensures underlying runtime string values can be modified in a single location without modifying symbol references across consumers.

## 15. URL Query Parameters & Key Centralization

- Raw URL search parameter names and prefixes (e.g. `"?redirect="`, `"?app="`, `"token"`, `"access_token"`) must never be hardcoded in application logic.
- All query parameters, route paths, HTTP headers, and browser storage keys must be declared in dedicated enums/constants files (e.g. `AuthQueryParamKey.REDIRECT`, `AuthStorageKey.TOKEN`).
- URLs and query strings must be assembled using `URLSearchParams` or helper functions referencing the enum keys.
