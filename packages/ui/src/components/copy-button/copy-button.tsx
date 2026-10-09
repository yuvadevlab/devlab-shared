"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../../lib/utils";

export interface CopyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Text content to write to user clipboard */
  readonly textToCopy: string;
  /** Label when in default idle state */
  readonly label?: string;
  /** Label shown upon successful copy */
  readonly copiedLabel?: string;
  /** Duration in milliseconds to maintain copied feedback (default 2000) */
  readonly resetTimeoutMs?: number;
}

/**
 * CopyButton component provides one-click clipboard copying with animated feedback.
 *
 * @example
 * ```tsx
 * <CopyButton textToCopy="dl_live_9a8f...bc01" label="Copy Key" />
 * ```
 */
export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      textToCopy,
      label = "Copy",
      copiedLabel = "Copied",
      resetTimeoutMs = 2000,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), resetTimeoutMs);
      } catch {
        // Fallback for non-secure contexts if needed
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "dl-copy-button",
          isCopied && "dl-copy-button--copied",
          className,
        )}
        onClick={handleCopy}
        {...props}
      >
        {isCopied ? (
          <Check className="dl-copy-button__icon" />
        ) : (
          <Copy className="dl-copy-button__icon" />
        )}
        <span>{isCopied ? copiedLabel : label}</span>
      </button>
    );
  },
);
CopyButton.displayName = "CopyButton";
