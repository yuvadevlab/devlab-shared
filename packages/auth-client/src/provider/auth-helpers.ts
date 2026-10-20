/**
 * @file packages/auth-client/src/provider/auth-helpers.ts
 * @description Authentication session storage utilities and JWT redirect helpers.
 * @module @yuva-devlab/auth-client
 */

import type { AuthUser } from "../types";

export const STORAGE_KEY_TOKEN = "devlab_auth_token";
export const STORAGE_KEY_USER = "devlab_auth_user";
export const STORAGE_SYNC_EVENT = "devlab_auth_sync";

/**
 * Decodes base64url JWT payload safely in the browser.
 */
export function parseJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1]!.replace(/-/g, "+").replace(/_/g, "/");
    const jsonStr = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonStr) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Triggers a browser redirect to the central identity provider SSO login.
 */
export function redirectToPortalLogin(
  clientId: string,
  authUrl?: string,
): void {
  if (typeof window === "undefined") return;
  const baseUrl =
    authUrl ||
    (typeof process !== "undefined"
      ? process.env?.NEXT_PUBLIC_DEVLAB_PORTAL_WEB_URL
      : undefined);

  if (!baseUrl) {
    throw new Error(
      "DevLabAuth: authUrl or NEXT_PUBLIC_DEVLAB_PORTAL_WEB_URL must be configured to trigger SSO redirects",
    );
  }

  const currentUrl = window.location.href;
  window.location.href =
    baseUrl +
    "/login?app=" +
    encodeURIComponent(clientId) +
    "&redirect=" +
    encodeURIComponent(currentUrl);
}

/**
 * Persists session token and user profile into browser storage and cookie.
 */
export function persistSession(token: string, user: AuthUser): void {
  try {
    localStorage.setItem(STORAGE_KEY_TOKEN, token);
    localStorage.setItem("devlab_access_token", token);
    if (typeof document !== "undefined") {
      document.cookie =
        "devlab_access_token=" +
        encodeURIComponent(token) +
        "; path=/; max-age=604800; SameSite=Lax";
    }
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_SYNC_EVENT, String(Date.now()));
  } catch {
    // Ignore storage errors in restricted contexts
  }
}

/**
 * Purges session token and user profile from browser storage and cookie.
 */
export function purgeSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem("devlab_access_token");
    if (typeof document !== "undefined") {
      document.cookie = "devlab_access_token=; path=/; max-age=0; SameSite=Lax";
    }
    localStorage.removeItem(STORAGE_KEY_USER);
    localStorage.setItem(STORAGE_SYNC_EVENT, "");
  } catch {
    // Ignore storage errors
  }
}

/**
 * Resolves the appropriate password reset URL. If a custom URL is provided, it is returned.
 * Otherwise, if central authUrl is available, creates a direct link to the central portal SSO:
 * `${authUrl}/forgot-password?redirect=${returnUrl}&app=${clientId}`
 * Falls back to "/forgot-password" if neither is configured.
 */
export function resolveForgotPasswordUrl(
  customUrl?: string,
  authUrl?: string,
  clientId?: string,
): string {
  // If consumer explicitly provided a custom recovery URL, respect it
  if (customUrl) {
    return customUrl;
  }

  const centralAuth =
    authUrl ||
    (typeof process !== "undefined"
      ? process.env?.NEXT_PUBLIC_DEVLAB_PORTAL_WEB_URL
      : undefined);

  // If central auth provider URL is known and running in browser, build central SSO recovery link
  if (centralAuth && typeof window !== "undefined") {
    const returnUrl = window.location.href;
    const appQuery = clientId ? "&app=" + encodeURIComponent(clientId) : "";
    return (
      centralAuth +
      "/forgot-password?redirect=" +
      encodeURIComponent(returnUrl) +
      appQuery
    );
  }

  return "/forgot-password";
}

/**
 * Normalizes an API authentication response payload into an AuthUser instance.
 */
export function toAuthUser(
  rawUser: Record<string, unknown> | undefined,
  fallbackEmail: string,
): AuthUser {
  const user = rawUser || {};
  const email =
    typeof user.email === "string" ? user.email : fallbackEmail.trim();
  const name =
    typeof user.name === "string" ? user.name : email.split("@")[0] || "User";

  const roles = Array.isArray(user.roles)
    ? (user.roles as string[])
    : typeof user.role === "string"
      ? [user.role]
      : [];

  return {
    id: typeof user.id === "string" ? user.id : "",
    email,
    name,
    roles,
    tenantId: typeof user.tenantId === "string" ? user.tenantId : undefined,
    tenantSlug:
      typeof user.tenantSlug === "string" ? user.tenantSlug : undefined,
    tenantName:
      typeof user.tenantName === "string" ? user.tenantName : undefined,
    avatarUrl: typeof user.avatarUrl === "string" ? user.avatarUrl : undefined,
  };
}

/**
 * Sends a JSON POST request to an authentication endpoint and extracts the normalized data payload.
 */
export async function executeAuthRequest(
  endpoint: string,
  payload: Record<string, unknown>,
): Promise<{ accessToken: string; user?: Record<string, unknown> }> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = (await res.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;
    const message =
      (errorData.message as string) ||
      `Authentication request failed with status ${res.status}`;
    throw new Error(message);
  }

  const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  const raw =
    json && typeof json === "object" && "data" in json && json.data
      ? (json.data as Record<string, unknown>)
      : json;

  return raw as { accessToken: string; user?: Record<string, unknown> };
}
