/**
 * @file packages/auth-server/src/middleware/auth-middleware.ts
 * @description Universal HTTP middleware providing platform kill-switch enforcement and credential validation.
 * @module @yuva-devlab/auth-server
 */

import { Logger, loggerWithConfig } from "@yuva-devlab/logger";
import {
  DEFAULT_API_KEY_HEADER,
  DEFAULT_AUTH_HEADER,
  DEFAULT_BEARER_PREFIX,
  DEFAULT_PUBLIC_PATHS,
  HTTP_STATUS_SERVICE_UNAVAILABLE,
  HTTP_STATUS_UNAUTHORIZED,
} from "../constants";
import { AppStatus, type AuthContext } from "../types";

const logger = loggerWithConfig(new Logger("AuthMiddleware"));

/**
 * Minimal HTTP request and response interfaces for framework neutrality (Express, Fastify, Node http).
 */
export interface GenericHttpRequest {
  url?: string;
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  authContext?: AuthContext;
}

export interface GenericHttpResponse {
  statusCode?: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
}

/**
 * Creates a kill-switch middleware that intercepts all traffic if an application is deactivated.
 *
 * @param getAppStatus - Callback returning current platform status of the application
 * @returns Middleware function returning true if allowed to proceed, false if blocked (503)
 *
 * @example
 * ```typescript
 * const killSwitch = createAppKillSwitchMiddleware(() => appState.status);
 * const allowed = await killSwitch(req, res);
 * if (!allowed) return;
 * ```
 */
export function createAppKillSwitchMiddleware(
  getAppStatus: () => Promise<AppStatus> | AppStatus,
) {
  return async (
    req: GenericHttpRequest,
    res: GenericHttpResponse,
  ): Promise<boolean> => {
    const status = await getAppStatus();

    // If application has been administratively disabled or put into maintenance
    if (status === AppStatus.INACTIVE || status === AppStatus.MAINTENANCE) {
      logger.warn(
        "[killSwitch] Application is inactive or under maintenance; request rejected",
        {
          url: req.url,
          method: req.method,
          appStatus: status,
        },
      );

      res.statusCode = HTTP_STATUS_SERVICE_UNAVAILABLE;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          error: {
            code: "APP_DEACTIVATED",
            message:
              status === AppStatus.MAINTENANCE
                ? "Application is currently undergoing scheduled maintenance"
                : "Application has been deactivated by platform administrators",
            status,
          },
        }),
      );
      return false;
    }

    return true;
  };
}

/**
 * Options configuring request authentication middleware.
 */
export interface CreateAuthMiddlewareOptions {
  /** Whitelisted public endpoints bypassing authentication */
  publicPaths?: readonly string[];
  /** Function resolving an API key against store */
  validateApiKey?: (key: string) => Promise<AuthContext | null>;
  /** Function resolving a Bearer session token against JWKS or session store */
  validateToken?: (token: string) => Promise<AuthContext | null>;
}

/**
 * Universal authentication middleware verifying API keys and Bearer tokens.
 *
 * @param options - Configuration options
 * @returns Middleware handler
 */
export function createAuthMiddleware(options: CreateAuthMiddlewareOptions) {
  const publicPaths = new Set([
    ...DEFAULT_PUBLIC_PATHS,
    ...(options.publicPaths ?? []),
  ]);

  return async (
    req: GenericHttpRequest,
    res: GenericHttpResponse,
  ): Promise<boolean> => {
    const urlPath = (req.url || "/").split("?")[0] || "/";

    // 1. Bypass authentication for whitelisted public paths
    if (publicPaths.has(urlPath)) {
      req.authContext = {
        authenticated: false,
        roles: [],
        isAppActive: true,
      };
      return true;
    }

    // 2. Check for Machine-to-Machine API Key
    const rawApiKey = req.headers[DEFAULT_API_KEY_HEADER];
    const apiKey = typeof rawApiKey === "string" ? rawApiKey.trim() : undefined;

    if (apiKey && options.validateApiKey) {
      const apiKeyCtx = await options.validateApiKey(apiKey);
      if (apiKeyCtx?.authenticated) {
        logger.info("[authenticate] Authenticated via API Key", {
          path: urlPath,
        });
        req.authContext = apiKeyCtx;
        return true;
      }
    }

    // 3. Check for Bearer Token
    const rawAuth = req.headers[DEFAULT_AUTH_HEADER];
    const authHeader = typeof rawAuth === "string" ? rawAuth.trim() : undefined;

    if (
      authHeader?.startsWith(DEFAULT_BEARER_PREFIX) &&
      options.validateToken
    ) {
      const token = authHeader.slice(DEFAULT_BEARER_PREFIX.length).trim();
      const tokenCtx = await options.validateToken(token);
      if (tokenCtx?.authenticated) {
        logger.info("[authenticate] Authenticated via Bearer token", {
          path: urlPath,
        });
        req.authContext = tokenCtx;
        return true;
      }
    }

    // 4. Reject with 401 Unauthorized
    logger.warn("[authenticate] Unauthorized request rejected", {
      path: urlPath,
      method: req.method,
    });

    res.statusCode = HTTP_STATUS_UNAUTHORIZED;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: {
          code: "UNAUTHORIZED",
          message:
            "Missing or invalid authentication credentials (Bearer token or API key required)",
        },
      }),
    );
    return false;
  };
}
