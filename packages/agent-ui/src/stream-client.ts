/**
 * @file packages/agent-ui/src/stream-client.ts
 * @description Fetch SSE stream reader for @yuva-devlab/agent-ui.
 * @module @yuva-devlab/agent-ui/stream-client
 */

import type { AgentStreamEvent } from "@yuva-devlab/agent-protocol";
import { parseAgentSseChunk } from "./sse-parser";

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
