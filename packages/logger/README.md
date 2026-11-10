# 🪵 @yuva-devlab/logger

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/logger.svg)](https://www.npmjs.com/package/@yuva-devlab/logger)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> Enterprise, zero-dependency, isomorphic TypeScript logger, native `AsyncLocalStorage` request/user/tenant correlation context, method-level `@LogMethod()` decorator, dual ANSI/JSON formatters, and non-blocking HTTP batch transport to `devlab-logs`.

---

## Features

- 🔗 **Native `AsyncLocalStorage` Correlation Context**: Seamlessly propagates `correlationId`, `requestId`, `userId`, `tenantId`, and `appId` across asynchronous promise chains and concurrent operations without manual argument drilling.
- 🎯 **Method-Level `@LogMethod()` Decorator**: Automatically records function entry, parameters (with sensitive data masking for passwords/tokens), execution duration in milliseconds, return values, and structured error stack traces.
- 🎨 **Dual Formatters (ANSI & Canonical JSON)**:
  - **Text Mode**: Highly readable ANSI colors for terminal debugging: `[timestamp] LEVEL [context] [req:..][usr:..][ten:..]: message`
  - **Canonical JSON Mode**: Machine-parseable JSON format matching `devlab-logs` schema for ingestion and Datadog/Splunk indexing.
- 🚀 **Non-Blocking Transports**:
  - `ConsoleTransport`: High-throughput standard stdout/stderr logging.
  - `FileTransport`: Streamed disk persistence using Node.js filesystem buffers.
  - `HttpBatchTransport`: Background queue sending batched JSON logs (`POST /api/v1/logs/batch`) to `devlab-logs` with flush intervals and backoff retry.
- 🌐 **Express & Fastify Middleware**: `correlationMiddleware` (extracts/generates `x-correlation-id`, `x-request-id`, `traceparent`) and `requestLogger` with execution timing.
- 📦 **Dual ESM & CJS Build**: Works seamlessly across modern ESM runtimes, legacy CommonJS environments, and browser contexts.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [End-to-End Request Correlation](#end-to-end-request-correlation)
4. [Method Decorator (`@LogMethod`)](#method-decorator-logmethod)
5. [HTTP Batch Transport to `devlab-logs`](#http-batch-transport-to-devlab-logs)
6. [Express & NestJS Middleware](#express--nestjs-middleware)
7. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/logger

# npm
npm install @yuva-devlab/logger
```

---

## Quick Start

### Basic Logger

```typescript
import { Logger } from "@yuva-devlab/logger";

const logger = new Logger("AuthService");

logger.info("User logged in successfully", { userId: "user_123" });
logger.warn("Rate limit threshold approached", { ip: "192.168.1.1" });
logger.error("Failed to authenticate user", new Error("Token expired"));
logger.debug("Decoded JWT payload", { sub: "user_123" });
```

---

## End-to-End Request Correlation

Track an individual user's complete request flow across dozens of concurrent asynchronous operations using native Node.js `AsyncLocalStorage`:

```typescript
import {
  Logger,
  runWithContext,
  updateCorrelationContext,
} from "@yuva-devlab/logger";

const logger = new Logger("OrderService");

async function handleInboundRequest(req: Request) {
  // Bind request-scoped correlation context
  return runWithContext(
    {
      correlationId: req.headers.get("x-correlation-id") || crypto.randomUUID(),
      requestId: crypto.randomUUID(),
      appId: "finai",
    },
    async () => {
      // 1. Initial log - automatically carries correlationId & requestId
      logger.info("Processing order request");

      // 2. Update context once user identity is verified
      updateCorrelationContext({ userId: "usr_4402", tenantId: "tenant_apex" });

      // 3. Subsequent logs carry userId & tenantId automatically through all nested calls!
      await executeOrder();
    },
  );
}

async function executeOrder() {
  // Zero manual parameter passing — context is preserved!
  logger.info("Order executed successfully");
}
```

---

## Method Decorator (`@LogMethod`)

Decorate methods to automatically log entry parameters, execution timing, and errors:

```typescript
import { LogMethod } from "@yuva-devlab/logger";

export class PortfolioService {
  @LogMethod({
    logArgs: true,
    logResult: false,
    maskFields: ["pin", "ssn", "apiKey"],
  })
  async rebalancePortfolio(
    portfolioId: string,
    targetAllocations: Record<string, number>,
  ) {
    // Automatically logs:
    // [INFO] [PortfolioService.rebalancePortfolio] ENTRY args={"portfolioId":"...","targetAllocations":{...}}
    // ... execution ...
    // [INFO] [PortfolioService.rebalancePortfolio] EXIT duration=142ms
    return { success: true };
  }
}
```

---

## HTTP Batch Transport to `devlab-logs`

Stream structured logs directly to the DevLab telemetry ingestion cluster without blocking request threads:

```typescript
import {
  Logger,
  HttpBatchTransport,
  ConsoleTransport,
} from "@yuva-devlab/logger";

const devlabLogsTransport = new HttpBatchTransport({
  endpoint: "http://localhost:5000/api/v1/logs/batch",
  apiKey: process.env.DEVLAB_LOGS_API_KEY,
  batchSize: 50,
  flushIntervalMs: 2000,
});

const logger = new Logger("ExecutionEngine", {
  format: "json", // Ingest canonical JSON
  transports: [new ConsoleTransport(), devlabLogsTransport],
});
```

---

## Express & NestJS Middleware

Mount correlation middleware and HTTP request logger:

```typescript
import express from "express";
import {
  correlationMiddleware,
  requestLogger,
  Logger,
} from "@yuva-devlab/logger";

const app = express();
const httpLogger = new Logger("HTTP");

// 1. Mount correlation middleware first to establish AsyncLocalStorage scope
app.use(correlationMiddleware({ defaultAppId: "portal-api" }));

// 2. Mount request logger to record method, URL, status code, and latency
app.use(requestLogger(httpLogger));

app.get("/api/v1/status", (req, res) => {
  res.json({ ok: true });
});
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
