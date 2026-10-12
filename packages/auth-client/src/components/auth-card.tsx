/**
 * @file packages/auth-client/src/components/auth-card.tsx
 * @description Standardized card wrapper and error banner for auth forms.
 * @module @yuva-devlab/auth-client
 */

import React, { type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

export interface AuthCardProps {
  /** Primary card heading */
  readonly title: string;
  /** Subheading contextual description */
  readonly subtitle: string;
  /** Optional error message displayed in alert banner */
  readonly errorMsg?: string | null;
  /** Primary form or interactive children */
  readonly children: ReactNode;
  /** Optional navigation or switch-mode footer */
  readonly footer?: ReactNode;
  /** Optional custom CSS class */
  readonly className?: string;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  errorMsg,
  children,
  footer,
  className = "",
}) => {
  return (
    <div
      className={className}
      style={{
        maxWidth: "420px",
        width: "100%",
        margin: "0 auto",
        padding: "32px",
        backgroundColor: "#111113",
        border: "1px solid #27272a",
        borderRadius: "12px",
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)",
        fontFamily: "inherit",
        color: "#f4f4f5",
      }}
    >
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            margin: "0 0 8px 0",
            color: "#fafafa",
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: "14px", color: "#a1a1aa", margin: 0 }}>
          {subtitle}
        </p>
      </div>

      {errorMsg && (
        <div
          role="alert"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 14px",
            marginBottom: "20px",
            backgroundColor: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.35)",
            borderRadius: "8px",
            color: "#fca5a5",
            fontSize: "13px",
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      {children}

      {footer && (
        <div
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "13px",
            color: "#a1a1aa",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );
};
