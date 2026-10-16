/**
 * @file packages/auth-client/src/components/forgot-password.tsx
 * @description Theme-adaptive self-service password reset request form for DevLab.
 * Displays direct reset link in local dev mode when email delivery is not configured.
 * @module @yuva-devlab/auth-client
 */

import React, { useState, type FormEvent } from "react";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { AuthCard } from "./auth-card";
import { AuthInput } from "./auth-input";
import { ForgotPasswordSuccess } from "./forgot-password-success";
import type { ForgotPasswordProps } from "../types";

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSuccess,
  onError,
  signInUrl = "/login",
  apiBaseUrl = "",
  brand,
  theme,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    // Guard: validate email address input
    if (!email.trim()) {
      setErrorMsg("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = `${apiBaseUrl}/auth/forgot-password`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message =
          errorData.message || `Password reset request failed (${res.status})`;
        throw new Error(message);
      }

      const json = (await res.json().catch(() => ({}))) as Record<
        string,
        unknown
      >;
      const raw =
        json && typeof json === "object" && "data" in json && json.data
          ? json.data
          : json;
      const data = raw as {
        resetUrl?: string;
        resetToken?: string;
      };

      // Surface dev reset link if email provider is mocked in development
      if (data.resetUrl) {
        setDevResetUrl(data.resetUrl);
      } else if (data.resetToken) {
        setDevResetUrl(`/reset-password?token=${data.resetToken}`);
      }

      setIsSubmitted(true);
      onSuccess?.(email.trim());
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      setErrorMsg(error.message);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  const footer = signInUrl ? (
    <a
      href={signInUrl}
      className="dl-auth-link"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-1-5, 0.375rem)",
      }}
    >
      <ArrowLeft size={14} />
      Back to sign in
    </a>
  ) : null;

  return (
    <AuthCard
      title="Reset your password"
      subtitle={
        isSubmitted
          ? "Check your inbox for password reset instructions"
          : "Enter your registered email and we'll send you a recovery link"
      }
      errorMsg={errorMsg}
      footer={footer}
      brand={brand}
      theme={theme}
      className={className}
    >
      {isSubmitted ? (
        <ForgotPasswordSuccess email={email} devResetUrl={devResetUrl} />
      ) : (
        <form onSubmit={handleSubmit} className="dl-auth-form">
          <AuthInput
            id="devlab-forgot-email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            icon={<Mail />}
          />

          <button
            type="submit"
            disabled={loading}
            className="dl-auth-submit-btn"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Sending reset link…</span>
              </>
            ) : (
              <span>Send reset link</span>
            )}
          </button>
        </form>
      )}
    </AuthCard>
  );
};
