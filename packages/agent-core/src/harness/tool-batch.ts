/**
 * @file packages/agent-core/src/harness/tool-batch.ts
 * @description Parallel read-only tool batch executor for agent turns.
 * @module @yuva-devlab/agent-core/harness/tool-batch
 */

import {
  AgentRunLogLevel,
  AgentStreamEventType,
  type AgentStreamEvent,
} from "@yuva-devlab/agent-protocol";

/** Minimal tool call shape expected by {@link executeToolBatch}. */
export interface ToolCallDescriptor {
  id?: string;
  name: string;
  arguments: Record<string, unknown>;
}

/** Result tuple returned for each executed tool call. */
export interface ToolBatchOutcome<TCall extends ToolCallDescriptor> {
  call: TCall;
  result: Record<string, unknown>;
}

/**
 * Executes a batch of tool calls in parallel when every tool in the batch is read-only,
 * or sequentially when any tool mutates state or requires confirmation.
 *
 * @param toolCalls - Tool calls requested in the current model turn.
 * @param isReadOnly - Predicate returning true if a tool name is safe to run concurrently.
 * @param emit - SSE event emitter for live batch logging.
 * @param dispatchOne - Executor callback for a single tool call.
 * @returns Ordered outcomes for all tool calls in the batch.
 */
export async function executeToolBatch<TCall extends ToolCallDescriptor>(
  toolCalls: TCall[],
  isReadOnly: ((toolName: string) => boolean) | undefined,
  emit: (event: AgentStreamEvent) => void,
  dispatchOne: (call: TCall) => Promise<ToolBatchOutcome<TCall>>,
): Promise<Array<ToolBatchOutcome<TCall>>> {
  const canParallelize =
    toolCalls.length > 1 &&
    toolCalls.every((call) => isReadOnly?.(call.name) ?? false);

  if (canParallelize) {
    emit({
      type: AgentStreamEventType.LOG,
      level: AgentRunLogLevel.TOOL,
      message: `Executing ${toolCalls.length} read tools in parallel`,
      detail: toolCalls.map((c) => c.name).join(", "),
    });
    return Promise.all(toolCalls.map((call) => dispatchOne(call)));
  }

  const outcomes: Array<ToolBatchOutcome<TCall>> = [];
  for (const call of toolCalls) {
    outcomes.push(await dispatchOne(call));
  }
  return outcomes;
}
