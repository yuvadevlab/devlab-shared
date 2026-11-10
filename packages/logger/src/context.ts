/**
 * @file packages/logger/src/context.ts
 * @description Asynchronous context propagation using Node.js AsyncLocalStorage.
 * @author yuva.devlab@gmail.com
 */

import { AsyncLocalStorage } from "node:async_hooks";
import { randomUUID } from "node:crypto";
import type { CorrelationContext } from "./types";

const AsyncLocalStorageClass =
  typeof AsyncLocalStorage === "function" ? AsyncLocalStorage : null;
const asyncLocalStorage = AsyncLocalStorageClass
  ? new AsyncLocalStorageClass<CorrelationContext>()
  : null;

let fallbackContext: CorrelationContext | undefined = undefined;

/**
 * Retrieves the active correlation context for the current asynchronous call stack.
 *
 * @returns The active CorrelationContext or undefined if running outside a context.
 */
export function getCorrelationContext(): CorrelationContext | undefined {
  return asyncLocalStorage ? asyncLocalStorage.getStore() : fallbackContext;
}

/**
 * Executes a callback within an explicit correlation context.
 *
 * @param context - Correlation context to bind to the async execution scope.
 * @param fn - Callback function to run within the context.
 * @returns The return value of the callback.
 */
export function runWithContext<T>(context: CorrelationContext, fn: () => T): T {
  if (asyncLocalStorage) {
    return asyncLocalStorage.run(context, fn);
  }
  const prev = fallbackContext;
  fallbackContext = context;
  try {
    return fn();
  } finally {
    fallbackContext = prev;
  }
}

/**
 * Updates the active correlation context with partial values.
 * Useful for enriching context after JWT authentication (e.g. userId, tenantId).
 *
 * @param partial - Partial context properties to merge.
 */
export function updateCorrelationContext(
  partial: Partial<CorrelationContext>,
): void {
  const current = getCorrelationContext();
  if (current) {
    Object.assign(current, partial);
  }
}

/**
 * Generates a standard trace identifier (UUID v4).
 */
export function generateTraceId(): string {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  try {
    return randomUUID();
  } catch {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

/**
 * Generates a standard request identifier (UUID v4 or truncated).
 */
export function generateRequestId(): string {
  return generateTraceId();
}

/**
 * Builds a default or fallback correlation context.
 *
 * @param overrides - Optional overrides for context fields.
 */
export function createDefaultContext(
  overrides?: Partial<CorrelationContext>,
): CorrelationContext {
  return {
    traceId: overrides?.traceId || generateTraceId(),
    requestId: overrides?.requestId || generateRequestId(),
    userId: overrides?.userId || "anonymous",
    tenantId: overrides?.tenantId,
    clientIp: overrides?.clientIp || "127.0.0.1",
    serviceName:
      overrides?.serviceName || process.env.SERVICE_NAME || "devlab-service",
    ...overrides,
  };
}
