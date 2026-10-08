/**
 * @file packages/auth-react/src/provider/devlab-auth-provider.tsx
 * @description Master context provider for DevLab React authentication with automatic kill-switch interception.
 * @module @yuva-devlab/auth-react
 */

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppUnavailableScreen } from "../components/app-unavailable-screen";
import {
  AppStatus,
  type AuthUser,
  type DevLabAuthContextValue,
  type DevLabAuthProviderProps,
} from "../types";
import { DevLabAuthContext } from "./auth-context";

const STORAGE_KEY_TOKEN = "devlab_auth_token";
const STORAGE_KEY_USER = "devlab_auth_user";
const STORAGE_SYNC_EVENT = "devlab_auth_sync";

/**
 * Root authentication provider wrapping DevLab frontend applications.
 * Automatically handles multi-tab session synchronization and platform kill-switch screen display.
 *
 * @example
 * ```tsx
 * <DevLabAuthProvider appId="finai">
 *   <App />
 * </DevLabAuthProvider>
 * ```
 */
export const DevLabAuthProvider: React.FC<DevLabAuthProviderProps> = ({
  appId,
  gatewayUrl,
  children,
  customUnavailableScreen,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [appStatus, setAppStatus] = useState<AppStatus>(AppStatus.ACTIVE);

  // Poll or refresh platform application lifecycle status
  const refreshAppStatus = useCallback(async () => {
    if (!gatewayUrl) {
      setAppStatus(AppStatus.ACTIVE);
      return;
    }

    try {
      const res = await fetch(
        `${gatewayUrl}/api/v1/platform/apps/${appId}/status`,
      );
      if (res.ok) {
        const data = (await res.json()) as { status: AppStatus };
        setAppStatus(data.status ?? AppStatus.ACTIVE);
      } else if (res.status === 503) {
        setAppStatus(AppStatus.INACTIVE);
      }
    } catch {
      // Offline or network error: retain current status
    }
  }, [appId, gatewayUrl]);

  // Load session from browser storage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem(STORAGE_KEY_TOKEN);
      const storedUser = localStorage.getItem(STORAGE_KEY_USER);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser) as AuthUser);
      }
    } catch {
      // Storage access disabled
    } finally {
      setIsLoading(false);
    }

    void refreshAppStatus();
  }, [refreshAppStatus]);

  // Multi-tab logout and session synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_SYNC_EVENT) {
        if (!e.newValue) {
          // Logged out in another tab
          setToken(null);
          setUser(null);
        } else {
          // Logged in another tab
          const storedToken = localStorage.getItem(STORAGE_KEY_TOKEN);
          const storedUser = localStorage.getItem(STORAGE_KEY_USER);
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

  const login = useCallback((newToken: string, newUser: AuthUser) => {
    setToken(newToken);
    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY_TOKEN, newToken);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_SYNC_EVENT, String(Date.now()));
    } catch {
      // Ignore storage errors
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY_TOKEN);
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.setItem(STORAGE_SYNC_EVENT, "");
    } catch {
      // Ignore storage errors
    }
  }, []);

  const value: DevLabAuthContextValue = useMemo(
    () => ({
      isAuthenticated: Boolean(token && user),
      isLoading,
      user,
      token,
      appStatus,
      login,
      logout,
      refreshAppStatus,
    }),
    [token, user, isLoading, appStatus, login, logout, refreshAppStatus],
  );

  // If application is inactive or in maintenance, render the kill-switch screen
  if (appStatus === AppStatus.INACTIVE || appStatus === AppStatus.MAINTENANCE) {
    if (customUnavailableScreen) {
      return <>{customUnavailableScreen}</>;
    }
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
