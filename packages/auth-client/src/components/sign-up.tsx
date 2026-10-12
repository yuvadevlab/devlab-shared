/**
 * @file packages/auth-client/src/components/sign-up.tsx
 * @description Universal user registration form for DevLab tenants and ecosystem apps.
 * @module @yuva-devlab/auth-client
 */

import React, { useState, useContext, type FormEvent } from "react";
import { Lock, Mail, User, Loader2, CheckCircle2 } from "lucide-react";
import { DevLabAuthContext } from "../provider/auth-context";
import { AuthCard } from "./auth-card";
import { AuthInput } from "./auth-input";
import type { SignUpProps, AuthUser } from "../types";

export const SignUp: React.FC<SignUpProps> = ({
  onSuccess,
  onError,
  redirectTo,
  signInUrl = "/login",
  tenantId,
  apiBaseUrl = "",
  className = "",
}) => {
  const auth = useContext(DevLabAuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = `${apiBaseUrl}/auth/register`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          tenantId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message =
          errorData.message || `Registration failed with status ${res.status}`;
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

  const footer = signInUrl ? (
    <>
      Already have an account?{" "}
      <a
        href={signInUrl}
        style={{ color: "#60a5fa", textDecoration: "none", fontWeight: 500 }}
      >
        Sign in
      </a>
    </>
  ) : null;

  return (
    <AuthCard
      title="Create your account"
      subtitle="Join your organization on DevLab"
      errorMsg={errorMsg}
      footer={footer}
      className={className}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <AuthInput
          id="devlab-signup-name"
          label="Full name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex Chen"
          icon={<User size={16} />}
        />

        <AuthInput
          id="devlab-signup-email"
          label="Email address"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="alex@company.com"
          icon={<Mail size={16} />}
        />

        <AuthInput
          id="devlab-signup-password"
          label="Password (min. 8 characters)"
          isPassword
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          icon={<Lock size={16} />}
        />

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
              <span>Creating account…</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={16} />
              <span>Create account</span>
            </>
          )}
        </button>
      </form>
    </AuthCard>
  );
};
