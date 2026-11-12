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
    <div className="dl-auth-success-view">
      <div className="dl-auth-success-icon-badge">
        <CheckCircle2 size={24} />
      </div>
      <p className="dl-auth-success-text">
        If an account exists for <strong>{email}</strong>, you will receive an
        email shortly with instructions.
      </p>

      {devResetUrl && (
        <div className="dl-auth-dev-callout">
          <p className="dl-auth-dev-title">
            🛠 Dev mode — use this link to reset your password:
          </p>
          <a href={devResetUrl} className="dl-auth-link dl-auth-dev-link">
            {devResetUrl}
          </a>
        </div>
      )}
    </div>
  );
};
