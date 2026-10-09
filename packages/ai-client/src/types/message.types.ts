/**
 * @file packages/ai-client/src/types/message.types.ts
 * @description Canonical conversation turns, message roles, and tool call payload schemas for DevLab AI models.
 * @module @yuva-devlab/ai-client
 */

import { z } from "zod";

/**
 * Standardized message role enum in canonical UPPERCASE format.
 * Maps 1:1 with model conversational roles across OpenAI, Anthropic, Google, and Ollama.
 */
export const MessageRole = {
  /** System directives establishing model persona, safety guidelines, and tool catalog */
  SYSTEM: "SYSTEM",
  /** End-user input turn */
  USER: "USER",
  /** Assistant generative completion turn or previous reasoning trace */
  ASSISTANT: "ASSISTANT",
  /** Return output payload from an executed tool or external function */
  TOOL: "TOOL",
} as const;

export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole];

/**
 * Zod schema validating a structured tool invocation requested by a model.
 */
export const ToolCallSchema = z.object({
  /** Unique tool call identifier assigned by the model provider */
  id: z.string().describe("Unique tool call ID assigned by the model"),
  /** Name of the tool or function requested to execute */
  name: z.string().describe("Name of the tool requested"),
  /** Parsed arguments dictionary conforming to the tool's input schema */
  arguments: z
    .record(z.string(), z.unknown())
    .describe("Parsed arguments dictionary"),
});

export type ToolCall = z.infer<typeof ToolCallSchema>;

/**
 * Canonical AI message representation for conversations across all DevLab models.
 */
export const AIMessageSchema = z.object({
  /** Conversational role of the turn */
  role: z.enum([
    MessageRole.SYSTEM,
    MessageRole.USER,
    MessageRole.ASSISTANT,
    MessageRole.TOOL,
  ]),
  /** Primary text content of the message */
  content: z.string().describe("Primary text content of the message turn"),
  /** Optional author username, agent name, or tool identifier */
  name: z
    .string()
    .optional()
    .describe("Optional author name or tool identifier"),
  /** Optional structured tool calls emitted by the model */
  toolCalls: z
    .array(ToolCallSchema)
    .optional()
    .describe("Tool calls invoked by the model"),
  /** Associated tool call ID when role is TOOL */
  toolCallId: z
    .string()
    .optional()
    .describe("Associated tool call ID for TOOL responses"),
});

export type AIMessage = z.infer<typeof AIMessageSchema>;

/**
 * Constructs a validated user message turn.
 *
 * @example
 * ```typescript
 * const msg = createUserMessage("Analyze this quarterly report", "analyst_bob");
 * ```
 *
 * @param content - User's textual query or prompt.
 * @param name - Optional author identifier for multi-user chat sessions.
 * @returns Fully constructed AIMessage.
 */
export function createUserMessage(content: string, name?: string): AIMessage {
  return { role: MessageRole.USER, content, name };
}

/**
 * Constructs a validated system prompt turn.
 *
 * @example
 * ```typescript
 * const sys = createSystemMessage("You are an autonomous SRE triage specialist.");
 * ```
 *
 * @param content - System instructions establishing model behavior.
 * @returns Fully constructed AIMessage.
 */
export function createSystemMessage(content: string): AIMessage {
  return { role: MessageRole.SYSTEM, content };
}

/**
 * Constructs a validated assistant completion turn.
 *
 * @example
 * ```typescript
 * const assistant = createAssistantMessage("I will check the Kubernetes logs for you.");
 * ```
 *
 * @param content - Assistant text response.
 * @param toolCalls - Optional tool invocations requested by the model.
 * @returns Fully constructed AIMessage.
 */
export function createAssistantMessage(
  content: string,
  toolCalls?: ToolCall[],
): AIMessage {
  return { role: MessageRole.ASSISTANT, content, toolCalls };
}

/**
 * Constructs a validated tool result message turn.
 *
 * @example
 * ```typescript
 * const toolResult = createToolResultMessage("call_123", JSON.stringify({ status: "healthy" }), "healthcheck");
 * ```
 *
 * @param toolCallId - ID of the originating tool invocation.
 * @param content - Stringified output of the tool execution.
 * @param name - Optional name of the tool executed.
 * @returns Fully constructed AIMessage.
 */
export function createToolResultMessage(
  toolCallId: string,
  content: string,
  name?: string,
): AIMessage {
  return { role: MessageRole.TOOL, content, toolCallId, name };
}
