# 🧠 @yuva-devlab/ai-client

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/ai-client.svg)](https://www.npmjs.com/package/@yuva-devlab/ai-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> Unified multi-provider AI client, streaming adapters (Ollama, Groq, Google Gemini, OpenAI, Anthropic), multi-tier fallback cascade, and self-healing structured JSON extraction for the DevLab platform.

---

## Features

- 🌐 **Unified Multi-Provider Adapters**: One common interface across Ollama, Groq, Google (Gemini), OpenAI, and Anthropic.
- 🌊 **First-Class Streaming Support**: Type-safe async generator streams for token-by-token rendering and tool call deltas.
- 🪜 **Multi-Tier Fallback Cascade**: Automatically route requests across cheaper or local models first, falling back to frontier cloud providers on failure or rate limits.
- 🩹 **Self-Healing Structured Outputs**: Parse and repair malformed JSON responses using Zod schemas and automatic reflection passes.
- 🔑 **Centralized Credential Resolution**: Automatic resolution from environment variables or custom secret providers.
- 📦 **Dual ESM & CJS Build**: Complete support across Node.js services and edge functions.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Provider Adapters](#provider-adapters)
4. [Streaming Text & Tool Calls](#streaming-text--tool-calls)
5. [Fallback Cascade Engine](#fallback-cascade-engine)
6. [Self-Healing Structured JSON](#self-healing-structured-json)
7. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/ai-client zod

# npm
npm install @yuva-devlab/ai-client zod
```

---

## Quick Start

Create an AI client for any supported provider:

```typescript
import { createAiClient } from "@yuva-devlab/ai-client";

const client = createAiClient({
  provider: "google",
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.5-pro",
});

const response = await client.generateText({
  prompt: "Explain how zero-knowledge rollups scale decentralized finance.",
  temperature: 0.2,
});

console.log(response.text);
```

---

## Provider Adapters

Switch between providers with zero application logic changes:

```typescript
// 1. Ollama (Local LLM)
const localClient = createAiClient({
  provider: "ollama",
  baseUrl: "http://localhost:11434",
  model: "llama3.3:70b",
});

// 2. Groq (Ultra-low latency)
const groqClient = createAiClient({
  provider: "groq",
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",
});

// 3. Anthropic
const claudeClient = createAiClient({
  provider: "anthropic",
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: "claude-3-7-sonnet-20250219",
});
```

---

## Streaming Text & Tool Calls

Consume real-time token streams seamlessly:

```typescript
const stream = await client.streamText({
  prompt: "Generate an executive summary of quarterly earnings.",
});

for await (const chunk of stream) {
  process.stdout.write(chunk.delta);
}
```

---

## Fallback Cascade Engine

Define multi-tier reliability strategies to avoid downtime and rate-limiting outages:

```typescript
import { createCascadeClient } from "@yuva-devlab/ai-client";

const cascade = createCascadeClient({
  tiers: [
    // Tier 1: Fast local inference
    { provider: "ollama", model: "llama3.3:70b" },
    // Tier 2: Low-latency cloud inference
    { provider: "groq", model: "llama-3.3-70b-versatile" },
    // Tier 3: Frontier cloud fallback
    { provider: "google", model: "gemini-2.5-flash" },
  ],
  retryCountPerTier: 2,
  backoffMs: 500,
});

const result = await cascade.generateText({
  prompt: "Summarize this critical transaction.",
});

console.log(`Fulfilled by tier provider: ${result.meta.resolvedProvider}`);
```

---

## Self-Healing Structured JSON

Guarantee valid JSON output validated against a Zod schema:

```typescript
import { z } from "zod";

const RiskAssessmentSchema = z.object({
  score: z.number().min(0).max(100),
  riskLevel: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]),
  factors: z.array(z.string()),
});

const assessment = await client.generateStructured({
  prompt:
    "Evaluate the volatility risk for high-frequency algorithmic trade #8892.",
  schema: RiskAssessmentSchema,
  schemaName: "RiskAssessment",
});

console.log(assessment.data.riskLevel);
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
