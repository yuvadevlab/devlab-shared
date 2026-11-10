/**
 * @file packages/logger/src/logger.ts
 * @description Isomorphic Logger class with automatic correlation context extraction and dual formatting.
 * @author yuva.devlab@gmail.com
 */

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LogLevel, LoggerConfig, LogFormat } from "./types";
import { getCorrelationContext } from "./context";
import { formatTextMessage, formatJsonMessage } from "./formatter";
import {
  createFileTransport,
  HttpBatchTransport,
  LEVEL_RANK,
} from "./transports";

/** Parse raw env string to a valid LogLevel */
function parseLogLevel(raw?: string): LogLevel {
  if (!raw) return "info";
  const v = raw.toLowerCase().trim();
  return ["debug", "info", "warn", "error"].includes(v)
    ? (v as LogLevel)
    : "info";
}

/**
 * Universal Logger for Yuva DevLab applications.
 */
export class Logger {
  context?: string;
  private readonly config: LoggerConfig;
  private readonly fileStream: NodeJS.WritableStream | null = null;
  private readonly httpBatcher: HttpBatchTransport | null = null;

  constructor(context?: string, config?: LoggerConfig) {
    this.context = context;
    this.config = {
      level: config?.level ?? parseLogLevel(process.env.LOG_LEVEL),
      format:
        config?.format ??
        ((process.env.LOG_FORMAT as LogFormat) ||
          (process.env.NODE_ENV === "production" ? "json" : "text")),
      enabled:
        config?.enabled ??
        (process.env.LOG_ENABLED ? process.env.LOG_ENABLED !== "false" : true),
      file: config?.file ?? process.env.LOG_FILE,
      persist: config?.persist ?? process.env.LOG_PERSIST === "true",
      serviceName:
        config?.serviceName ?? process.env.SERVICE_NAME ?? "devlab-app",
      ingestUrl: config?.ingestUrl ?? process.env.DEVLAB_LOGS_INGEST_URL,
      ingestApiKey: config?.ingestApiKey ?? process.env.DEVLAB_LOGS_API_KEY,
    };

    if (this.config.file && this.config.persist) {
      this.fileStream = createFileTransport(this.config.file);
    }

    if (this.config.ingestUrl) {
      this.httpBatcher = new HttpBatchTransport(
        this.config.ingestUrl,
        this.config.ingestApiKey,
      );
    }
  }

  /**
   * Backwards-compatible formatting helper returning human-readable text.
   */
  formatMessage(
    level: LogLevel,
    message: any,
    ...optionalParams: any[]
  ): string {
    const correlation = getCorrelationContext();
    return formatTextMessage(
      level,
      this.context,
      correlation,
      message,
      ...optionalParams,
    );
  }

  private write(level: LogLevel, message: any, ...extra: any[]): void {
    if (!this.config.enabled) return;
    if (LEVEL_RANK[level] < LEVEL_RANK[this.config.level || "info"]) return;
    if (
      level === "debug" &&
      process.env.NODE_ENV === "production" &&
      !process.env.LOG_DEBUG_FORCE
    ) {
      return;
    }

    const correlation = getCorrelationContext();
    const serviceName =
      correlation?.serviceName || this.config.serviceName || "devlab-app";

    if (this.httpBatcher) {
      const canonical = formatJsonMessage(
        level,
        this.context,
        correlation,
        serviceName,
        message,
        ...extra,
      );
      this.httpBatcher.push(canonical);
    }

    if (this.config.format === "json") {
      const canonical = formatJsonMessage(
        level,
        this.context,
        correlation,
        serviceName,
        message,
        ...extra,
      );
      const jsonLine = JSON.stringify(canonical);
      if (level === "error") {
        console.error(jsonLine);
      } else if (level === "warn") {
        console.warn(jsonLine);
      } else {
        console.log(jsonLine);
      }
      if (this.fileStream) {
        (this.fileStream as any).write(jsonLine + "\n");
      }
      return;
    }

    const textLine = formatTextMessage(
      level,
      this.context,
      correlation,
      message,
      ...extra,
    );
    const consoleFn =
      {
        debug: console.debug,
        info: console.log,
        warn: console.warn,
        error: console.error,
      }[level] || console.log;

    consoleFn(textLine);
    if (this.fileStream) {
      (this.fileStream as any).write(textLine + "\n");
    }
  }

  log(message: any, ...optionalParams: any[]): void {
    this.info(message, ...optionalParams);
  }

  info(message: any, ...optionalParams: any[]): void {
    this.write("info", message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): void {
    this.write("warn", message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): void {
    this.write("error", message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): void {
    this.write("debug", message, ...optionalParams);
  }
}

/**
 * Builds a configured Logger instance from configuration options and environment.
 */
export function createLogger(config?: LoggerConfig): Logger {
  return new Logger(undefined, config);
}

/**
 * Wraps an existing base Logger with new configuration overrides.
 */
export function loggerWithConfig(base: Logger, config?: LoggerConfig): Logger {
  const enhanced = new Logger(base.context, config);
  return enhanced;
}

/** Default singleton logger instance */
export const logger = createLogger();
