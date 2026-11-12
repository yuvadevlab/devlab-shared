/**
 * @file packages/auth-client/src/components/auth-legal-footer.tsx
 * @description Enterprise copyright, legal links, and compliance footer for auth views.
 * @module @yuva-devlab/auth-client
 */

import React from "react";
import type { AuthLegalConfig } from "@/types";

export interface AuthLegalFooterProps extends AuthLegalConfig {
  /** Optional custom CSS class name */
  readonly className?: string;
}

/**
 * Universal enterprise legal and compliance footer embedded into authentication page shells.
 */
export const AuthLegalFooter: React.FC<AuthLegalFooterProps> = ({
  appName,
  version,
  companyName = "Yuva Devlab",
  showLinks = true,
  termsHref = "#",
  privacyHref = "#",
  securityHref = "#",
  className = "",
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Legal and compliance navigation"
      className={`dl-auth-legal-footer ${className}`.trim()}
    >
      {showLinks && (
        <nav
          aria-label="Compliance links"
          className="dl-auth-legal-footer__links"
        >
          {appName && (
            <>
              <span className="dl-auth-legal-footer__app-name">
                {appName}
                {version ? ` ${version}` : ""}
              </span>
              <span
                className="dl-auth-legal-footer__divider"
                aria-hidden="true"
              >
                •
              </span>
            </>
          )}
          <a
            href={privacyHref}
            className="dl-auth-legal-footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <span className="dl-auth-legal-footer__divider" aria-hidden="true">
            •
          </span>
          <a
            href={termsHref}
            className="dl-auth-legal-footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          <span className="dl-auth-legal-footer__divider" aria-hidden="true">
            •
          </span>
          <a
            href={securityHref}
            className="dl-auth-legal-footer__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Security
          </a>
        </nav>
      )}
      <p className="dl-auth-legal-footer__copy">
        © {currentYear} {companyName}. All rights reserved.
      </p>
    </footer>
  );
};
