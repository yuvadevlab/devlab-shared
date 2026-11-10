# 📬 @yuva-devlab/events

[![npm version](https://img.shields.io/npm/v/@yuva-devlab/events.svg)](https://www.npmjs.com/package/@yuva-devlab/events)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6.x-3178c6.svg)](https://www.typescriptlang.org)

> Standardized domain event envelopes, in-memory event bus, transactional outbox pattern, and distributed idempotency stores for reliable event-driven architecture across the DevLab platform.

---

## Features

- ✉️ **Standardized Event Envelopes (`DomainEvent`)**: Uniform structure with event ID, timestamp, topic, correlation context, and typed payload.
- 🚌 **In-Memory Event Bus (`InMemoryEventBus`)**: Decoupled publish/subscribe bus with asynchronous dispatch, wildcard topic matching, and error isolation.
- 📦 **Transactional Outbox Pattern (`OutboxRelay`, `IOutboxStore`)**: Guarantee at-least-once message delivery without dual-write race conditions.
- 🛡️ **Distributed Idempotency (`IdempotencyStore`)**: Deduplicate concurrent webhook deliveries, command executions, and payment callbacks.
- 🔍 **Correlation & Trace Propagation**: Carries `correlationId`, `causationId`, `tenantId`, and `userId` across event chains.
- 📦 **Dual ESM & CJS Build**: Clean consumption across Node.js event subscribers, serverless workers, and agent runtimes.

---

## Table of Contents

1. [Installation](#installation)
2. [Quick Start](#quick-start)
3. [Domain Events & Envelopes](#domain-events--envelopes)
4. [In-Memory Event Bus](#in-memory-event-bus)
5. [Transactional Outbox Pattern](#transactional-outbox-pattern)
6. [Idempotency Guard](#idempotency-guard)
7. [Author & Attribution](#author--attribution)

---

## Installation

```bash
# pnpm (recommended)
pnpm add @yuva-devlab/events

# npm
npm install @yuva-devlab/events
```

---

## Quick Start

### Publishing and Subscribing to Events

```typescript
import { InMemoryEventBus, createDomainEvent } from "@yuva-devlab/events";

// 1. Initialize bus
const bus = new InMemoryEventBus();

// 2. Subscribe to user signup events
bus.subscribe("user.created", async (event) => {
  console.log(`Sending welcome email to: ${event.payload.email}`);
});

// 3. Publish an event
const event = createDomainEvent({
  topic: "user.created",
  source: "auth-service",
  tenantId: "tenant_apex",
  payload: {
    userId: "usr_9912",
    email: "alex@example.com",
    role: "DEVELOPER",
  },
});

await bus.publish(event);
```

---

## Domain Events & Envelopes

Every event follows a strict, observable schema:

```typescript
export interface DomainEvent<T = unknown> {
  id: string; // Unique event UUIDv4
  topic: string; // Dot-separated topic (e.g., "billing.invoice.paid")
  source: string; // Service origin (e.g., "billing-service")
  timestamp: string; // ISO-8601 creation time
  correlationId?: string; // Trace correlation across microservices
  tenantId?: string; // Tenant boundary
  payload: T; // Strongly typed payload
}
```

---

## Transactional Outbox Pattern

Eliminate the distributed dual-write problem by saving outbox records inside your primary database transaction and relaying them asynchronously:

```typescript
import { OutboxRelay, IOutboxStore } from "@yuva-devlab/events";

// Implement or inject your database store (PostgreSQL / Prisma)
const store: IOutboxStore = getDatabaseOutboxStore();

const relay = new OutboxRelay(store, bus, {
  batchSize: 50,
  pollIntervalMs: 1000,
  maxRetries: 5,
});

// Start background poller
await relay.start();
```

---

## Idempotency Guard

Prevent duplicate execution when webhooks or requests are retried:

```typescript
import { InMemoryIdempotencyStore } from "@yuva-devlab/events";

const idempotency = new InMemoryIdempotencyStore({ ttlSeconds: 86400 });

async function handleWebhook(idempotencyKey: string, payload: unknown) {
  const isDuplicate = await idempotency.has(idempotencyKey);
  if (isDuplicate) {
    console.warn(`Duplicate event received for key: ${idempotencyKey}`);
    return;
  }

  await idempotency.record(idempotencyKey);
  await processPayment(payload);
}
```

---

## Author & Attribution

- **Author**: Yuva DevLab (`yuva.devlab@gmail.com`)
- **License**: MIT
