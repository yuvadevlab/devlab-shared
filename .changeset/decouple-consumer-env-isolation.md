---
"@yuva-devlab/ai-client": patch
"@yuva-devlab/auth-server": patch
"@yuva-devlab/logger": patch
---

refactor: decouple packages from ambient process.env into pure consumer injection

- `@yuva-devlab/ai-client`: removed ambient `process.env` lookups across all adapters (`google`, `groq`, `openai`, `anthropic`, `ollama`), `provider-factory`, and `env-resolver`. All adapters now require explicit consumer config or dynamic credential functions.
- `@yuva-devlab/auth-server`: removed ambient `process.env.DEVLAB_PORTAL_API_URL` from `M2mApiKeyValidator` and `JwksValidator`; requires explicit consumer URL injection.
- `@yuva-devlab/logger`: removed ambient `process.env` lookups (`LOG_LEVEL`, `LOG_FORMAT`, `NODE_ENV`, `LOG_ENABLED`, `SERVICE_NAME`, `DEVLAB_LOGS_*`) from `Logger`, `middleware`, and `context`; added centralized defaults in `constants.ts` and pure `resolveLoggerConfig(envMap)` helper.
