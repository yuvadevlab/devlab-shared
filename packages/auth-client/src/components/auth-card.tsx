/**
 * @file packages/auth-client/src/components/auth-card.tsx
 * @description Standardized card wrapper and error banner adopting consumer app theme tokens.
 * @module @yuva-devlab/auth-client
 */

import React, { type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import type { AuthLegalConfig } from "@/types";
import { AuthLegalFooter } from "./auth-legal-footer";
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
  /** Optional legal configuration for the full-page footer */
  readonly legalConfig?: AuthLegalConfig;
  /** Optional custom legal footer node override */
  readonly legalFooter?: ReactNode;
  /** Whether to display the legal footer when fullPage is true (defaults to true) */
  readonly showLegalFooter?: boolean;
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
  legalConfig,
  legalFooter,
  showLegalFooter,
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
        <div role="alert" className="dl-auth-alert">
          <AlertCircle size={16} className="dl-auth-alert-icon" />
          <span>{errorMsg}</span>
        </div>
      )}

      {children}

      {footer && <div className="dl-auth-footer">{footer}</div>}
    </div>
  );

  const shouldRenderLegal = fullPage && (showLegalFooter ?? true);
  const legalElement = legalFooter ? (
    legalFooter
  ) : shouldRenderLegal ? (
    <AuthLegalFooter {...legalConfig} />
  ) : null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: AUTH_STYLES }} />
      {fullPage ? (
        <div
          data-brand={brand}
          data-theme={theme || brand}
          className="dl-auth-page"
        >
          <div className="dl-auth-page-main">{cardElement}</div>
          {legalElement && (
            <div className="dl-auth-page-footer">{legalElement}</div>
          )}
        </div>
      ) : (
        cardElement
      )}
    </>
  );
};
