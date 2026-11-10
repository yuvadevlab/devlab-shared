# 🛡️ @yuva-devlab/resilience

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/resilience.svg)](https://www.npmjs.com/package/@yuva-devlab/resilience)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> Enterprise-grade reliability engineering, circuit breakers, bounded timeouts, retries with full jitter, bulkheads, rate limiters, composable pipelines, and chaos injection for high-concurrency DevLab services.

---

## Features

- ⏱️ **Hierarchical Deadlines & Timeouts (`withTimeout`, `DeadlineContext`)**: Prevent cascading thread exhaustion across microservices.
- 🔁 **Exponential Backoff with Jitter (`retryAsync`)**: Full, equal, and decorrelated jitter with custom error classifiers.
- 🔌 **Circuit Breaker State Machine (`CircuitBreaker`)**: Three-state (`CLOSED`, `OPEN`, `HALF_OPEN`) circuit breaker with fast-failing error paths.
- 🚢 **Bulkhead Concurrency Isolation (`Bulkhead`)**: Limit maximum concurrent operations and queue overflow to protect shared resources.
- 🪣 **Token Bucket Rate Limiting (`TokenBucket`)**: Smooth bursts with configurable leak and replenishment intervals.
- 🧱 **Composable Resilience Pipeline (`ResiliencePipeline`)**: Chain retries, timeouts, circuit breakers, and fallbacks into a single reusable execution policy.
- 💥 **Chaos Testing & Fault Injection (`ChaosInjector`)**: Inject synthetic latency, random exceptions, and dropped connections to test resilience in staging.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Resilience Pipeline](#resilience-pipeline)
4. [Circuit Breaker](#circuit-breaker)
5. [Bulkhead Concurrency Limiter](#bulkhead-concurrency-limiter)
6. [Chaos Testing](#chaos-testing)
7. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/resilience

# npm
npm install @yuva-devlab/resilience
```

---

## Quick Start

### Retrying with Exponential Backoff & Jitter

```typescript
import { retryAsync } from "@yuva-devlab/resilience";

const result = await retryAsync(
  async () => {
    return await fetch("https://api.marketdata.internal/v1/quotes/AAPL");
  },
  {
    maxRetries: 3,
    initialDelayMs: 200,
    maxDelayMs: 2000,
    jitter: "full",
    shouldRetry: (error) => error.status === 429 || error.status >= 500,
  },
);
```

---

## Resilience Pipeline

Compose multiple resilience patterns into an enterprise execution wrapper:

```typescript
import {
  ResiliencePipeline,
  CircuitBreaker,
  Bulkhead,
} from "@yuva-devlab/resilience";

const marketDataPipeline = new ResiliencePipeline({
  timeoutMs: 3000,
  retries: {
    maxAttempts: 3,
    backoff: "exponential",
  },
  circuitBreaker: new CircuitBreaker({
    failureThreshold: 5,
    resetTimeoutMs: 15_000,
  }),
  bulkhead: new Bulkhead({
    maxConcurrent: 20,
    maxQueue: 50,
  }),
  fallback: async (err) => {
    console.warn(
      "Primary upstream failed, serving cached fallback quote:",
      err.message,
    );
    return { symbol: "AAPL", price: 220.5, cached: true };
  },
});

// Execute safe call
const quote = await marketDataPipeline.execute(async () => {
  return await fetchQuoteFromExchange("AAPL");
});
```

---

## Circuit Breaker

Protect downstream databases and LLM endpoints from cascading failure:

```typescript
import {
  CircuitBreaker,
  CircuitBreakerOpenError,
} from "@yuva-devlab/resilience";

const breaker = new CircuitBreaker({
  name: "llm-inference-breaker",
  failureThreshold: 5,
  successThreshold: 2,
  resetTimeoutMs: 30_000,
});

try {
  const result = await breaker.execute(() => callUpstreamLlm());
} catch (err) {
  if (err instanceof CircuitBreakerOpenError) {
    console.error(
      "Downstream is down, request fast-failed immediately without network delay",
    );
  }
}
```

---

## Bulkhead Concurrency Limiter

Isolate execution pools to guarantee that non-critical tasks cannot starve mission-critical workflows:

```typescript
import { Bulkhead } from "@yuva-devlab/resilience";

const reportGenerationBulkhead = new Bulkhead({
  maxConcurrent: 5,
  maxQueue: 20,
});

await reportGenerationBulkhead.execute(async () => {
  await renderHeavyPdfReport();
});
```

---

## Chaos Testing

Inject random failures in staging environments to verify system self-healing:

```typescript
import { ChaosInjector } from "@yuva-devlab/resilience";

const chaos = new ChaosInjector({
  enabled: process.env.NODE_ENV === "test",
  failureRate: 0.1, // 10% injected failure probability
  latencyMs: { min: 200, max: 1500 },
});

await chaos.execute(async () => {
  return await fetchAccountSummary();
});
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
