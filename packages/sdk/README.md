# 🚀 @yuva-devlab/sdk

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/sdk.svg)](https://www.npmjs.com/package/@yuva-devlab/sdk)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> Master TypeScript SDK for the Yuva DevLab ecosystem. Unifies multi-provider AI inference, RAG embeddings, vector stores, tool registries, semantic caching, billing, resilience pipelines, and event buses into one cohesive developer experience.

---

## Features

- 🌟 **Single Master Client (`DevLabClient`)**: Instantly access inference, RAG, caching, tools, billing, and events without juggling fragmented packages.
- 🧠 **Multi-Provider AI Inference**: Built-in adapters for Google Gemini, OpenAI, Anthropic, Groq, and local Ollama models.
- 🔍 **Embedded RAG & Vector Engine**: Chunk documents, generate embeddings, and execute similarity searches directly.
- ⚡ **Zero-Config Semantic Caching**: Automatically cache prompt completions to slash token spend and p99 latency.
- 🛠️ **Autonomous Agent Tool Registry**: Register typed Zod tools and dynamic prompt compilers.
- 💳 **Billing & Ledger Attribution**: Automatic token metering, quota checks, and audit-grade cost ledgers.
- 📦 **Re-Exports of Platform Building Blocks**: Centralized imports for `@yuva-devlab/errors`, `@yuva-devlab/events`, `@yuva-devlab/resilience`, and `@yuva-devlab/agent-core`.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Master Client Capabilities](#master-client-capabilities)
4. [Agent & Tool Execution](#agent--tool-execution)
5. [RAG & Vector Search](#rag--vector-search)
6. [Semantic Caching](#semantic-caching)
7. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/sdk

# npm
npm install @yuva-devlab/sdk
```

---

## Quick Start

Initialize `DevLabClient` with your platform API key:

```typescript
import { DevLabClient } from "@yuva-devlab/sdk";

const client = new DevLabClient({
  apiKey: process.env.DEVLAB_API_KEY,
  tenantId: "tenant_apex",
  gatewayUrl: "http://localhost:4000",
});

// Execute LLM inference with automatic semantic caching and token metering
const completion = await client.complete({
  model: "gemini-2.5-flash",
  messages: [
    { role: "system", content: "You are an expert platform architect." },
    {
      role: "user",
      content: "Summarize the DevLab microservice telemetry strategy.",
    },
  ],
});

console.log(completion.text);
console.log(`Tokens Used: ${completion.usage.totalTokens}`);
```

---

## Master Client Capabilities

`DevLabClient` exposes dedicated platform namespaces:

```typescript
// 1. Multi-provider AI inference
const text = await client.ai.generateText({ prompt: "Hello world" });

// 2. Semantic vector caching
const cached = await client.cache.get("Hello world");

// 3. Document chunking & vector store
await client.vectorStore.upsert({ id: "doc-1", content: "Architecture docs" });

// 4. Agent tool registry
client.tools.register(myCustomTool);

// 5. Distributed event bus
client.events.subscribe("order.created", handleOrder);

// 6. Cost ledger
const tenantSpend = await client.billing.getTenantSummary("tenant_apex");
```

---

## Agent & Tool Execution

Register universal tools with Zod parameters and invoke them seamlessly:

```typescript
import { z } from "zod";
import { defineTool } from "@yuva-devlab/sdk";

const currencyConverter = defineTool({
  name: "convert_currency",
  description: "Converts fiat amounts based on current rates",
  parameters: z.object({
    amount: z.number(),
    from: z.string(),
    to: z.string(),
  }),
  execute: async ({ amount, from, to }) => {
    return { amount, from, to, converted: amount * 1.08 };
  },
});

client.tools.register(currencyConverter);
```

---

## RAG & Vector Search

Index documents and query top matches in fewer than 5 lines:

```typescript
// Index text with automated chunking
await client.ingestDocument(
  "policy-doc-1",
  "Standard SLAs require 99.99% uptime.",
);

// Search top matches
const matches = await client.searchContext("What SLA uptime is required?", {
  topK: 2,
});
console.log(matches[0].chunk.content);
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
