/**
 * @file packages/logger/src/decorator.ts
 * @description TypeScript method decorator for automatic entry, timing, and error logging.
 * @author yuva.devlab@gmail.com
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Logger } from "./logger";
import type { LogMethodOptions } from "./types";

const SENSITIVE_KEYS = new Set([
  "password",
  "token",
  "secret",
  "clientsecret",
  "clientsecrethash",
  "apikey",
  "authorization",
  "cookie",
]);

/**
 * Recursively masks sensitive fields in arguments before logging.
 */
function sanitizeValue(val: unknown): unknown {
  if (val === null || val === undefined) return val;
  if (typeof val === "string")
    return val.length > 200 ? `${val.slice(0, 200)}...` : val;
  if (typeof val !== "object") return val;

  if (Array.isArray(val)) {
    return val.slice(0, 10).map(sanitizeValue);
  }

  const sanitized: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(val as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase().replace(/[-_]/g, ""))) {
      sanitized[key] = "[REDACTED]";
    } else {
      sanitized[key] = sanitizeValue(value);
    }
  }
  return sanitized;
}

/**
 * Method decorator that automatically logs execution lifecycle, parameters, timing, and errors.
 */
export function LogMethod(options: LogMethodOptions = {}): MethodDecorator {
  const { logArgs = true, logDuration = true, level = "info" } = options;

  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;
    if (typeof originalMethod !== "function") return descriptor;

    const className = target?.constructor?.name || "Service";
    const methodName = String(propertyKey);
    const label = options.label || `${className}.${methodName}`;
    const loggerInstance = new Logger(className);

    descriptor.value = function (...args: any[]) {
      const start = Date.now();
      const argsDisplay =
        logArgs && args.length > 0
          ? ` args: ${JSON.stringify(sanitizeValue(args))}`
          : "";

      (loggerInstance as any)[level](
        `[${label}] Starting execution${argsDisplay}`,
      );

      try {
        const result = originalMethod.apply(this, args);

        if (result && typeof result.then === "function") {
          return result
            .then((res: any) => {
              if (logDuration) {
                const duration = Date.now() - start;
                (loggerInstance as any)[level](
                  `[${label}] Completed successfully (${duration}ms)`,
                );
              }
              return res;
            })
            .catch((err: any) => {
              const duration = Date.now() - start;
              loggerInstance.error(
                `[${label}] Failed after ${duration}ms: ${err?.message || String(err)}`,
                err?.stack,
              );
              throw err;
            });
        }

        if (logDuration) {
          const duration = Date.now() - start;
          (loggerInstance as any)[level](
            `[${label}] Completed successfully (${duration}ms)`,
          );
        }
        return result;
      } catch (err: any) {
        const duration = Date.now() - start;
        loggerInstance.error(
          `[${label}] Failed after ${duration}ms: ${err?.message || String(err)}`,
          err?.stack,
        );
        throw err;
      }
    };

    return descriptor;
  };
}
