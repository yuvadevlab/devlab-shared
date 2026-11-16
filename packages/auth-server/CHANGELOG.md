# @yuva-devlab/auth-server

## 1.1.1

### Patch Changes

- 44134e0: refactor: decouple packages from ambient process.env into pure consumer injection

  - `@yuva-devlab/ai-client`: removed ambient `process.env` lookups across all adapters (`google`, `groq`, `openai`, `anthropic`, `ollama`), `provider-factory`, and `env-resolver`. All adapters now require explicit consumer config or dynamic credential functions.
  - `@yuva-devlab/auth-server`: removed ambient `process.env.DEVLAB_PORTAL_API_URL` from `M2mApiKeyValidator` and `JwksValidator`; requires explicit consumer URL injection.
  - `@yuva-devlab/logger`: removed ambient `process.env` lookups (`LOG_LEVEL`, `LOG_FORMAT`, `NODE_ENV`, `LOG_ENABLED`, `SERVICE_NAME`, `DEVLAB_LOGS_*`) from `Logger`, `middleware`, and `context`; added centralized defaults in `constants.ts` and pure `resolveLoggerConfig(envMap)` helper.

- Updated dependencies [44134e0]
  - @yuva-devlab/logger@1.3.2

## 1.1.0

### Minor Changes

- f5100bc: feat(packages): centralize jwks discovery path and fix cli iterator

  - Define `DEFAULT_JWKS_PATH` and `DEFAULT_OPENID_CONFIG_PATH` across auth-server, auth-client, auth-py, and cli
  - Replace ad-hoc string literals with canonical constants for ecosystem-wide route configuration
  - Fix TS2802 iterator error in CLI token inspection command and configure es2022 compiler target

## 1.0.3

### Patch Changes

- e1b0d6d: feat(tokens,ui,auth): responsive fluid clamp tokens, theme-aware table hover highlighting, encapsulated legal footer, and edge jwt verification

## 1.0.2

### Patch Changes

- Updated dependencies [a44d7b6]
  - @yuva-devlab/logger@1.3.1

## 1.0.1

### Patch Changes

- Updated dependencies [f0788f4]
  - @yuva-devlab/logger@1.3.0

## 1.0.0

### Major Changes

- 216e0c4: Remove legacy Portal URL environment aliases. Configure the canonical `DEVLAB_PORTAL_API_URL` for JWKS and machine-to-machine API-key validation.

## 0.3.0

### Minor Changes

- f73eeca: - **auth-client**: Add comprehensive theme-adaptive styling tokens across prebuilt auth components (SignIn, SignUp, ForgotPassword, AuthCard, AuthInput). Support dynamic brand and theme props. Add centralized password recovery resolution and session persistence helpers.
  - **auth-server**: Upgrade RS256 JWKS validation with native crypto verification, add cached machine-to-machine (M2M) API key validator (M2mApiKeyValidator), and remove hardcoded local ports.

## 0.2.0

### Minor Changes

- e2e07f9: feat(core): release foundation shared packages for DevLab Platform ecosystem

### Patch Changes

- Updated dependencies [e2e07f9]
  - @yuva-devlab/errors@0.2.0
  - @yuva-devlab/logger@1.2.0
