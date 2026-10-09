/**
 * @file packages/auth-server/src/types/auth.types.ts
 * @description Type definitions and contracts for server authentication, JWKS, and app lifecycle.
 * @module @yuva-devlab/auth-server
 */

/**
 * Operational state of an application on the DevLab platform.
 */
export enum AppStatus {
  /** Application is fully operational and serving traffic */
  ACTIVE = "ACTIVE",
  /** Application has been administratively disabled / deactivated (Kill-Switch triggered) */
  INACTIVE = "INACTIVE",
  /** Application is undergoing scheduled maintenance */
  MAINTENANCE = "MAINTENANCE",
}

/**
 * Authenticated user profile representation.
 */
export interface AuthUser {
  /** Canonical user UUID */
  readonly id: string;
  /** Primary user email address */
  readonly email?: string;
  /** Granted role slugs */
  readonly roles: readonly string[];
  /** Tenant isolation partition ID */
  readonly tenantId?: string;
  /** Arbitrary profile metadata */
  readonly metadata?: Record<string, unknown>;
}

/**
 * Machine-to-machine API key credential.
 */
export interface ApiKey {
  /** Primary API key UUID */
  readonly id: string;
  /** Secure key string */
  readonly key: string;
  /** Human-readable key name or description */
  readonly name: string;
  /** Scoped roles granted to this key */
  readonly roles: readonly string[];
  /** Tenant ID partition */
  readonly tenantId?: string;
  /** Active status flag */
  readonly isEnabled: boolean;
}

/**
 * Evaluated authentication context attached to inbound requests.
 */
export interface AuthContext {
  /** Whether the request carries valid credentials */
  readonly authenticated: boolean;
  /** Authenticated user if authenticated via session/JWT */
  readonly user?: AuthUser;
  /** Authenticated API key if authenticated via machine credential */
  readonly apiKey?: ApiKey;
  /** Consolidated roles granted across user or API key */
  readonly roles: readonly string[];
  /** Whether the host application is currently active on the platform */
  readonly isAppActive: boolean;
  /** Detailed app status */
  readonly appStatus?: AppStatus;
  /** Tenant partition ID */
  readonly tenantId?: string;
  /** Distributed trace request identifier */
  readonly requestId?: string;
}

/**
 * Configuration for verifying RS256 JWTs against a remote JWKS endpoint.
 */
export interface JwksConfig {
  /** JWKS endpoint URI exposing JSON Web Keys */
  readonly jwksUri: string;
  /** Expected audience claim */
  readonly audience?: string;
  /** Expected issuer claim */
  readonly issuer?: string;
  /** In-memory cache duration for public keys in milliseconds */
  readonly cacheTtlMs?: number;
}

/**
 * Decoded JWT claims payload.
 */
export interface JwtPayload {
  readonly sub: string;
  readonly iss?: string;
  readonly aud?: string | readonly string[];
  readonly exp?: number;
  readonly nbf?: number;
  readonly iat?: number;
  readonly email?: string;
  readonly roles?: readonly string[];
  readonly tenantId?: string;
  readonly [key: string]: unknown;
}
