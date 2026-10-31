"use client";

import React from "react";
import { SecretRevealCard } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for SecretRevealCard component showcasing one-time API keys and sensitive tokens.
 */
export default function SecretRevealCardDocPage() {
  const secretKey = "dl_sec_98f12a3d7e8b4c09a82e1147fa03c89b";
  const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dl_access_token";

  const variants: ComponentVariant[] = [
    {
      id: "apikey",
      title: "One-Time Secret Reveal",
      description:
        "Masks sensitive secrets with click-to-reveal toggle and one-click copy feedback.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <SecretRevealCard
            secret={secretKey}
            warningMessage="This token is displayed only once. Please store it in your environment vault immediately."
            copyLabel="Copy Key"
          />
        </div>
      ),
      codeSnippet: `<SecretRevealCard
  secret="dl_sec_98f12a3d7e8b4c09a82e1147fa03c89b"
  warningMessage="This token is displayed only once. Store it securely."
  copyLabel="Copy Key"
/>`,
    },
    {
      id: "token",
      title: "Compact Bearer Token",
      description:
        "Clean credential disclosure without custom warning text for developer settings pages.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <SecretRevealCard secret={jwtToken} copyLabel="Copy Token" />
        </div>
      ),
      codeSnippet: `<SecretRevealCard
  secret="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dl_access_token"
  copyLabel="Copy Token"
/>`,
    },
  ];

  const propsList = [
    {
      name: "secret",
      type: "string",
      default: "undefined",
      description: "The sensitive token or secret string to display.",
    },
    {
      name: "warningMessage",
      type: "string",
      default:
        '"One-time reveal. Please copy and store this credential securely before closing."',
      description: "Warning message text displayed at the top of the card.",
    },
    {
      name: "copyLabel",
      type: "string",
      default: '"Copy Secret"',
      description: "Text label displayed inside the integrated CopyButton.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-secret-reveal",
      description:
        "Secure card container with border, radius, and warning styling.",
    },
    {
      name: ".dl-secret-reveal-value",
      description: "Monospace secret value text.",
    },
  ];

  return (
    <ComponentView
      title="Secret Reveal Card"
      description="A secure card for presenting sensitive credentials (API keys, webhooks, auth secrets) with built-in copy controls."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
