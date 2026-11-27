/**
 * @file packages/agent-core/tests/harness.test.ts
 * @description Unit tests for SSE emitter, ToolPlanStreamFilter, parallel tool batching, and policy clamping.
 */

import { describe, expect, it, vi } from "vitest";
import { AgentStreamEventType } from "@yuva-devlab/agent-protocol";
import {
  AgentCreativityPreset,
  AppAiPolicySchema,
  ToolPlanStreamFilter,
  createAgentSseEmitter,
  executeToolBatch,
  resolveEffectivePolicy,
} from "./index";

describe("createAgentSseEmitter", () => {
  it("enforces HTTP 200, sets unbuffered headers, emits frames, and aborts on close", () => {
    const headers: Record<string, string> = {};
    const chunks: string[] = [];
    let closeHandler: (() => void) | undefined;

    const res = {
      statusCode: 201,
      writableEnded: false,
      setHeader: (k: string, v: string) => {
        headers[k] = v;
      },
      flushHeaders: vi.fn(),
      write: (chunk: string) => {
        chunks.push(chunk);
        return true;
      },
      flush: vi.fn(),
      end: vi.fn(() => {
        res.writableEnded = true;
      }),
      on: (evt: string, cb: () => void) => {
        if (evt === "close") closeHandler = cb;
      },
    };

    const stream = createAgentSseEmitter(res);
    expect(res.statusCode).toBe(200);
    expect(headers["Content-Type"]).toBe("text/event-stream; charset=utf-8");
    expect(headers["X-Accel-Buffering"]).toBe("no");
    expect(res.flushHeaders).toHaveBeenCalledTimes(1);

    stream.emit({ type: AgentStreamEventType.RUN, runId: "run-1" });
    expect(chunks[0]).toBe('data: {"type":"run","runId":"run-1"}\n\n');

    closeHandler?.();
    expect(stream.signal.aborted).toBe(true);
    expect(stream.isClosed()).toBe(true);
  });
});

describe("ToolPlanStreamFilter", () => {
  it("suppresses <tool_plan> blocks and orphan closing tags while streaming visible prose", () => {
    const filter = new ToolPlanStreamFilter();
    const out =
      filter.push("Hello <tool") +
      filter.push('_plan>{"tool_calls":[]}</tool_plan> world') +
      filter.push("</tool_plan>!") +
      filter.flush();
    expect(out).toBe("Hello  world!");
  });
});

describe("executeToolBatch", () => {
  it("runs read-only batches concurrently and logs parallel execution", async () => {
    const events: unknown[] = [];
    const outcomes = await executeToolBatch(
      [
        { name: "goals.list", arguments: {} },
        { name: "budgets.list", arguments: {} },
      ],
      () => true,
      (e) => events.push(e),
      async (call) => ({ call, result: { ok: true } }),
    );
    expect(outcomes).toHaveLength(2);
    expect(events).toHaveLength(1);
  });
});

describe("resolveEffectivePolicy", () => {
  it("clamps maxTurns to the published ceiling and maps creativity presets", () => {
    const base = AppAiPolicySchema.parse({
      appId: "finai",
      profileSlug: "finai-agent",
      maxTurns: 6,
    });
    const resolved = resolveEffectivePolicy(base, {
      creativityPreset: AgentCreativityPreset.CREATIVE,
      maxTurns: 99,
    });
    expect(resolved.temperature).toBe(0.8);
    expect(resolved.maxTurns).toBe(6);
  });
});
