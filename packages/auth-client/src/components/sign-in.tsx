/**
 * @file packages/auth-client/src/components/sign-in.tsx
 * @description Theme-adaptive enterprise authentication login screen for DevLab tenants and ecosystem apps.
 * @module @yuva-devlab/auth-client
 */

import React, { useState, useContext, type FormEvent } from "react";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { DevLabAuthContext } from "@/provider/auth-context";
import {
  executeAuthRequest,
  persistSession,
  resolveForgotPasswordUrl,
  toAuthUser,
} from "@/provider/auth-helpers";
import { AuthCard } from "./auth-card";
import { AuthInput } from "./auth-input";
import type { SignInProps } from "@/types";

export const SignIn: React.FC<SignInProps> = ({
  onSuccess,
  onError,
  redirectTo,
  forgotPasswordUrl,
  apiBaseUrl = "",
  brand,
  theme,
  className = "",
  logo,
  icon,
  fullPage,
}) => {
  const auth = useContext(DevLabAuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const effectiveForgotUrl = resolveForgotPasswordUrl(
    forgotPasswordUrl,
    auth?.authUrl,
    auth?.clientId,
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    // Guard: ensure both mandatory credentials are provided
    if (!email.trim() || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const data = await executeAuthRequest(`${apiBaseUrl}/auth/login`, {
        email: email.trim(),
        password,
      });

      const authUser = toAuthUser(data.user, email);
      persistSession(data.accessToken, authUser);

      if (auth?.login) {
        auth.login(data.accessToken, authUser);
      }

      onSuccess?.(authUser, data.accessToken);

      // Perform navigation to specified or root destination
      if (redirectTo) {
        window.location.href = redirectTo;
      } else if (!onSuccess) {
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

  const footer = (
    <span
      style={{
        color: "var(--muted-foreground, #71717a)",
        fontSize: "var(--label-font-size, 0.8125rem)",
      }}
    >
      Need access? Contact your workspace administrator.
    </span>
  );

  return (
    <AuthCard
      title="Sign in to your workspace"
      subtitle="Enter your credentials to access DevLab applications"
      errorMsg={errorMsg}
      footer={footer}
      brand={brand}
      theme={theme}
      className={className}
      logo={logo}
      icon={icon}
      fullPage={fullPage}
    >
      <form onSubmit={handleSubmit} className="dl-auth-form">
        <AuthInput
          id="devlab-signin-email"
          label="Email address"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          icon={<Mail />}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-1, 0.25rem)",
          }}
        >
          {effectiveForgotUrl && (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <a
                href={effectiveForgotUrl}
                className="dl-auth-link"
                style={{ fontSize: "var(--label-font-size, 0.8125rem)" }}
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
            icon={<Lock />}
          />
        </div>

        <button type="submit" disabled={loading} className="dl-auth-submit-btn">
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Signing in…</span>
            </>
          ) : (
            <>
              <span>Sign in</span>
              <ArrowRight />
            </>
          )}
        </button>
      </form>
    </AuthCard>
  );
};
