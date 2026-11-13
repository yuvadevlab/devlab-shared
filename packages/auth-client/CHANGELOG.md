# @yuva-devlab/auth-client

## 1.3.0

### Minor Changes

- f5100bc: feat(packages): centralize jwks discovery path and fix cli iterator

  - Define `DEFAULT_JWKS_PATH` and `DEFAULT_OPENID_CONFIG_PATH` across auth-server, auth-client, auth-py, and cli
  - Replace ad-hoc string literals with canonical constants for ecosystem-wide route configuration
  - Fix TS2802 iterator error in CLI token inspection command and configure es2022 compiler target

## 1.2.1

### Patch Changes

- d08b552: feat(cli): complete rewrite into developer operations tool with port inspection, environment doctor, service status, docker infra, and jwt token validation
  docs(tokens,ui,auth-client): update documentation for responsive tokens, table row hover, and edge jwt validation

## 1.2.0

### Minor Changes

- e1b0d6d: feat(tokens,ui,auth): responsive fluid clamp tokens, theme-aware table hover highlighting, encapsulated legal footer, and edge jwt verification

## 1.1.4

### Patch Changes

- 03b48ed: feat(auth-client): enforce environment variable isolation, centralize auth query parameter enums, storage keys, endpoints, and UI copy
  feat(supervisor): introduce change-resilient TypeScript enums with backward-compatible template literal union types

## 1.1.3

### Patch Changes

- Updated dependencies [a44d7b6]
  - @yuva-devlab/logger@1.3.1

## 1.1.2

### Patch Changes

- Updated dependencies [f0788f4]
  - @yuva-devlab/logger@1.3.0

## 1.1.1

### Patch Changes

- 9649a8b: Standardize Select dropdown trigger to standard form control height (2.25rem / 36px) and padding (0.75rem); increase AuthCard default max-width to 450px and simplify sign-in access request footer text to prevent single-word wrapping.

## 1.1.0

### Minor Changes

- 088c5a1: Standardize Select dropdown trigger width to 100% and bind popover to Radix trigger width variable; remove legacy self-signup from auth-client in favor of centralized SSO workspace invitations.

## 1.0.1

### Patch Changes

- 7860d23: Prevent forced root navigation in SignIn and SignUp components when a custom onSuccess handler is provided, allowing custom SSO redirects to execute cleanly.

## 1.0.0

### Major Changes

- 216e0c4: Remove legacy SSO URL environment aliases and use `NEXT_PUBLIC_DEVLAB_PORTAL_WEB_URL` as the single environment variable for Portal web redirects. Auth cards also support optional logo/icon content and full-page layout.

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
