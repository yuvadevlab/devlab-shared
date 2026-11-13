# @yuva-devlab/auth-py

## 0.3.0

### Minor Changes

- f5100bc: feat(packages): centralize jwks discovery path and fix cli iterator

  - Define `DEFAULT_JWKS_PATH` and `DEFAULT_OPENID_CONFIG_PATH` across auth-server, auth-client, auth-py, and cli
  - Replace ad-hoc string literals with canonical constants for ecosystem-wide route configuration
  - Fix TS2802 iterator error in CLI token inspection command and configure es2022 compiler target

## 0.2.0

### Minor Changes

- 4896b97: Add universal Python authentication SDK (`devlab-auth`) with RS256 JWKS validation, M2M API key caching, and FastAPI route guards.
