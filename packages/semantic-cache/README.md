# ⚡ @yuva-devlab/semantic-cache

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/semantic-cache.svg)](https://www.npmjs.com/package/@yuva-devlab/semantic-cache)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> High-performance semantic vector caching and cosine similarity deduplication for LLM inferences, API responses, and agent workloads across the DevLab ecosystem.

---

## Features

- 🎯 **Semantic Similarity Matching**: Retrieve cached responses for semantically equivalent prompts even when the wording differs.
- 💰 **LLM Cost & Latency Reduction**: Skip expensive frontier model API calls and slash p99 latencies from seconds to sub-millisecond lookups.
- 📊 **Real-Time Cache Metrics**: Track cache hit ratio, token savings, latency improvements, and evicted entries via `CacheMetricsCollector`.
- ⏳ **TTL & Capacity Eviction**: Automated time-to-live eviction and LRU pruning to prevent memory bloating.
- 🔒 **Tenant & Namespace Isolation**: Scope caches by tenant, application, or model to eliminate cross-tenant data leakage.
- 📦 **Dual ESM & CJS Build**: Ready for microservices, Next.js API routes, and agent orchestrators.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Similarity Threshold Configuration](#similarity-threshold-configuration)
4. [Cache Metrics & Cost Savings](#cache-metrics--cost-savings)
5. [Tenant Isolation](#tenant-isolation)
6. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/semantic-cache

# npm
npm install @yuva-devlab/semantic-cache
```

---

## Quick Start

```typescript
import { SemanticCache } from "@yuva-devlab/semantic-cache";

// Initialize cache with similarity threshold
const cache = new SemanticCache({
  similarityThreshold: 0.92, // 92% semantic similarity required for a hit
  ttlMs: 3600_000, // 1 hour TTL
  maxEntries: 5000,
});

// Cache a prompt and its completion
await cache.set(
  "What is the market capitalization of Apple?",
  "Apple Inc. (AAPL) market capitalization is approximately $3.5 Trillion as of late 2026.",
  { tokensSaved: 120 },
);

// Query with a semantically equivalent but differently phrased prompt
const match = await cache.get("Tell me the market cap of AAPL");

if (match) {
  console.log(
    `Cache HIT! (Similarity: ${(match.similarity * 100).toFixed(1)}%)`,
  );
  console.log(`Response: ${match.value}`);
} else {
  console.log("Cache MISS — forwarding to LLM provider");
}
```

---

## Similarity Threshold Configuration

Adjust the sensitivity of matching based on application tolerance:

| Threshold     | Matching Behavior | Best Use Cases                                                   |
| :------------ | :---------------- | :--------------------------------------------------------------- |
| `0.98+`       | Strict Match      | Financial transactions, code compilation, mathematical proofs    |
| `0.90 - 0.95` | Balanced Match    | FAQ lookups, customer support bots, general Q&A                  |
| `0.80 - 0.89` | Loose Match       | Brainstorming, conversational intent detection, topic clustering |

---

## Cache Metrics & Cost Savings

Monitor cache performance and token economics:

```typescript
const stats = cache.getMetrics();

console.log(`Total Requests: ${stats.totalRequests}`);
console.log(`Hit Ratio: ${(stats.hitRatio * 100).toFixed(1)}%`);
console.log(`Estimated Tokens Saved: ${stats.tokensSaved}`);
console.log(`Average Lookup Latency: ${stats.averageLatencyMs.toFixed(2)}ms`);
```

---

## Tenant Isolation

Ensure strict data partitioning across enterprise clients:

```typescript
// Tenant A cache lookup
const tenantAResult = await cache.get("What is my revenue?", {
  namespace: "tenant_apex_capital",
});

// Tenant B cache lookup (isolated namespace)
const tenantBResult = await cache.get("What is my revenue?", {
  namespace: "tenant_horizon_ltd",
});
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
