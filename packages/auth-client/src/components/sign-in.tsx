/**
 * @file packages/auth-client/src/components/sign-in.tsx
 * @description Drop-in enterprise authentication login screen for DevLab tenants and ecosystem apps.
 * @module @yuva-devlab/auth-client
 */

import React, { useState, useContext, type FormEvent } from "react";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { DevLabAuthContext } from "../provider/auth-context";
import { AuthCard } from "./auth-card";
import { AuthInput } from "./auth-input";
import type { SignInProps, AuthUser } from "../types";

export const SignIn: React.FC<SignInProps> = ({
  onSuccess,
  onError,
  redirectTo,
  signUpUrl = "/signup",
  forgotPasswordUrl = "/forgot-password",
  apiBaseUrl = "",
  className = "",
}) => {
  const auth = useContext(DevLabAuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = `${apiBaseUrl}/auth/login`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message =
          errorData.message || `Login failed with status ${res.status}`;
        throw new Error(message);
      }

      const data = (await res.json()) as {
        accessToken: string;
        user: {
          id: string;
          email: string;
          name: string;
          role: string;
          tenantId?: string;
          tenantSlug?: string;
          tenantName?: string;
          avatarUrl?: string;
        };
      };

      const authUser: AuthUser = {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        roles: [data.user.role],
        tenantId: data.user.tenantId,
        tenantSlug: data.user.tenantSlug,
        tenantName: data.user.tenantName,
        avatarUrl: data.user.avatarUrl,
      };

      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("devlab_access_token", data.accessToken);
          localStorage.setItem("devlab_auth_token", data.accessToken);
          document.cookie =
            "devlab_access_token=" +
            encodeURIComponent(data.accessToken) +
            "; path=/; max-age=604800; SameSite=Lax";
        } catch {
          // Ignore storage errors
        }
      }

      if (auth?.login) {
        auth.login(data.accessToken, authUser);
      }

      onSuccess?.(authUser, data.accessToken);

      if (redirectTo) {
        window.location.href = redirectTo;
      } else {
        window.location.href = "/";
      }
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      setErrorMsg(error.message);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const footer = signUpUrl ? (
    <>
      Don't have an account?{" "}
      <a
        href={signUpUrl}
        style={{ color: "#60a5fa", textDecoration: "none", fontWeight: 500 }}
      >
        Sign up
      </a>
    </>
  ) : (
    <span style={{ color: "#71717a", fontSize: "12px" }}>
      Need access? Contact your workspace administrator for an invite.
    </span>
  );

  return (
    <AuthCard
      title="Sign in to your workspace"
      subtitle="Enter your credentials to access DevLab applications"
      errorMsg={errorMsg}
      footer={footer}
      className={className}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <AuthInput
          id="devlab-signin-email"
          label="Email address"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          icon={<Mail size={16} />}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {forgotPasswordUrl && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <a
                href={forgotPasswordUrl}
                style={{
                  fontSize: "12px",
                  color: "#60a5fa",
                  textDecoration: "none",
                }}
              >
                Forgot password?
              </a>
            </div>
          )}
          <AuthInput
            id="devlab-signin-password"
            label="Password"
            isPassword
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            icon={<Lock size={16} />}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "100%",
            padding: "11px 16px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            fontWeight: 600,
            fontSize: "14px",
            border: "none",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.75 : 1,
            transition: "background-color 0.2s ease",
          }}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Signing in…</span>
            </>
          ) : (
            <>
              <span>Sign in</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </form>
    </AuthCard>
  );
};
