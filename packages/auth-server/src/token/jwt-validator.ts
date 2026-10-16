/**
 * @file packages/auth-server/src/token/jwt-validator.ts
 * @description RS256 JWKS validator providing cryptographic signature verification and claims checking.
 * @module @yuva-devlab/auth-server
 */

import crypto from "node:crypto";
import { UnauthorizedError } from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import { DEFAULT_JWKS_CACHE_TTL_MS } from "../constants";
import type { JwksConfig, JwtPayload } from "../types";

const logger = loggerWithConfig(new Logger("JwksValidator"));

interface CachedKey {
  readonly keyObject: crypto.KeyObject;
  readonly expiresAt: number;
}

interface JwkRecord {
  readonly kid?: string;
  readonly kty: string;
  readonly alg?: string;
  readonly use?: string;
  readonly [key: string]: unknown;
}

/**
 * Validates JWT access tokens against an in-memory cached JWKS public key set.
 */
export class JwksValidator {
  private readonly jwksUri: string;
  private readonly audience?: string;
  private readonly issuer?: string;
  private readonly cacheTtlMs: number;
  private keyCache = new Map<string, CachedKey>();
  private jwksSetCache: {
    keys: readonly JwkRecord[];
    expiresAt: number;
  } | null = null;

  public constructor(config: Partial<JwksConfig> = {}) {
    this.jwksUri =
      config.jwksUri ??
      (config.issuer ? `${config.issuer}/.well-known/jwks.json` : undefined) ??
      (typeof process !== "undefined"
        ? (process.env?.DEVLAB_JWKS_URI ??
          (process.env?.DEVLAB_AUTH_URL
            ? `${process.env.DEVLAB_AUTH_URL}/.well-known/jwks.json`
            : undefined))
        : undefined) ??
      "";
    this.audience = config.audience;
    this.issuer = config.issuer;
    this.cacheTtlMs = config.cacheTtlMs ?? DEFAULT_JWKS_CACHE_TTL_MS;
  }

  public parseUnverified(token: string): {
    header: Record<string, unknown>;
    payload: JwtPayload;
    rawHeader: string;
    rawPayload: string;
    signature: string;
  } {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new UnauthorizedError(
        "Malformed JWT token format: expected 3 segments",
      );
    }

    try {
      const header = JSON.parse(
        Buffer.from(parts[0]!, "base64url").toString("utf-8"),
      ) as Record<string, unknown>;
      const payload = JSON.parse(
        Buffer.from(parts[1]!, "base64url").toString("utf-8"),
      ) as JwtPayload;
      return {
        header,
        payload,
        rawHeader: parts[0]!,
        rawPayload: parts[1]!,
        signature: parts[2]!,
      };
    } catch {
      throw new UnauthorizedError("Unable to decode JWT header or payload");
    }
  }

  private async fetchJwks(): Promise<readonly JwkRecord[]> {
    if (!this.jwksUri) {
      throw new UnauthorizedError(
        "JwksValidator: jwksUri, issuer, or DEVLAB_AUTH_URL must be configured",
      );
    }
    const now = Date.now();
    if (this.jwksSetCache && this.jwksSetCache.expiresAt > now) {
      return this.jwksSetCache.keys;
    }

    try {
      const res = await fetch(this.jwksUri, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(5000),
      });

      if (!res.ok) {
        throw new Error(`JWKS endpoint returned HTTP ${res.status}`);
      }

      const body = (await res.json()) as { keys?: readonly JwkRecord[] };
      const keys = body.keys ?? [];
      this.jwksSetCache = { keys, expiresAt: now + this.cacheTtlMs };
      return keys;
    } catch (err) {
      logger.error("[fetchJwks] Failed to fetch JWKS public keys", {
        uri: this.jwksUri,
        err,
      });
      if (this.jwksSetCache?.keys) return this.jwksSetCache.keys;
      throw new UnauthorizedError("Authentication service JWKS unreachable");
    }
  }

  private async resolveKeyObject(kid?: string): Promise<crypto.KeyObject> {
    const now = Date.now();
    const cacheKey = kid ?? "__default__";
    const cached = this.keyCache.get(cacheKey);

    if (cached && cached.expiresAt > now) {
      return cached.keyObject;
    }

    const jwks = await this.fetchJwks();
    const matched = kid ? jwks.find((k) => k.kid === kid) : jwks[0];

    if (!matched) {
      throw new UnauthorizedError(
        `No matching JWK public key found for kid: ${kid ?? "default"}`,
      );
    }

    try {
      const keyObject = crypto.createPublicKey({
        key: matched as crypto.JsonWebKey,
        format: "jwk",
      });
      this.keyCache.set(cacheKey, {
        keyObject,
        expiresAt: now + this.cacheTtlMs,
      });
      return keyObject;
    } catch (err) {
      logger.error("[resolveKeyObject] Failed to parse JWK public key", {
        kid,
        err,
      });
      throw new UnauthorizedError("Invalid JWK public key format");
    }
  }

  public async verifyToken(token: string): Promise<JwtPayload> {
    const { header, payload, rawHeader, rawPayload, signature } =
      this.parseUnverified(token);

    if (header.alg && header.alg !== "RS256") {
      throw new UnauthorizedError(
        `Unsupported signing algorithm: ${header.alg}. Expected RS256`,
      );
    }

    const kid = typeof header.kid === "string" ? header.kid : undefined;
    const keyObject = await this.resolveKeyObject(kid);

    const data = Buffer.from(`${rawHeader}.${rawPayload}`);
    const sigBuffer = Buffer.from(signature, "base64url");
    const isSignatureValid = crypto.verify(
      "RSA-SHA256",
      data,
      keyObject,
      sigBuffer,
    );

    if (!isSignatureValid) {
      logger.warn("[verifyToken] Cryptographic signature check failed", {
        sub: payload.sub,
        kid,
      });
      throw new UnauthorizedError("Invalid token signature");
    }

    const nowSeconds = Math.floor(Date.now() / 1000);
    if (typeof payload.exp === "number" && nowSeconds >= payload.exp) {
      throw new UnauthorizedError("Authentication token has expired");
    }

    if (typeof payload.nbf === "number" && nowSeconds < payload.nbf) {
      throw new UnauthorizedError("Authentication token is not yet active");
    }

    if (this.issuer && payload.iss && payload.iss !== this.issuer) {
      throw new UnauthorizedError(
        `Token issuer mismatch: expected ${this.issuer}, got ${payload.iss}`,
      );
    }

    if (this.audience && payload.aud) {
      const audList = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
      if (!audList.includes(this.audience)) {
        throw new UnauthorizedError(
          `Token audience mismatch: expected ${this.audience}`,
        );
      }
    }

    return payload;
  }

  public clearKeyCache(): void {
    this.keyCache.clear();
    this.jwksSetCache = null;
    logger.info("[clearKeyCache] JWKS public key cache cleared");
  }
}
