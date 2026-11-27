/**
 * @file packages/agent-ui/src/sse-parser.spec.ts
 * @description Unit tests for SSE chunk decoding and transparent assistant turn event reduction.
 */

import { describe, expect, it } from "vitest";
import { AgentStreamEventType } from "@yuva-devlab/agent-protocol";
import { AgentMessageRole } from "./enums";
import { parseAgentSseChunk, reduceAssistantMessageEvent } from "./sse-parser";
import type { AgentChatMessageItem } from "./types";

function createEmptyAssistantMessage(): AgentChatMessageItem {
  return {
    id: "ast-1",
    role: AgentMessageRole.ASSISTANT,
    content: "",
    createdAt: "2026-11-28T00:00:00.000Z",
  };
}

describe("parseAgentSseChunk", () => {
  it("parses complete SSE frames and preserves partial trailing buffer", () => {
    const chunk =
      'data: {"type":"token","content":"Hello"}\n\n' +
      'data: {"type":"reasoning","content":"Thinking..."}\n\n' +
      'data: {"type":"token","content":"partial';

    const result = parseAgentSseChunk(chunk);
    expect(result.events).toHaveLength(2);
    expect(result.events[0]).toEqual({
      type: AgentStreamEventType.TOKEN,
      content: "Hello",
    });
    expect(result.remainder).toBe('data: {"type":"token","content":"partial');
  });
});

describe("reduceAssistantMessageEvent", () => {
  it("tracks reasoning, plan steps, tool calls, confirmations, sources, and usage", () => {
    let msg = createEmptyAssistantMessage();

    msg = reduceAssistantMessageEvent(msg, {
      type: AgentStreamEventType.REASONING,
      content: "Checking portfolio",
    }).message;
    expect(msg.reasoning).toBe("Checking portfolio");
    expect(msg.isReasoningStreaming).toBe(true);

    msg = reduceAssistantMessageEvent(msg, {
      type: AgentStreamEventType.PLAN,
      title: "Analysis Plan",
      steps: [{ id: "1", title: "Fetch holdings", status: "running" }],
    }).message;
    expect(msg.plan?.steps).toHaveLength(1);

    msg = reduceAssistantMessageEvent(msg, {
      type: AgentStreamEventType.TOOL_CALL,
      tool: "fetch_holdings",
      runId: "run-1",
      callId: "call-1",
    }).message;
    msg = reduceAssistantMessageEvent(msg, {
      type: AgentStreamEventType.TOOL_RESULT,
      tool: "fetch_holdings",
      callId: "call-1",
      ok: true,
      summary: "Loaded 12 positions",
      durationMs: 42,
    }).message;
    expect(msg.toolCalls?.[0]?.status).toBe("success");
    expect(msg.toolCalls?.[0]?.durationMs).toBe(42);

    const conf = reduceAssistantMessageEvent(msg, {
      type: AgentStreamEventType.CONFIRMATION_REQUIRED,
      actionId: "act-1",
      tool: "rebalance_order",
      card: { type: "confirmation", title: "Confirm Rebalance" },
    });
    expect(conf.awaitingApproval).toBe(true);
    msg = conf.message;

    msg = reduceAssistantMessageEvent(msg, {
      type: AgentStreamEventType.SOURCES,
      items: [
        {
          id: "s1",
          index: 1,
          title: "Holdings DB",
          url: "https://example.com",
        },
      ],
    }).message;
    msg = reduceAssistantMessageEvent(msg, {
      type: AgentStreamEventType.USAGE,
      tokensIn: 120,
      tokensOut: 85,
      costUsd: 0.0012,
    }).message;

    expect(msg.sources).toHaveLength(1);
    expect(msg.usage?.costUsd).toBe(0.0012);
  });
});
