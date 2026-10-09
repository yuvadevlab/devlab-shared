/**
 * @file packages/events/src/index.ts
 * @description Master barrel export for the DevLab platform distributed events foundation.
 *
 * Provides domain event envelopes, in-memory event bus, transactional outbox pattern,
 * and distributed idempotency stores.
 *
 * @module @yuva-devlab/events
 */

export * from "./contracts";
export * from "./bus";
export * from "./outbox";
export * from "./idempotency";
