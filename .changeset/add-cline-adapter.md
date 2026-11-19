---
"@yuva-devlab/ai-client": minor
---

Add first-class Cline API Gateway adapter with bidirectional tool normalization

- Implement `ClineAdapter` supporting completions and SSE streaming via Cline API Gateway (`https://api.cline.bot/api/v1`)
- Support bidirectional OpenAPI tool name normalization (`.` ⇄ `_`) to adhere to provider function regex requirements
- Add Cline API Gateway default endpoint and model constants
- Register `cline` provider type in `createProvider()` factory and cascade fallback candidates
