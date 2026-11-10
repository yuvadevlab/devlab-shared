/**
 * @file packages/logger/src/formatter.ts
 * @description Formatters for human-readable colorized text and canonical JSON telemetry.
 * @author yuva.devlab@gmail.com
 */

import type { LogLevel, CorrelationContext, CanonicalLogEvent } from "./types";

const ANSI_COLORS: Record<LogLevel, string> = {
  debug: "\x1b[35m", // Magenta
  info: "\x1b[32m", // Green
  warn: "\x1b[33m", // Yellow
  error: "\x1b[31m", // Red
};

const COLOR_RESET = "\x1b[0m";

/**
 * Builds formatted context tags string: e.g. "[req:4f8e21a][usr:usr_A][ten:tenant_prod]"
 */
export function buildContextTags(context?: CorrelationContext): string {
  if (!context) return "";
  const parts: string[] = [];

  if (context.requestId) {
    const shortReq =
      context.requestId.length > 8
        ? context.requestId.slice(0, 8)
        : context.requestId;
    parts.push(`[req:${shortReq}]`);
  }
  if (context.userId && context.userId !== "anonymous") {
    const shortUser =
      context.userId.length > 12 ? context.userId.slice(0, 12) : context.userId;
    parts.push(`[usr:${shortUser}]`);
  }
  if (context.tenantId) {
    parts.push(`[ten:${context.tenantId}]`);
  }

  return parts.length > 0 ? ` ${parts.join("")}` : "";
}

/**
 * Formats a log line into a colorized, human-readable, greppable string.
 */
export function formatTextMessage(
  level: LogLevel,
  contextName: string | undefined,
  correlation: CorrelationContext | undefined,
  message: unknown,
  ...extraParams: unknown[]
): string {
  const timestamp = new Date().toISOString();
  const color = ANSI_COLORS[level] || "";
  const levelStr = `${color}${level.toUpperCase()}${COLOR_RESET}`;
  const ctx = contextName ? ` [${contextName}]` : "";
  const tags = buildContextTags(correlation);

  const extraStr =
    extraParams.length > 0
      ? ` ${extraParams.map((p) => (typeof p === "object" ? JSON.stringify(p) : String(p))).join(" ")}`
      : "";

  return `[${timestamp}] ${levelStr}${ctx}${tags}: ${message}${extraStr}`;
}

/**
 * Formats a log message into the canonical JSON telemetry event for devlab-logs.
 */
export function formatJsonMessage(
  level: LogLevel,
  contextName: string | undefined,
  correlation: CorrelationContext | undefined,
  serviceName: string,
  message: unknown,
  ...extraParams: unknown[]
): CanonicalLogEvent {
  const timestamp = new Date().toISOString();
  const stream: "stdout" | "stderr" = level === "error" ? "stderr" : "stdout";

  let metadata: Record<string, unknown> = {};
  if (extraParams.length > 0) {
    for (const param of extraParams) {
      if (
        typeof param === "object" &&
        param !== null &&
        !Array.isArray(param)
      ) {
        metadata = { ...metadata, ...(param as Record<string, unknown>) };
      } else if (param !== undefined) {
        metadata.extra = metadata.extra
          ? [...(metadata.extra as unknown[]), param]
          : [param];
      }
    }
  }

  return {
    timestamp,
    level,
    service: correlation?.serviceName || serviceName,
    stream,
    context: contextName,
    traceId: correlation?.traceId,
    requestId: correlation?.requestId,
    userId: correlation?.userId,
    tenantId: correlation?.tenantId,
    message: typeof message === "string" ? message : JSON.stringify(message),
    metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
  };
}
