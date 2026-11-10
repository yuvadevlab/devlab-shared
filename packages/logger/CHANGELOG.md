# @yuva-devlab/logger

## 1.3.1

### Patch Changes

- a44d7b6: fix(logger): guard AsyncLocalStorage and Node.js built-ins for safe isomorphic execution in browser environments

## 1.3.0

### Minor Changes

- f0788f4: feat(logger): add AsyncLocalStorage correlation context, @LogMethod decorator, canonical JSON formatting, and HttpBatchTransport
  feat(supervisor): add lifecycle orchestration, on-demand build runner, prerequisite dependency readiness checks, and real-time Socket.IO streaming
  fix(ui): refine pure platform CSS cascade layers, token alignment, and component styles

## 1.2.0

### Minor Changes

- e2e07f9: feat(core): release foundation shared packages for DevLab Platform ecosystem

## 1.1.0

### Minor Changes

- d152d4d: - Added `@yuva-devlab/logger` package with isomorphic logger and Express HTTP request logging middleware.
  - Consolidated brand themes (FinAI, OrchestrAI) and Tailwind CSS 4 preset bridge directly into `@yuva-devlab/ui`.
  - Added brand-aware `ConfigProvider` / `ThemeProvider` with `brand="finai" | "orchestrai"`.
  - Rebranded repository to `devlab-shared`, unified package scripts, and marked internal tooling as private.
