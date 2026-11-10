/**
 * @file packages/auth-client/src/provider/devlab-auth-provider.tsx
 * @description Pure client-side authentication provider managing sessions, SSO redirects, and token lifecycle.
 * @module @yuva-devlab/auth-client
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppUnavailableScreen } from "@/components/app-unavailable-screen";
import {
  AuthQueryParamKey,
  AuthStorageKey,
  DEFAULT_PORTAL_API_URL,
  DEFAULT_PORTAL_WEB_URL,
  PLATFORM_APP_STATUS_ENDPOINT,
  APP_STATUS_POLL_INTERVAL_MS,
} from "@/constants";
import {
  AppStatus,
  type AuthUser,
  type DevLabAuthContextValue,
  type DevLabAuthProviderProps,
} from "@/types";
import { DevLabAuthContext } from "./auth-context";
import {
  parseJwtPayload,
  persistSession,
  purgeSession,
  redirectToPortalLogin,
} from "./auth-helpers";

export { redirectToPortalLogin } from "./auth-helpers";

/**
 * Root authentication provider wrapping DevLab frontend applications.
 * Handles token persistence, SSO URL extraction, and cross-tab session synchronization.
 */
export const DevLabAuthProvider: React.FC<DevLabAuthProviderProps> = ({
  clientId,
  appId,
  authUrl,
  gatewayUrl,
  portalUrl,
  children,
  customUnavailableScreen,
}) => {
  const effectiveClientId = clientId || appId || "";
  const effectiveAuthUrl = authUrl || portalUrl || DEFAULT_PORTAL_WEB_URL;
  const effectiveApiUrl = gatewayUrl || portalUrl || DEFAULT_PORTAL_API_URL;

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.ACTIVE);

  const refreshAppStatus = useCallback(async () => {
    if (!effectiveClientId) return;
    try {
      const apiBase = (effectiveApiUrl || "").replace(/\/+$/, "");
      if (!apiBase) return;
      const res = await fetch(
        `${apiBase}${PLATFORM_APP_STATUS_ENDPOINT}/${encodeURIComponent(effectiveClientId)}/status`,
        { headers: { Accept: "application/json" } },
      );
      if (res.ok) {
        const data = (await res.json()) as {
          status?: string;
          isActive?: boolean;
        };
        if (data.status === "INACTIVE" || data.isActive === false) {
          setAppStatus(AppStatus.INACTIVE);
          return;
        }
        if (data.status === "MAINTENANCE") {
          setAppStatus(AppStatus.MAINTENANCE);
          return;
        }
        setAppStatus(AppStatus.ACTIVE);
      }
    } catch {
      // In offline / network glitch scenarios, fail gracefully
    }
  }, [effectiveClientId, effectiveApiUrl]);

  useEffect(() => {
    void refreshAppStatus();
    const interval = setInterval(() => {
      void refreshAppStatus();
    }, APP_STATUS_POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [refreshAppStatus]);

  const login = useCallback((newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    persistSession(newToken, newUser);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    purgeSession();
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const urlToken =
          params.get(AuthQueryParamKey.TOKEN) ||
          params.get(AuthQueryParamKey.ACCESS_TOKEN);

        if (urlToken) {
          const payload = parseJwtPayload(urlToken);
          if (payload && payload.sub) {
            const parsedUser: AuthUser = {
              id: String(payload.sub),
              email:
                typeof payload.email === "string" ? payload.email : undefined,
              name: typeof payload.name === "string" ? payload.name : undefined,
              roles: Array.isArray(payload.roles)
                ? (payload.roles as string[])
                : typeof payload.role === "string"
                  ? [payload.role]
                  : [],
              tenantId:
                typeof payload.tenant_id === "string"
                  ? payload.tenant_id
                  : typeof payload.tenantId === "string"
                    ? payload.tenantId
                    : undefined,
              tenantSlug:
                typeof payload.tenant_slug === "string"
                  ? payload.tenant_slug
                  : undefined,
              tenantName:
                typeof payload.tenant_name === "string"
                  ? payload.tenant_name
                  : undefined,
            };
            login(urlToken, parsedUser);

            params.delete(AuthQueryParamKey.TOKEN);
            params.delete(AuthQueryParamKey.ACCESS_TOKEN);
            const newQuery = params.toString();
            const newUrl =
              window.location.pathname +
              (newQuery ? "?" + newQuery : "") +
              window.location.hash;
            window.history.replaceState({}, document.title, newUrl);
            setIsLoading(false);
            return;
          }
        }

        const storedToken =
          localStorage.getItem(AuthStorageKey.TOKEN) ||
          localStorage.getItem(AuthStorageKey.ACCESS_TOKEN_LEGACY);
        const storedUser = localStorage.getItem(AuthStorageKey.USER);
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser) as AuthUser);
        }
      }
    } catch {
      // Storage access disabled in restricted browser contexts
    } finally {
      setIsLoading(false);
    }
  }, [login]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === AuthStorageKey.SYNC) {
        if (!e.newValue) {
          setToken(null);
          setUser(null);
        } else {
          const storedToken =
            localStorage.getItem(AuthStorageKey.TOKEN) ||
            localStorage.getItem(AuthStorageKey.ACCESS_TOKEN_LEGACY);
          const storedUser = localStorage.getItem(AuthStorageKey.USER);
          if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser) as AuthUser);
          }
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const redirectToLogin = useCallback(() => {
    redirectToPortalLogin(effectiveClientId, effectiveAuthUrl);
  }, [effectiveClientId, effectiveAuthUrl]);

  const value: DevLabAuthContextValue = useMemo(
    () => ({
      isAuthenticated: Boolean(token && user),
      isLoading,
      user,
      token,
      appStatus,
      setAppStatus,
      authUrl: effectiveAuthUrl,
      clientId: effectiveClientId,
      login,
      logout,
      refreshAppStatus,
      redirectToLogin,
    }),
    [
      token,
      user,
      isLoading,
      appStatus,
      effectiveAuthUrl,
      effectiveClientId,
      login,
      logout,
      refreshAppStatus,
      redirectToLogin,
    ],
  );

  if (appStatus === AppStatus.INACTIVE || appStatus === AppStatus.MAINTENANCE) {
    if (customUnavailableScreen) return <>{customUnavailableScreen}</>;
    return (
      <AppUnavailableScreen status={appStatus} onRetry={refreshAppStatus} />
    );
  }

  return (
    <DevLabAuthContext.Provider value={value}>
      {children}
    </DevLabAuthContext.Provider>
  );
};
