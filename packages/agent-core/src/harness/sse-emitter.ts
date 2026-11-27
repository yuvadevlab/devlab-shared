/**
 * @file packages/agent-core/src/harness/sse-emitter.ts
 * @description Cloud Run-safe Server-Sent Event (SSE) emitter with HTTP 200 enforcement and disconnect cancellation.
 * @module @yuva-devlab/agent-core/harness/sse-emitter
 */

import {
  AgentErrorCode,
  AgentStreamEventType,
  SSE_HTTP_STATUS_OK,
  SSE_RESPONSE_HEADERS,
  formatSseFrame,
  type AgentStreamEvent,
} from "@yuva-devlab/agent-protocol";

/** Minimal HTTP response interface compatible with Express, NestJS, and Node ServerResponse. */
export interface SseWritableResponse {
  statusCode: number;
  writableEnded?: boolean;
  setHeader: (name: string, value: string) => void;
  flushHeaders?: () => void;
  write: (chunk: string) => boolean | void;
  flush?: () => void;
  end: () => void;
  on?: (event: string, listener: () => void) => void;
}

/** Minimal HTTP request interface for client-disconnect detection. */
export interface SseDisconnectSource {
  on?: (event: string, listener: () => void) => void;
}

/** Controller returned by {@link createAgentSseEmitter}. */
export interface AgentSseStream {
  /** Emit one SSE event frame and flush immediately. */
  emit: (event: AgentStreamEvent) => void;
  /** Emit terminal ERROR + DONE frames if stream is still open. */
  fail: (error: unknown, code?: string) => void;
  /** Emit DONE (if not already sent) and close the response stream. */
  end: () => void;
  /** Aborts when the client disconnects before the stream ends. */
  signal: AbortSignal;
  /** Returns true after the stream has closed or client disconnected. */
  isClosed: () => boolean;
}

/**
 * Initializes an unbuffered HTTP 200 OK SSE stream and returns a typed emitter.
 * Enforces status 200 before flushing headers so reverse proxies (such as Cloud Run / GFE)
 * do not buffer the stream until completion.
 *
 * @param res - HTTP response object.
 * @param req - Optional HTTP request object for disconnect detection.
 * @returns Typed {@link AgentSseStream} controller.
 */
export function createAgentSseEmitter(
  res: SseWritableResponse,
  req?: SseDisconnectSource,
): AgentSseStream {
  const abortController = new AbortController();
  let closed = false;
  let sentDone = false;

  res.statusCode = SSE_HTTP_STATUS_OK;
  res.setHeader(
    SSE_RESPONSE_HEADERS.CONTENT_TYPE,
    SSE_RESPONSE_HEADERS.CONTENT_TYPE_VALUE,
  );
  res.setHeader(
    SSE_RESPONSE_HEADERS.CACHE_CONTROL,
    SSE_RESPONSE_HEADERS.CACHE_CONTROL_VALUE,
  );
  res.setHeader(
    SSE_RESPONSE_HEADERS.CONNECTION,
    SSE_RESPONSE_HEADERS.CONNECTION_VALUE,
  );
  res.setHeader(
    SSE_RESPONSE_HEADERS.ACCEL_BUFFERING,
    SSE_RESPONSE_HEADERS.ACCEL_BUFFERING_VALUE,
  );
  res.flushHeaders?.();

  const onClose = (): void => {
    if (closed) return;
    closed = true;
    abortController.abort();
  };

  req?.on?.("close", onClose);
  res.on?.("close", onClose);

  const emit = (event: AgentStreamEvent): void => {
    if (closed || res.writableEnded) return;
    if (event.type === AgentStreamEventType.DONE) {
      sentDone = true;
    }
    res.write(formatSseFrame(event));
    res.flush?.();
  };

  const fail = (
    error: unknown,
    code: string = AgentErrorCode.AGENT_ERROR,
  ): void => {
    if (closed || res.writableEnded) return;
    const message =
      error instanceof Error ? error.message : String(error || "Agent failure");
    emit({ type: AgentStreamEventType.ERROR, error: message, code });
    if (!sentDone) {
      emit({ type: AgentStreamEventType.DONE });
    }
  };

  const end = (): void => {
    if (!closed && !res.writableEnded) {
      if (!sentDone) {
        emit({ type: AgentStreamEventType.DONE });
      }
      closed = true;
      res.end();
    }
  };

  return {
    emit,
    fail,
    end,
    signal: abortController.signal,
    isClosed: () => closed || Boolean(res.writableEnded),
  };
}
