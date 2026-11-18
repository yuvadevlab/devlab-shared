# @yuva-devlab/ai-client

## 0.2.5

### Patch Changes

- b7a003b: Resolve DatePicker navigation clickability and update default Gemini model fallback

  - Ensure DatePicker previous/next month navigation buttons have proper pointer-events and z-index positioning in calendar.css
  - Update default Google AI Studio model fallback in `@yuva-devlab/ai-client` to `gemini-2.5-flash`

## 0.2.4

### Patch Changes

- 9d85617: refactor: decouple packages from ambient process.env into pure consumer injection

  - `@yuva-devlab/ai-client`: removed ambient `process.env` lookups across all adapters (`google`, `groq`, `openai`, `anthropic`, `ollama`), `provider-factory`, and `env-resolver`. All adapters now require explicit consumer config or dynamic credential functions.
  - `@yuva-devlab/auth-server`: removed ambient `process.env.DEVLAB_PORTAL_API_URL` from `M2mApiKeyValidator` and `JwksValidator`; requires explicit consumer URL injection.
  - `@yuva-devlab/logger`: removed ambient `process.env` lookups (`LOG_LEVEL`, `LOG_FORMAT`, `NODE_ENV`, `LOG_ENABLED`, `SERVICE_NAME`, `DEVLAB_LOGS_*`) from `Logger`, `middleware`, and `context`; added centralized defaults in `constants.ts` and pure `resolveLoggerConfig(envMap)` helper.

- 5dd68ce: Update Google AI Studio default model fallback to gemini-3-flash-preview
- eb3310f: Standardize default model to gemini-3.8-flash with resilient fallback
- Updated dependencies [9d85617]
  - @yuva-devlab/logger@1.3.3

## 0.2.3

### Patch Changes

- 44134e0: refactor: decouple packages from ambient process.env into pure consumer injection

  - `@yuva-devlab/ai-client`: removed ambient `process.env` lookups across all adapters (`google`, `groq`, `openai`, `anthropic`, `ollama`), `provider-factory`, and `env-resolver`. All adapters now require explicit consumer config or dynamic credential functions.
  - `@yuva-devlab/auth-server`: removed ambient `process.env.DEVLAB_PORTAL_API_URL` from `M2mApiKeyValidator` and `JwksValidator`; requires explicit consumer URL injection.
  - `@yuva-devlab/logger`: removed ambient `process.env` lookups (`LOG_LEVEL`, `LOG_FORMAT`, `NODE_ENV`, `LOG_ENABLED`, `SERVICE_NAME`, `DEVLAB_LOGS_*`) from `Logger`, `middleware`, and `context`; added centralized defaults in `constants.ts` and pure `resolveLoggerConfig(envMap)` helper.

- 44134e0: Update Google AI Studio default model fallback to gemini-3-flash-preview
- 44134e0: Standardize default model to gemini-3.8-flash with resilient fallback
- Updated dependencies [44134e0]
  - @yuva-devlab/logger@1.3.2

## 0.2.2

### Patch Changes

- Updated dependencies [a44d7b6]
  - @yuva-devlab/logger@1.3.1

## 0.2.1

### Patch Changes

- Updated dependencies [f0788f4]
  - @yuva-devlab/logger@1.3.0

## 0.2.0

### Minor Changes

- e2e07f9: feat(core): release foundation shared packages for DevLab Platform ecosystem

### Patch Changes

- Updated dependencies [e2e07f9]
  - @yuva-devlab/errors@0.2.0
  - @yuva-devlab/logger@1.2.0
  - @yuva-devlab/resilience@0.2.0
