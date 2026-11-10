/**
 * @file packages/logger/src/middleware.ts
 * @description HTTP request logging and correlation tracing middleware for Express and NestJS.
 * @author yuva.devlab@gmail.com
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { randomUUID } from "node:crypto";
import { Logger } from "./logger";
import { runWithContext } from "./context";
import type { CorrelationContext, LogLevel } from "./types";

/**
 * Express / NestJS middleware that initializes the AsyncLocalStorage correlation context.
 */
export function correlationMiddleware(options?: { serviceName?: string }) {
  const serviceName =
    options?.serviceName || process.env.SERVICE_NAME || "devlab-service";

  return (req: any, res: any, next: () => void) => {
    // 1. Extract or generate trace / correlation ID
    const incomingTrace =
      req.headers["x-correlation-id"] ||
      req.headers["x-trace-id"] ||
      (req.headers["traceparent"]
        ? (req.headers["traceparent"] as string).split("-")[1]
        : undefined);
    const traceId =
      typeof incomingTrace === "string" && incomingTrace
        ? incomingTrace
        : randomUUID();

    // 2. Extract or generate request ID
    const incomingReqId = req.headers["x-request-id"];
    const requestId =
      typeof incomingReqId === "string" && incomingReqId
        ? incomingReqId
        : randomUUID();

    // 3. Extract tenant and user if injected upstream by gateway
    const rawTenant = req.headers["x-tenant-id"];
    const tenantId =
      typeof rawTenant === "string" ? rawTenant.trim() : undefined;

    const rawUser = req.headers["x-user-id"];
    const userId = typeof rawUser === "string" ? rawUser.trim() : undefined;

    const forwardedFor = req.headers["x-forwarded-for"];
    const clientIp =
      typeof forwardedFor === "string"
        ? forwardedFor.split(",")[0]?.trim() || "127.0.0.1"
        : req.socket?.remoteAddress || "127.0.0.1";

    // 4. Set outbound headers for clients and downstream services
    if (res.setHeader) {
      res.setHeader("x-request-id", requestId);
      res.setHeader("x-correlation-id", traceId);
    }

    const context: CorrelationContext = {
      traceId,
      requestId,
      userId: userId || "anonymous",
      tenantId,
      clientIp,
      serviceName,
    };

    runWithContext(context, () => {
      next();
    });
  };
}

/**
 * Express middleware that logs incoming HTTP requests with latency and status code.
 */
export function requestLogger(loggerInstance: Logger = new Logger("HTTP")) {
  return (req: any, res: any, next: () => void) => {
    const start = Date.now();
    const { method, originalUrl } = req;

    res.on("finish", () => {
      const duration = Date.now() - start;
      const { statusCode } = res;

      let level: LogLevel = "info";
      if (statusCode >= 500) {
        level = "error";
      } else if (statusCode >= 400) {
        level = "warn";
      }

      const msg = `${method} ${originalUrl} ${statusCode} - ${duration}ms`;
      if (level === "error") {
        loggerInstance.error(msg);
      } else if (level === "warn") {
        loggerInstance.warn(msg);
      } else {
        loggerInstance.info(msg);
      }
    });

    next();
  };
}
