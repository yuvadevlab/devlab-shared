# @yuva-devlab/agent-protocol

## 0.3.0

### Minor Changes

- 521a95c: Extend `@yuva-devlab/agent-protocol` with `PLAN` and `SOURCES` SSE events plus tool/usage telemetry fields, and introduce `@yuva-devlab/agent-ui` — a reusable, customizable, theme-adaptive, and responsive Agentic Chat UI composite.

## 0.2.0

### Minor Changes

- c362e4d: feat(agent): add canonical polyglot SSE agent protocol (`@yuva-devlab/agent-protocol` and `devlab-agent`)

  - Add `@yuva-devlab/agent-protocol` TypeScript package with domain-agnostic SSE enums, discriminated `AgentStreamEvent` contracts, `formatSseFrame()`, and HTTP `200 OK` unbuffered SSE response headers.
  - Add `devlab-agent` (`@yuva-devlab/agent-py`) Python companion SDK with `StrEnum` parity, Pydantic v2 SSE event models, and Cloud Run-safe FastAPI `sse_stream_response()` helper.
  - Update `sync-py-version.mjs` and `publish-py.mjs` to version and publish both `devlab-auth` and `devlab-agent` to PyPI.
