/**
 * @file packages/events/src/contracts/envelope.ts
 * @description Standard transactional outbox and event bus envelope schema for DevLab.
 *
 * Guarantees cross-service traceability, event ordering, and idempotency across all services.
 *
 * @module @yuva-devlab/events
 */

import { z } from "zod";
import { UUID_REGEX } from "@yuva-devlab/regex";

/**
 * Standard Zod validator for RFC UUID strings.
 */
export const UuidSchema = z
  .string()
  .regex(UUID_REGEX, "Must be a valid RFC UUID format");

/**
 * Zod schema defining the canonical metadata envelope wrapping all domain events.
 */
export const DomainEventEnvelopeSchema = z
  .object({
    /** Unique event occurrence UUID for deduplication */
    eventId: UuidSchema,
    /** Qualified dot-notated or uppercase event type (e.g. AGENT.EXECUTION.COMPLETED) */
    eventType: z.string().min(1, "Event type must not be empty"),
    /** Optional execution or correlation identifier */
    executionId: z.string().optional(),
    /** Optional tenant partition identifier */
    tenantId: z.string().optional(),
    /** Distributed trace identifier for end-to-end telemetry */
    traceId: z.string().optional(),
    /** ISO-8601 string or Date object representing event generation time */
    timestamp: z
      .string()
      .datetime()
      .default(() => new Date().toISOString()),
    /** Domain-specific event payload matching the eventType */
    payload: z.record(z.string(), z.unknown()),
  })
  .describe(
    "Universal envelope for domain events transported via outbox, memory, or stream",
  );

/**
 * Inferred type of the canonical domain event envelope.
 */
export type DomainEventEnvelope<
  TPayload extends Record<string, unknown> = Record<string, unknown>,
> = Omit<z.infer<typeof DomainEventEnvelopeSchema>, "payload"> & {
  payload: TPayload;
};

/**
 * Factory options for generating a new DomainEventEnvelope.
 */
export interface CreateEventEnvelopeOptions<
  TPayload extends Record<string, unknown>,
> {
  eventId?: string;
  eventType: string;
  payload: TPayload;
  executionId?: string;
  tenantId?: string;
  traceId?: string;
  timestamp?: string;
}

/**
 * Generates a valid domain event envelope with defaults.
 *
 * @param options - Factory configuration options.
 * @returns Fully constructed DomainEventEnvelope.
 */
export function createEventEnvelope<TPayload extends Record<string, unknown>>(
  options: CreateEventEnvelopeOptions<TPayload>,
): DomainEventEnvelope<TPayload> {
  const envelope: DomainEventEnvelope<TPayload> = {
    eventId: options.eventId ?? crypto.randomUUID(),
    eventType: options.eventType,
    payload: options.payload,
    executionId: options.executionId,
    tenantId: options.tenantId,
    traceId: options.traceId,
    timestamp: options.timestamp ?? new Date().toISOString(),
  };

  // Validate envelope constraints against schema
  DomainEventEnvelopeSchema.parse(envelope);
  return envelope;
}
