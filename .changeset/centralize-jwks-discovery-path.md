---
"@yuva-devlab/auth-server": minor
"@yuva-devlab/auth-client": minor
"@yuva-devlab/auth-py": minor
"@yuva-devlab/cli": patch
---

feat(packages): centralize jwks discovery path and fix cli iterator

- Define `DEFAULT_JWKS_PATH` and `DEFAULT_OPENID_CONFIG_PATH` across auth-server, auth-client, auth-py, and cli
- Replace ad-hoc string literals with canonical constants for ecosystem-wide route configuration
- Fix TS2802 iterator error in CLI token inspection command and configure es2022 compiler target
