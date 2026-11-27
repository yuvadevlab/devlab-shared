# `devlab-agent` (`@yuva-devlab/agent-py`)

Python companion to `@yuva-devlab/agent-protocol`. Provides canonical `StrEnum` definitions, Pydantic v2 SSE event models, and Cloud Run-safe FastAPI `StreamingResponse` helpers (`200 OK`, unbuffered headers, disconnect propagation, and guaranteed `error` + `done` termination).

- **Author:** `yuva.devlab@gmail.com`
