/**
 * @file packages/auth-client/src/components/forgot-password-success.tsx
 * @description Success state confirmation view for password reset requests with theme tokens.
 * @module @yuva-devlab/auth-client
 */

import React from "react";
import { CheckCircle2 } from "lucide-react";

export interface ForgotPasswordSuccessProps {
  /** The email address where instructions were dispatched */
  readonly email: string;
  /** Optional developer reset URL for local debugging */
  readonly devResetUrl?: string | null;
}

export const ForgotPasswordSuccess: React.FC<ForgotPasswordSuccessProps> = ({
  email,
  devResetUrl,
}) => {
  return (
    <div style={{ textAlign: "center", padding: "var(--space-4, 1rem) 0" }}>
      <div
        style={{
          width: "calc(var(--icon-xl, 1.5rem) * 2)",
          height: "calc(var(--icon-xl, 1.5rem) * 2)",
          borderRadius: "50%",
          backgroundColor: "rgba(34, 197, 94, 0.15)",
          color: "var(--success, #4ade80)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto var(--space-4, 1rem) auto",
        }}
      >
        <CheckCircle2 size={24} />
      </div>
      <p
        style={{
          fontSize: "var(--control-font-size, 0.875rem)",
          color: "var(--foreground, #e4e4e7)",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        If an account exists for <strong>{email}</strong>, you will receive an
        email shortly with instructions.
      </p>

      {devResetUrl && (
        <div
          style={{
            marginTop: "var(--space-4, 1rem)",
            padding: "var(--space-3, 0.75rem)",
            borderRadius:
              "var(--radius-md, calc(var(--radius, 0.75rem) * 0.75))",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            border: "1px solid var(--border, rgba(255, 255, 255, 0.1))",
            textAlign: "left",
          }}
        >
          <p
            style={{
              fontSize: "var(--label-font-size, 0.8125rem)",
              color: "var(--primary, #93c5fd)",
              fontWeight: 600,
              margin: "0 0 var(--space-1-5, 0.375rem) 0",
            }}
          >
            🛠 Dev mode — use this link to reset your password:
          </p>
          <a
            href={devResetUrl}
            className="dl-auth-link"
            style={{
              fontSize: "var(--label-font-size, 0.8125rem)",
              fontFamily: "monospace",
              wordBreak: "break-all",
            }}
          >
            {devResetUrl}
          </a>
        </div>
      )}
    </div>
  );
};
