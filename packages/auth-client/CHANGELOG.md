# @yuva-devlab/auth-client

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
