/**
 * @file packages/auth-server/src/token/m2m-validator.ts
 * @description In-memory cached Machine-to-Machine API key validator introspecting the auth provider.
 * @module @yuva-devlab/auth-server
 */

import { ForbiddenError, UnauthorizedError } from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import { DEFAULT_API_KEY_CACHE_TTL_MS } from "../constants";
import type { ApiKeyValidationResult, M2mConfig } from "../types";

const logger = loggerWithConfig(new Logger("M2mApiKeyValidator"));

interface CachedApiKey {
  readonly result: ApiKeyValidationResult;
  readonly expiresAt: number;
}

/**
 * Validates machine-to-machine API keys against central authentication server with in-memory caching.
 */
export class M2mApiKeyValidator {
  private readonly authUrl?: string;
  private readonly cacheTtlMs: number;
  private readonly requiredClientId?: string;
  private readonly requiredScopes?: readonly string[];
  private readonly keyCache = new Map<string, CachedApiKey>();

  public constructor(config: Partial<M2mConfig> = {}) {
    this.authUrl =
      config.authUrl ??
      config.portalUrl ??
      process.env.DEVLAB_AUTH_URL ??
      process.env.DEVLAB_PORTAL_URL;
    this.cacheTtlMs = config.cacheTtlMs ?? DEFAULT_API_KEY_CACHE_TTL_MS;
    this.requiredClientId = config.requiredClientId ?? config.requiredAppId;
    this.requiredScopes = config.requiredScopes;
  }

  public async validateKey(rawKey: string): Promise<ApiKeyValidationResult> {
    const trimmed = rawKey.trim();
    if (!trimmed.startsWith("dlk_")) {
      throw new UnauthorizedError("Malformed API key: expected 'dlk_' prefix");
    }

    if (!this.authUrl) {
      throw new UnauthorizedError(
        "M2mApiKeyValidator: authUrl or DEVLAB_AUTH_URL must be configured for validation",
      );
    }

    const now = Date.now();
    const cached = this.keyCache.get(trimmed);
    if (cached && cached.expiresAt > now) {
      return this.enforceKeyConstraints(cached.result);
    }

    try {
      const url = `${this.authUrl}/api/v1/api-keys/validate`;
      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${trimmed}`,
        },
        signal: AbortSignal.timeout(5000),
      });

      if (!res.ok) {
        throw new Error(
          `Authentication validation endpoint returned HTTP ${res.status}`,
        );
      }

      const body = (await res.json()) as ApiKeyValidationResult;
      if (!body.valid) {
        throw new UnauthorizedError(body.reason ?? "Invalid machine API key");
      }

      this.keyCache.set(trimmed, {
        result: body,
        expiresAt: now + this.cacheTtlMs,
      });

      return this.enforceKeyConstraints(body);
    } catch (err) {
      if (err instanceof UnauthorizedError || err instanceof ForbiddenError) {
        throw err;
      }
      logger.error("[validateKey] Network error during API key introspection", {
        err,
      });
      throw new UnauthorizedError(
        "Authentication service unreachable for API key verification",
      );
    }
  }

  private enforceKeyConstraints(
    result: ApiKeyValidationResult,
  ): ApiKeyValidationResult {
    if (
      this.requiredClientId &&
      result.appId &&
      result.appId !== this.requiredClientId
    ) {
      const keyScopes = result.scopes ?? [];
      const hasWildcard =
        keyScopes.includes("*") ||
        keyScopes.includes(`${this.requiredClientId}:*`) ||
        keyScopes.includes(this.requiredClientId);
      if (!hasWildcard) {
        throw new ForbiddenError(
          "API key assigned to " +
            result.appId +
            ", required " +
            this.requiredClientId,
        );
      }
    }

    if (this.requiredScopes && this.requiredScopes.length > 0) {
      const keyScopes = result.scopes ?? [];
      const hasWildcard = keyScopes.includes("*");
      if (!hasWildcard) {
        const hasAll = this.requiredScopes.every((scope) =>
          keyScopes.includes(scope),
        );
        if (!hasAll) {
          throw new ForbiddenError(
            "API key lacks required scopes: [" +
              this.requiredScopes.join(", ") +
              "]",
          );
        }
      }
    }

    return result;
  }

  public clearCache(): void {
    this.keyCache.clear();
    logger.info("[clearCache] API key validation cache cleared");
  }
}
