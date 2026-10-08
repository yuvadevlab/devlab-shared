/**
 * @file packages/events/src/outbox/outbox-record.ts
 * @description Outbox table record model and validation schema for the Transactional Outbox pattern.
 * @module @yuva-devlab/events
 */

import { z } from "zod";
import { DomainEventEnvelopeSchema } from "../contracts/envelope";

/**
 * Lifecycle status of an outbox record awaiting dispatch.
 */
export const OutboxStatus = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  PUBLISHED: "PUBLISHED",
  FAILED: "FAILED",
} as const;

export type OutboxStatus = (typeof OutboxStatus)[keyof typeof OutboxStatus];

/**
 * Zod schema validating a persisted outbox record.
 */
export const OutboxRecordSchema = z.object({
  id: z.string().uuid("Outbox record ID must be an RFC UUID"),
  envelope: DomainEventEnvelopeSchema,
  status: z.enum([
    OutboxStatus.PENDING,
    OutboxStatus.PROCESSING,
    OutboxStatus.PUBLISHED,
    OutboxStatus.FAILED,
  ]),
  attempts: z.number().int().nonnegative().default(0),
  maxAttempts: z.number().int().positive().default(5),
  lastError: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  publishedAt: z.string().datetime().optional(),
});

export type OutboxRecord = z.infer<typeof OutboxRecordSchema>;
