---
"@yuva-devlab/agent-protocol": minor
"@yuva-devlab/agent-py": minor
---

feat(agent): add canonical polyglot SSE agent protocol (`@yuva-devlab/agent-protocol` and `devlab-agent`)

- Add `@yuva-devlab/agent-protocol` TypeScript package with domain-agnostic SSE enums, discriminated `AgentStreamEvent` contracts, `formatSseFrame()`, and HTTP `200 OK` unbuffered SSE response headers.
- Add `devlab-agent` (`@yuva-devlab/agent-py`) Python companion SDK with `StrEnum` parity, Pydantic v2 SSE event models, and Cloud Run-safe FastAPI `sse_stream_response()` helper.
- Update `sync-py-version.mjs` and `publish-py.mjs` to version and publish both `devlab-auth` and `devlab-agent` to PyPI.
