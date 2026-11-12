/**
 * @file packages/cli/src/utils/net.util.ts
 * @description TCP socket inspection and HTTP health check utilities.
 * @author yuva.devlab@gmail.com
 */

import net from "node:net";

/**
 * Result of testing a TCP port.
 */
export interface PortCheckResult {
  readonly port: number;
  readonly inUse: boolean;
  readonly error?: string;
}

/**
 * Checks whether a given TCP port is currently open and accepting connections.
 */
export async function isPortInUse(
  port: number,
  host = "127.0.0.1",
  timeoutMs = 500,
): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let status = false;

    socket.setTimeout(timeoutMs);

    socket.once("connect", () => {
      status = true;
      socket.destroy();
    });

    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });

    socket.once("error", () => {
      socket.destroy();
      resolve(false);
    });

    socket.once("close", () => {
      resolve(status);
    });

    socket.connect(port, host);
  });
}

/**
 * Detailed outcome of an HTTP health evaluation.
 */
export interface HttpHealthOutcome {
  readonly ok: boolean;
  readonly status: number;
  readonly latencyMs: number;
  readonly version?: string;
  readonly error?: string;
}

/**
 * Probes an HTTP health endpoint and measures latency and version payload.
 */
export async function probeHttpHealth(
  url: string,
  timeoutMs = 2000,
): Promise<HttpHealthOutcome> {
  const start = performance.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    const latencyMs = Math.round(performance.now() - start);
    clearTimeout(timer);

    let version: string | undefined;
    try {
      const json = (await response.json()) as Record<string, unknown>;
      if (typeof json?.version === "string") {
        version = json.version;
      }
    } catch {
      // Non-JSON or plain text health payload
    }

    return {
      ok: response.ok,
      status: response.status,
      latencyMs,
      version,
    };
  } catch (error) {
    clearTimeout(timer);
    const latencyMs = Math.round(performance.now() - start);
    const message =
      error instanceof Error && error.name === "AbortError"
        ? `Timeout after ${timeoutMs}ms`
        : error instanceof Error
          ? error.message
          : String(error);

    return {
      ok: false,
      status: 0,
      latencyMs,
      error: message,
    };
  }
}
