/**
 * @file packages/logger/src/logger.ts
 * @description Isomorphic Logger class with automatic correlation context extraction and dual formatting.
 * @author yuva.devlab@gmail.com
 */

/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { LogLevel, LoggerConfig, LogFormat } from "./types";
import {
  DEFAULT_APP_NAME,
  DEFAULT_LOG_ENABLED,
  DEFAULT_LOG_FORMAT,
  DEFAULT_LOG_LEVEL,
} from "./constants";
import { getCorrelationContext } from "./context";
import { formatTextMessage, formatJsonMessage } from "./formatter";
import {
  createFileTransport,
  HttpBatchTransport,
  LEVEL_RANK,
} from "./transports";

/** Parse raw env string to a valid LogLevel */
export function parseLogLevel(raw?: string): LogLevel {
  if (!raw) return DEFAULT_LOG_LEVEL;
  const v = raw.toLowerCase().trim();
  return ["debug", "info", "warn", "error"].includes(v)
    ? (v as LogLevel)
    : DEFAULT_LOG_LEVEL;
}

/**
 * Maps a consumer-supplied environment variable dictionary into a typed LoggerConfig.
 * Never accesses ambient process.env directly.
 *
 * @param env - Consumer environment dictionary (e.g. process.env).
 * @returns Mapped LoggerConfig options.
 */
export function resolveLoggerConfig(
  env: Record<string, string | undefined> = {},
): LoggerConfig {
  return {
    level: env.LOG_LEVEL ? parseLogLevel(env.LOG_LEVEL) : DEFAULT_LOG_LEVEL,
    format:
      (env.LOG_FORMAT as LogFormat) ||
      (env.NODE_ENV === "production" ? "json" : DEFAULT_LOG_FORMAT),
    enabled: env.LOG_ENABLED
      ? env.LOG_ENABLED !== "false"
      : DEFAULT_LOG_ENABLED,
    file: env.LOG_FILE,
    persist: env.LOG_PERSIST === "true",
    serviceName: env.SERVICE_NAME ?? DEFAULT_APP_NAME,
    ingestUrl: env.DEVLAB_LOGS_INGEST_URL,
    ingestApiKey: env.DEVLAB_LOGS_API_KEY,
  };
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
      level: config?.level ?? DEFAULT_LOG_LEVEL,
      format: config?.format ?? DEFAULT_LOG_FORMAT,
      enabled: config?.enabled ?? DEFAULT_LOG_ENABLED,
      file: config?.file,
      persist: config?.persist ?? false,
      serviceName: config?.serviceName ?? DEFAULT_APP_NAME,
      ingestUrl: config?.ingestUrl,
      ingestApiKey: config?.ingestApiKey,
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
    if (
      LEVEL_RANK[level] < LEVEL_RANK[this.config.level || DEFAULT_LOG_LEVEL]
    ) {
      return;
    }

    const correlation = getCorrelationContext();
    const serviceName =
      correlation?.serviceName || this.config.serviceName || DEFAULT_APP_NAME;

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
