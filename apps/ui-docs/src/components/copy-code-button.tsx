"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@yuva-devlab/ui";

export interface CopyCodeButtonProps {
  code: string;
  className?: string;
}

/**
 * Client island button component for copying code snippets to clipboard.
 * Features an animated transition to a checkmark confirmation upon success.
 */
export function CopyCodeButton({ code, className }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className={`dl-copy-code-btn ${className ?? ""}`.trim()}
      title="Copy code to clipboard"
    >
      {copied ? (
        <Check className="dl-copy-code-btn__icon dl-copy-code-btn__icon--success" />
      ) : (
        <Copy className="dl-copy-code-btn__icon" />
      )}
      <span className="dl-copy-code-btn__label">
        {copied ? "Copied" : "Copy"}
      </span>
    </Button>
  );
}
