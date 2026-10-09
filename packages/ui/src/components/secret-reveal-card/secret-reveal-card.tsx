"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { CopyButton } from "../copy-button";
import { cn } from "../../lib/utils";

export interface SecretRevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The sensitive secret or API key to reveal */
  readonly secret: string;
  /** Custom warning message (default informs about one-time reveal) */
  readonly warningMessage?: string;
  /** Label for copy button */
  readonly copyLabel?: string;
}

/**
 * SecretRevealCard component securely displays newly provisioned API keys and secrets
 * with copy capabilities and one-time retrieval warnings.
 *
 * @example
 * ```tsx
 * <SecretRevealCard
 *   secret="dl_live_49f82bc9..."
 *   warningMessage="Copy this key now. It is hashed with SHA-256 and will never be shown again."
 * />
 * ```
 */
export const SecretRevealCard = React.forwardRef<
  HTMLDivElement,
  SecretRevealCardProps
>(
  (
    {
      secret,
      warningMessage = "One-time reveal. Please copy and store this credential securely before closing.",
      copyLabel = "Copy Secret",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("dl-secret-reveal", className)} {...props}>
        {warningMessage && (
          <div className="dl-secret-reveal__warning">
            <AlertTriangle className="shrink-0 size-4" />
            <span>{warningMessage}</span>
          </div>
        )}
        <div className="dl-secret-reveal__code-wrap">
          <code className="dl-secret-reveal__code">{secret}</code>
          <CopyButton textToCopy={secret} label={copyLabel} />
        </div>
      </div>
    );
  },
);
SecretRevealCard.displayName = "SecretRevealCard";
