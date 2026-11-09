/**
 * @file packages/supervisor/src/readiness-prober.ts
 * @description Asynchronous health verification prober for managed application endpoints.
 * @module @yuva-devlab/supervisor
 * @author yuva.devlab@gmail.com
 */

export interface ReadinessProbeOptions {
  readonly healthUrl: string;
  readonly timeoutMs: number;
  readonly pollIntervalMs: number;
  readonly signal?: AbortSignal;
}

export interface ReadinessProbeResult {
  readonly ready: boolean;
  readonly elapsedMs: number;
}

/**
 * Periodically polls an HTTP readiness URL until receiving HTTP 200 or timeout.
 */
export class ReadinessProber {
  /**
   * Executes polling against the target application readiness URL.
   */
  static async pollReadiness(
    options: ReadinessProbeOptions,
  ): Promise<ReadinessProbeResult> {
    const start = Date.now();
    const { healthUrl, timeoutMs, pollIntervalMs, signal } = options;

    while (Date.now() - start < timeoutMs) {
      if (signal?.aborted) {
        return { ready: false, elapsedMs: Date.now() - start };
      }

      try {
        const response = await fetch(healthUrl, { signal });
        if (response.ok) {
          return { ready: true, elapsedMs: Date.now() - start };
        }
      } catch {
        // Probe endpoint still initializing; retry after delay
      }

      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    }

    return { ready: false, elapsedMs: Date.now() - start };
  }

  /**
   * Probes endpoint with logging feedback.
   */
  static async verifyReadiness(
    healthUrl: string,
    timeoutMs: number,
    pollIntervalMs: number,
    signal: AbortSignal | undefined,
    onLog: (msg: string, level: "info" | "warn") => void,
  ): Promise<boolean> {
    onLog(`Waiting for readiness probe (${healthUrl})...`, "info");
    const { ready, elapsedMs } = await this.pollReadiness({
      healthUrl,
      timeoutMs,
      pollIntervalMs,
      signal,
    });
    const seconds = (elapsedMs / 1000).toFixed(1);
    const msg = ready
      ? `Readiness verified in ${seconds}s.`
      : `Readiness timed out after ${seconds}s.`;
    onLog(msg, ready ? "info" : "warn");
    return ready;
  }
}
