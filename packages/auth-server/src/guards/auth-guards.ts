/**
 * @file packages/auth-server/src/guards/auth-guards.ts
 * @description Authorization assertions and scope/role enforcement guards.
 * @module @yuva-devlab/auth-server
 */

import { ForbiddenError, UnauthorizedError } from "@yuva-devlab/errors";
import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import type { ApiKey, AuthContext, AuthUser } from "../types";

const logger = loggerWithConfig(new Logger("AuthGuards"));

/**
 * Asserts that the request is authenticated with an active user session and optional role requirements.
 *
 * @param ctx - Inbound request auth context
 * @param requiredRoles - Optional list of required roles (user must possess at least one)
 * @returns Authenticated AuthUser
 * @throws UnauthorizedError if not authenticated as a user
 * @throws ForbiddenError if user lacks the required roles
 *
 * @example
 * ```typescript
 * const user = requireUser(ctx, ["admin", "operator"]);
 * ```
 */
export function requireUser(
  ctx: AuthContext,
  requiredRoles?: readonly string[],
): AuthUser {
  if (!ctx.authenticated || !ctx.user) {
    logger.warn(
      "[requireUser] Request rejected: missing authenticated user context",
    );
    throw new UnauthorizedError(
      "Authentication required: valid user session required",
    );
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const hasRole = requiredRoles.some((role) => ctx.roles.includes(role));
    if (!hasRole) {
      logger.warn("[requireUser] User lacks required roles", {
        userId: ctx.user.id,
        userRoles: ctx.roles,
        requiredRoles,
      });
      throw new ForbiddenError(
        `Insufficient privileges: requires one of [${requiredRoles.join(", ")}]`,
      );
    }
  }

  return ctx.user;
}

/**
 * Asserts that the request is authenticated via a machine-to-machine API key.
 *
 * @param ctx - Inbound request auth context
 * @returns Authenticated ApiKey
 * @throws UnauthorizedError if not authenticated via an API key
 */
export function requireApiKey(ctx: AuthContext): ApiKey {
  if (!ctx.authenticated || !ctx.apiKey) {
    logger.warn("[requireApiKey] Request rejected: missing machine API key");
    throw new UnauthorizedError(
      "Authentication required: valid API key required",
    );
  }

  return ctx.apiKey;
}

/**
 * Asserts that the authenticated context (user or API key) possesses a specific operational scope.
 *
 * @param ctx - Inbound request auth context
 * @param scope - Required scope or permission string
 * @throws ForbiddenError if scope is missing
 */
export function requireScope(ctx: AuthContext, scope: string): void {
  if (!ctx.roles.includes(scope)) {
    logger.warn("[requireScope] Missing required scope", {
      roles: ctx.roles,
      requiredScope: scope,
    });
    throw new ForbiddenError(`Missing required scope: '${scope}'`);
  }
}
