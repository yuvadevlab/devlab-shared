# @yuva-devlab/cli

## 2.0.1

### Patch Changes

- f5100bc: feat(packages): centralize jwks discovery path and fix cli iterator

  - Define `DEFAULT_JWKS_PATH` and `DEFAULT_OPENID_CONFIG_PATH` across auth-server, auth-client, auth-py, and cli
  - Replace ad-hoc string literals with canonical constants for ecosystem-wide route configuration
  - Fix TS2802 iterator error in CLI token inspection command and configure es2022 compiler target

## 2.0.0

### Major Changes

- d08b552: feat(cli): complete rewrite into developer operations tool with port inspection, environment doctor, service status, docker infra, and jwt token validation
  docs(tokens,ui,auth-client): update documentation for responsive tokens, table row hover, and edge jwt validation

## 1.0.0

### Major Changes

- Complete rewrite and modernization of `@yuva-devlab/cli` into an enterprise developer operations tool for the DevLab ecosystem.
- Removed legacy component scaffolding templates and generators.
- Added comprehensive operational command suite:
  - `devlab ports`: Real-time port taxonomy matrix and active TCP socket probe.
  - `devlab doctor`: Environment prerequisites and git attribution diagnostic checks.
  - `devlab status`: Real-time ecosystem service health and HTTP latency prober.
  - `devlab infra <up|down|status|logs>`: Container infrastructure lifecycle management.
  - `devlab token <inspect|jwks>`: JWT token inspector and OIDC JWKS endpoint validator.
- Modular architecture adhering to strict sub-250 line limit and pure TypeScript standards.

## 0.3.0

### Minor Changes

- b622a41: Architectural modernization of UI and tokens suite:
  - `@yuva-devlab/ui`: Rebuilt component suite using Radix UI primitives and compiled with tsup.
  - `@yuva-devlab/tokens`: Refactored into a pure design token package providing OKLCH application themes (FinAI, OrchestrAI).
  - `@yuva-devlab/cli`: Modernized component scaffolding templates.
  - Removed deprecated `@yuva-devlab/primitives` and `@yuva-devlab/colors` packages.

## 0.2.1

### Patch Changes

- 61f9888: Standardize form inputs & add semantic layout components.
  - Added new Divider component.
  - Added semantic layout components: Header, Footer, Main, Section, Nav, Aside,
    Article.
  - Standardized transitions and focus styles for Select, Checkbox, Radio,
    Switch, Input.

## 0.2.0

### Minor Changes

- 38c0267: Migrate CLI to ESM, replace StyleX with Vanilla Extract, and
  standardize documentation

  CLI now uses ES modules for better compatibility with modern tools like Chalk
  v5. Component templates have been updated to use Vanilla Extract instead of
  StyleX, matching the actual project implementation. All package READMEs now
  show consistent examples for npm, yarn, and pnpm.

  Breaking: CLI requires Node.js 18+ for ESM support

## 0.1.1

### Patch Changes

- 2cc8dcf: Complete documentation rewrite with comprehensive examples and API
  reference

## 0.1.0

### Minor Changes

- 16c5cc8: Initial Alpha release of the complete Yuva Devlab UI Library
  ecosystem. Includes:
  - Headless Radix Primitives
  - Vanilla Extract Styling System
  - Comprehensive Design Tokens
  - Modern React Components
  - Scalable Monorepo Configuration
  - CLI tool for component scaffolding
