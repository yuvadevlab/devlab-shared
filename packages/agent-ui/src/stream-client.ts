/**
 * @file packages/agent-ui/src/stream-client.ts
 * @description Fetch SSE stream reader for @yuva-devlab/agent-ui.
 * @module @yuva-devlab/agent-ui/stream-client
 */

import type { AgentStreamEvent } from "@yuva-devlab/agent-protocol";
import type { PromptInputAttachmentItem } from "@yuva-devlab/ui";
import { parseAgentSseChunk } from "./sse-parser";
import type { AgentChatTransportConfig } from "./types";

/** Builds the POST JSON body for a Gateway run, honoring consumer `buildBody` overrides. */
export function buildGatewayRequestBody(params: {
  transport: AgentChatTransportConfig;
  prompt: string;
  messages: Array<{ role: string; content: string }>;
  threadId?: string;
  modelId?: string;
  attachments: PromptInputAttachmentItem[];
}): Record<string, unknown> {
  if (params.transport.buildBody) {
    return params.transport.buildBody({
      prompt: params.prompt,
      messages: params.messages,
      threadId: params.threadId,
      modelId: params.modelId,
      attachments: params.attachments,
    });
  }
  return {
    appSlug: params.transport.appSlug,
    profileSlug: params.transport.profileSlug,
    prompt: params.prompt,
    messages: params.messages,
    threadId: params.threadId,
    overrides: params.modelId ? { modelId: params.modelId } : undefined,
  };
}

/** Parameters for {@link streamAgentGateway}. */
export interface StreamAgentGatewayParams {
  url: string;
  headers: Record<string, string>;
  body: Record<string, unknown>;
  signal: AbortSignal;
  onEvent: (event: AgentStreamEvent) => void;
}

/**
 * Executes a POST SSE stream request and dispatches decoded {@link AgentStreamEvent} frames.
 */
export async function streamAgentGateway({
  url,
  headers,
  body,
  signal,
  onEvent,
}: StreamAgentGatewayParams): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok || !response.body) {
    throw new Error(`Gateway error (${response.status})`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let sseBuffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    sseBuffer += decoder.decode(value, { stream: true });
    const { events, remainder } = parseAgentSseChunk(sseBuffer);
    sseBuffer = remainder;
    for (const event of events) {
      onEvent(event);
    }
  }
}

/** Sends a confirmation decision to a Gateway HITL endpoint. */
export async function postAgentConfirmation(params: {
  url: string;
  headers: Record<string, string>;
  actionId: string;
  approved: boolean;
  threadId?: string;
}): Promise<void> {
  await fetch(params.url, {
    method: "POST",
    headers: params.headers,
    body: JSON.stringify({
      actionId: params.actionId,
      approved: params.approved,
      threadId: params.threadId,
    }),
  });
}
