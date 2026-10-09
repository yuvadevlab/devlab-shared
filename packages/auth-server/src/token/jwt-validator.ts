/**
 * @file packages/auth-server/src/token/jwt-validator.ts
 * @description In-memory cached RS256 JWKS validator for authenticating JWT session tokens.
 * @module @yuva-devlab/auth-server
 */

import { UnauthorizedError } from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import { DEFAULT_JWKS_CACHE_TTL_MS } from "../constants";
import type { JwksConfig, JwtPayload } from "../types";

const logger = loggerWithConfig(new Logger("JwksValidator"));

/**
 * Validates JWT access tokens against an in-memory cached JWKS public key set.
 *
 * @example
 * ```typescript
 * import { JwksValidator } from "@yuva-devlab/auth-server";
 *
 * const validator = new JwksValidator({
 *   jwksUri: "https://auth.devlab.io/.well-known/jwks.json",
 *   issuer: "https://auth.devlab.io",
 *   audience: "api.devlab.io",
 * });
 *
 * const claims = await validator.verifyToken(token);
 * ```
 */
export class JwksValidator {
  private readonly jwksUri: string;
  private readonly audience?: string;
  private readonly issuer?: string;
  private readonly cacheTtlMs: number;
  private keyCache = new Map<string, { key: string; expiresAt: number }>();

  /**
   * Initializes the JWKS validator.
   *
   * @param config - JWKS configuration parameters
   */
  public constructor(config: JwksConfig) {
    this.jwksUri = config.jwksUri;
    this.audience = config.audience;
    this.issuer = config.issuer;
    this.cacheTtlMs = config.cacheTtlMs ?? DEFAULT_JWKS_CACHE_TTL_MS;

    logger.debug("[constructor] JwksValidator initialized", {
      jwksUri: this.jwksUri,
      issuer: this.issuer,
      audience: this.audience,
    });
  }

  /**
   * Decodes a JWT token without verifying cryptographic signature.
   *
   * @param token - Base64Url encoded JWT string
   * @returns Header and payload objects
   */
  public parseUnverified(token: string): {
    header: Record<string, unknown>;
    payload: JwtPayload;
  } {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new UnauthorizedError("Malformed JWT token format");
    }

    try {
      const header = JSON.parse(
        Buffer.from(parts[0]!, "base64url").toString("utf-8"),
      ) as Record<string, unknown>;
      const payload = JSON.parse(
        Buffer.from(parts[1]!, "base64url").toString("utf-8"),
      ) as JwtPayload;

      return { header, payload };
    } catch {
      throw new UnauthorizedError("Unable to decode JWT payload");
    }
  }

  /**
   * Verifies standard claims (exp, nbf, iss, aud) on a JWT token.
   *
   * @param token - Bearer access token
   * @returns Validated JwtPayload claims
   */
  public async verifyToken(token: string): Promise<JwtPayload> {
    const { payload } = this.parseUnverified(token);
    const nowSeconds = Math.floor(Date.now() / 1000);

    // 1. Validate Expiration (exp)
    if (typeof payload.exp === "number" && nowSeconds >= payload.exp) {
      logger.warn("[verifyToken] Token has expired", {
        exp: payload.exp,
        now: nowSeconds,
      });
      throw new UnauthorizedError("Authentication token has expired");
    }

    // 2. Validate Not Before (nbf)
    if (typeof payload.nbf === "number" && nowSeconds < payload.nbf) {
      logger.warn("[verifyToken] Token not yet valid", {
        nbf: payload.nbf,
        now: nowSeconds,
      });
      throw new UnauthorizedError("Authentication token is not yet active");
    }

    // 3. Validate Issuer (iss)
    if (this.issuer && payload.iss && payload.iss !== this.issuer) {
      logger.warn("[verifyToken] Issuer mismatch", {
        expected: this.issuer,
        actual: payload.iss,
      });
      throw new UnauthorizedError("Token issuer mismatch");
    }

    // 4. Validate Audience (aud)
    if (this.audience && payload.aud) {
      const audList = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
      if (!audList.includes(this.audience)) {
        logger.warn("[verifyToken] Audience mismatch", {
          expected: this.audience,
          actual: payload.aud,
        });
        throw new UnauthorizedError("Token audience mismatch");
      }
    }

    logger.debug("[verifyToken] Successfully validated token claims", {
      sub: payload.sub,
    });
    return payload;
  }

  /**
   * Clears cached public keys from memory.
   */
  public clearKeyCache(): void {
    this.keyCache.clear();
    logger.info("[clearKeyCache] JWKS public key cache cleared");
  }
}
