/**
 * @file packages/logger/src/types.ts
 * @description Canonical type definitions for Yuva DevLab structured logging and telemetry.
 * @author yuva.devlab@gmail.com
 */

/** Allowed log severity levels */
export type LogLevel = "debug" | "info" | "warn" | "error";

/** Output formatting modes */
export type LogFormat = "text" | "json";

/**
 * Universal correlation context propagated across asynchronous execution boundaries.
 */
export interface CorrelationContext {
  /** Global distributed trace identifier */
  traceId: string;
  /** Unique transaction request identifier */
  requestId: string;
  /** Authenticated user identity identifier */
  userId?: string;
  /** Tenant / organization partition identifier */
  tenantId?: string;
  /** Client IP address */
  clientIp?: string;
  /** Originating service name */
  serviceName?: string;
  /** Arbitrary context key-value pairs */
  [key: string]: unknown;
}

/**
 * Configuration options for Logger instances.
 */
export interface LoggerConfig {
  /** Minimum logging level (default: "info" or LOG_LEVEL env) */
  level?: LogLevel;
  /** Formatting mode (default: "text" in dev, "json" in prod or LOG_FORMAT env) */
  format?: LogFormat;
  /** Global enable switch (default: true or LOG_ENABLED env) */
  enabled?: boolean;
  /** Optional file path for file transport */
  file?: string;
  /** Originating service name */
  serviceName?: string;
  /** Whether to persist logs to disk */
  persist?: boolean;
  /** Optional devlab-logs HTTP ingestion endpoint (e.g. http://localhost:4003) */
  ingestUrl?: string;
  /** Optional ingestion API key for devlab-logs */
  ingestApiKey?: string;
}

/**
 * Canonical JSON telemetry payload matching the DevLab telemetry ingestion standard.
 */
export interface CanonicalLogEvent {
  timestamp: string;
  level: LogLevel;
  service: string;
  stream: "stdout" | "stderr";
  context?: string;
  traceId?: string;
  requestId?: string;
  userId?: string;
  tenantId?: string;
  message: string;
  durationMs?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Method decorator configuration options.
 */
export interface LogMethodOptions {
  /** Whether to log method parameters on entry (default: true) */
  logArgs?: boolean;
  /** Whether to log execution duration in milliseconds on exit (default: true) */
  logDuration?: boolean;
  /** Log level for normal execution (default: "info") */
  level?: LogLevel;
  /** Custom label override (defaults to ClassName.methodName) */
  label?: string;
}
