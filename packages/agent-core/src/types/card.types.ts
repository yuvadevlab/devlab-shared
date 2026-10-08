/**
 * @file packages/agent-core/src/types/card.types.ts
 * @description Rich UI card presentation schemas for human-in-the-loop approvals and preview cards.
 * @module @yuva-devlab/agent-core
 */

import { z } from "zod";

/**
 * Interactive button action rendered on an agent card in the console UI.
 */
export const CardActionSchema = z.object({
  label: z.string().describe("Button display text"),
  actionId: z.string().describe("Unique identifier triggered on click"),
  style: z.enum(["PRIMARY", "DANGER", "SECONDARY"]).default("PRIMARY"),
});

export type CardAction = z.infer<typeof CardActionSchema>;

/**
 * Rich preview card representation rendered in chat messages before or after tool execution.
 *
 * @example
 * ```typescript
 * const card: AgentCardPayload = {
 *   title: "Transfer $500.00 to Savings",
 *   badge: "Financial Mutation",
 *   previewMarkdown: "**Recipient:** Savings Account\n**Amount:** $500.00",
 *   actions: [{ label: "Approve Transfer", actionId: "approve_tx", style: "PRIMARY" }],
 * };
 * ```
 */
export const AgentCardPayloadSchema = z.object({
  title: z.string().describe("Card heading title"),
  badge: z
    .string()
    .optional()
    .describe("Tag or badge text (e.g. 'Read Only', 'Financial')"),
  previewMarkdown: z
    .string()
    .describe("Markdown content describing the proposed operation"),
  actions: z
    .array(CardActionSchema)
    .optional()
    .describe("Optional interactive confirmation buttons"),
  metadata: z
    .record(z.string(), z.unknown())
    .optional()
    .describe("Associated raw entity metadata"),
});

export type AgentCardPayload = z.infer<typeof AgentCardPayloadSchema>;
