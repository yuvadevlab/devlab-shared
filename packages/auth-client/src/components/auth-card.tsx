/**
 * @file packages/auth-client/src/components/auth-card.tsx
 * @description Standardized card wrapper and error banner adopting consumer app theme tokens.
 * @module @yuva-devlab/auth-client
 */

import React, { type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { AUTH_STYLES } from "./auth-styles";

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
  /** Optional brand theme preset (e.g. "finai", "orchestrai", "logs") */
  readonly brand?: string;
  /** Optional theme override */
  readonly theme?: string;
  /** Optional custom CSS class */
  readonly className?: string;
  /** Optional logo node placed above the card title */
  readonly logo?: ReactNode;
  /** Optional icon node placed above the card title (alias for logo) */
  readonly icon?: ReactNode;
  /** Whether to render within a full-viewport vertically centered page shell */
  readonly fullPage?: boolean;
}

export const AuthCard: React.FC<AuthCardProps> = ({
  title,
  subtitle,
  errorMsg,
  children,
  footer,
  brand,
  theme,
  className = "",
  logo,
  icon,
  fullPage = false,
}) => {
  const cardElement = (
    <div
      data-brand={brand}
      data-theme={theme || brand}
      className={`dl-auth-card ${className}`.trim()}
    >
      <div className="dl-auth-header">
        {(logo || icon) && (
          <div className="dl-auth-icon-wrapper">{logo || icon}</div>
        )}
        <h2 className="dl-auth-title">{title}</h2>
        <p className="dl-auth-subtitle">{subtitle}</p>
      </div>

      {errorMsg && (
        <div
          role="alert"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-2, 0.5rem)",
            padding: "var(--space-3, 0.75rem)",
            marginBottom: "var(--space-4, 1rem)",
            backgroundColor: "rgba(239, 68, 68, 0.12)",
            border: "1px solid rgba(239, 68, 68, 0.35)",
            borderRadius:
              "var(--radius-md, calc(var(--radius, 0.75rem) * 0.75))",
            color: "var(--destructive, #fca5a5)",
            fontSize: "var(--label-font-size, 0.8125rem)",
          }}
        >
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{errorMsg}</span>
        </div>
      )}

      {children}

      {footer && <div className="dl-auth-footer">{footer}</div>}
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: AUTH_STYLES }} />
      {fullPage ? (
        <div
          data-brand={brand}
          data-theme={theme || brand}
          className="dl-auth-page"
        >
          {cardElement}
        </div>
      ) : (
        cardElement
      )}
    </>
  );
};
