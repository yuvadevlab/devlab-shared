/**
 * @file packages/auth-client/src/components/forgot-password.tsx
 * @description Self-service password reset request form for DevLab.
 * Displays direct reset link in local dev mode when email delivery is not configured.
 * @module @yuva-devlab/auth-client
 */

import React, { useState, type FormEvent } from "react";
import { Mail, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { AuthCard } from "./auth-card";
import { AuthInput } from "./auth-input";
import type { ForgotPasswordProps } from "../types";

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSuccess,
  onError,
  signInUrl = "/login",
  apiBaseUrl = "",
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

      const data = (await res.json().catch(() => ({}))) as {
        resetUrl?: string;
        resetToken?: string;
      };

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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "13px",
        color: "#a1a1aa",
        textDecoration: "none",
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
      className={className}
    >
      {isSubmitted ? (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              backgroundColor: "rgba(34, 197, 94, 0.15)",
              color: "#4ade80",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
            }}
          >
            <CheckCircle2 size={24} />
          </div>
          <p style={{ fontSize: "14px", color: "#e4e4e7", margin: 0 }}>
            If an account exists for <strong>{email}</strong>, you will receive
            an email shortly with instructions.
          </p>

          {devResetUrl && (
            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                textAlign: "left",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#93c5fd",
                  fontWeight: 600,
                  margin: "0 0 6px 0",
                }}
              >
                🛠 Dev mode — use this link to reset your password:
              </p>
              <a
                href={devResetUrl}
                style={{
                  fontSize: "12px",
                  color: "#60a5fa",
                  fontFamily: "monospace",
                  wordBreak: "break-all",
                }}
              >
                {devResetUrl}
              </a>
            </div>
          )}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <AuthInput
            id="devlab-forgot-email"
            label="Email address"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            icon={<Mail size={16} />}
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
            }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
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
