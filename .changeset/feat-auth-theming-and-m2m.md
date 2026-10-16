---
"@yuva-devlab/auth-client": minor
"@yuva-devlab/auth-server": minor
---

- **auth-client**: Add comprehensive theme-adaptive styling tokens across prebuilt auth components (SignIn, SignUp, ForgotPassword, AuthCard, AuthInput). Support dynamic brand and theme props. Add centralized password recovery resolution and session persistence helpers.
- **auth-server**: Upgrade RS256 JWKS validation with native crypto verification, add cached machine-to-machine (M2M) API key validator (M2mApiKeyValidator), and remove hardcoded local ports.
