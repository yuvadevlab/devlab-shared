---
"@yuva-devlab/agent-core": minor
---

feat(agent-core): add Cloud Run-safe SSE emitter, ToolPlanStreamFilter, parallel tool batching, and AppAiPolicy schema

- Add `createAgentSseEmitter` enforcing HTTP `200 OK` before `flushHeaders()`, unbuffered headers, and `AbortSignal` disconnect propagation.
- Extract `ToolPlanStreamFilter` and `executeToolBatch` for parallel read-only tool execution.
- Add `AppAiPolicySchema`, `AgentCreativityPreset`, and `resolveEffectivePolicy` for `devlab-ai-studio` profile controls.
