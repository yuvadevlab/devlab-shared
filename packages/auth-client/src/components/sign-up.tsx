/**
 * @file packages/auth-client/src/components/sign-up.tsx
 * @description Theme-adaptive universal user registration form for DevLab tenants and ecosystem apps.
 * @module @yuva-devlab/auth-client
 */

import React, { useState, useContext, type FormEvent } from "react";
import { Lock, Mail, User, Loader2, CheckCircle2 } from "lucide-react";
import { DevLabAuthContext } from "../provider/auth-context";
import {
  executeAuthRequest,
  persistSession,
  toAuthUser,
} from "../provider/auth-helpers";
import { AuthCard } from "./auth-card";
import { AuthInput } from "./auth-input";
import type { SignUpProps } from "../types";

export const SignUp: React.FC<SignUpProps> = ({
  onSuccess,
  onError,
  redirectTo,
  signInUrl = "/login",
  tenantId,
  apiBaseUrl = "",
  brand,
  theme,
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

    // Guard: validate required inputs
    if (!name.trim() || !email.trim() || !password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    // Guard: enforce minimum password complexity requirement
    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const data = await executeAuthRequest(`${apiBaseUrl}/auth/register`, {
        name: name.trim(),
        email: email.trim(),
        password,
        tenantId,
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
      <a href={signInUrl} className="dl-auth-link">
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
      brand={brand}
      theme={theme}
      className={className}
    >
      <form onSubmit={handleSubmit} className="dl-auth-form">
        <AuthInput
          id="devlab-signup-name"
          label="Full name"
          type="text"
          autoComplete="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Alex Chen"
          icon={<User />}
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
          icon={<Mail />}
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
          icon={<Lock />}
        />

        <button type="submit" disabled={loading} className="dl-auth-submit-btn">
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Creating account…</span>
            </>
          ) : (
            <>
              <CheckCircle2 />
              <span>Create account</span>
            </>
          )}
        </button>
      </form>
    </AuthCard>
  );
};
