import * as React from "react";
import { cn } from "@/lib/utils";

export interface LegalFooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional application name (e.g., "FinAI", "DevLab Portal", "OrchestrAI", "KnowledgeAI", "DevLab Logs") */
  readonly appName?: string;
  /** Optional semver or build tag (e.g., "v1.0.0") */
  readonly version?: string;
  /** Company or organization copyright holder (defaults to "Yuva Devlab") */
  readonly companyName?: string;
  /** Visual placement variant */
  readonly variant?: "login" | "sidebar" | "settings";
  /** Whether to render compliance and navigation links (Privacy, Terms, Security) */
  readonly showLinks?: boolean;
  /** Custom Terms URL */
  readonly termsHref?: string;
  /** Custom Privacy URL */
  readonly privacyHref?: string;
  /** Custom Security URL */
  readonly securityHref?: string;
}

/**
 * Universal enterprise legal and copyright footer.
 * Dynamically adapts to host theme tokens, typography, and dark mode.
 */
export const LegalFooter = React.forwardRef<HTMLElement, LegalFooterProps>(
  (
    {
      appName,
      version,
      companyName = "Yuva Devlab",
      variant = "login",
      showLinks = true,
      termsHref = "#",
      privacyHref = "#",
      securityHref = "#",
      className,
      ...props
    },
    ref,
  ) => {
    const currentYear = new Date().getFullYear();

    if (variant === "sidebar") {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn("dl-legal-footer dl-legal-footer--sidebar", className)}
          {...props}
        >
          <span>
            {appName ? `${appName} ${version ?? ""}`.trim() : (version ?? "")}
          </span>
          <span>
            © {currentYear} {companyName}
          </span>
        </div>
      );
    }

    if (variant === "settings") {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={cn("dl-legal-footer dl-legal-footer--settings", className)}
          {...props}
        >
          <div className="dl-legal-footer__meta-row">
            <span>{appName ?? companyName}</span>
            {version && (
              <span className="dl-legal-footer__version-badge">{version}</span>
            )}
          </div>
          <p className="dl-legal-footer__copyright">
            © {currentYear} {companyName}. All rights reserved.
          </p>
        </div>
      );
    }

    // Default: "login" variant
    return (
      <footer
        ref={ref}
        className={cn("dl-legal-footer dl-legal-footer--login", className)}
        {...props}
      >
        {showLinks && (
          <nav aria-label="Legal navigation" className="dl-legal-footer__links">
            {appName && (
              <span className="dl-legal-footer__app-name">{appName}</span>
            )}
            {appName && (
              <span className="dl-legal-footer__divider" aria-hidden="true">
                •
              </span>
            )}
            <a href={privacyHref} className="dl-legal-footer__link">
              Privacy
            </a>
            <span className="dl-legal-footer__divider" aria-hidden="true">
              •
            </span>
            <a href={termsHref} className="dl-legal-footer__link">
              Terms
            </a>
            <span className="dl-legal-footer__divider" aria-hidden="true">
              •
            </span>
            <a href={securityHref} className="dl-legal-footer__link">
              Security
            </a>
          </nav>
        )}
        <p className="dl-legal-footer__copyright">
          © {currentYear} {companyName}. All rights reserved.
        </p>
      </footer>
    );
  },
);

LegalFooter.displayName = "LegalFooter";
