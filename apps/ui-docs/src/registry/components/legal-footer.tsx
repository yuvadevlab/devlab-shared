"use client";

import React from "react";
import { LegalFooter } from "@yuva-devlab/ui";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for LegalFooter component showcasing enterprise legal,
 * copyright, and compliance footers.
 */
export default function LegalFooterDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "login",
      title: "Authentication & Login View",
      description:
        "Centered legal footer designed for login cards, SSO handoff screens, and public landing pages.",
      preview: (
        <div className="w-full max-w-md rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm">
          <LegalFooter
            appName="DevLab Portal"
            variant="login"
            showLinks={true}
          />
        </div>
      ),
      codeSnippet: `<LegalFooter
  appName="DevLab Portal"
  variant="login"
  showLinks={true}
/>`,
    },
    {
      id: "branded-login",
      title: "FinAI Branded Auth Variant",
      description:
        "Demonstrates automatic host theme adoption when rendered with application branding.",
      preview: (
        <div className="w-full max-w-md rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-sm">
          <LegalFooter appName="FinAI" variant="login" showLinks={true} />
        </div>
      ),
      codeSnippet: `<LegalFooter
  appName="FinAI"
  variant="login"
  showLinks={true}
/>`,
    },
    {
      id: "sidebar",
      title: "Sidebar Navigation Rail Footer",
      description:
        "Compact single-row layout docked at the base of desktop and tablet navigation sidebars.",
      preview: (
        <div className="w-64 rounded-lg border border-border/80 bg-card/60">
          <div className="p-3 text-xs text-muted-foreground">
            Navigation Rail
          </div>
          <LegalFooter
            appName="OrchestrAI"
            version="v1.2.0"
            variant="sidebar"
          />
        </div>
      ),
      codeSnippet: `<LegalFooter
  appName="OrchestrAI"
  version="v1.2.0"
  variant="sidebar"
/>`,
    },
    {
      id: "settings",
      title: "Settings & System Telemetry Drawer",
      description:
        "Structured platform summary block suitable for settings views and about drawers.",
      preview: (
        <div className="w-80 rounded-lg border border-border/80 bg-card/60 p-4">
          <LegalFooter
            appName="VitalAI Enterprise"
            version="v2.1.0-prod"
            variant="settings"
          />
        </div>
      ),
      codeSnippet: `<LegalFooter
  appName="VitalAI Enterprise"
  version="v2.1.0-prod"
  variant="settings"
/>`,
    },
    {
      id: "minimal",
      title: "Minimal Copyright Only",
      description:
        "Simplified single-line notice without navigation links for clean embedded views.",
      preview: (
        <div className="w-full max-w-md p-2">
          <LegalFooter variant="login" showLinks={false} />
        </div>
      ),
      codeSnippet: `<LegalFooter
  variant="login"
  showLinks={false}
/>`,
    },
  ];

  const propsList = [
    {
      name: "appName",
      type: "string",
      default: "undefined",
      description: "Host application title (e.g., 'FinAI', 'OrchestrAI').",
    },
    {
      name: "version",
      type: "string",
      default: "undefined",
      description: "Semver build or release tag (e.g., 'v1.0.0').",
    },
    {
      name: "companyName",
      type: "string",
      default: '"Yuva Devlab"',
      description: "Legal entity or organization name.",
    },
    {
      name: "variant",
      type: '"login" | "sidebar" | "settings"',
      default: '"login"',
      description: "Visual placement and layout variant.",
    },
    {
      name: "showLinks",
      type: "boolean",
      default: "true",
      description: "Whether to render Privacy, Terms, and Security links.",
    },
    {
      name: "termsHref",
      type: "string",
      default: '"#"',
      description: "Custom URL for Terms of Service.",
    },
    {
      name: "privacyHref",
      type: "string",
      default: '"#"',
      description: "Custom URL for Privacy Policy.",
    },
    {
      name: "securityHref",
      type: "string",
      default: '"#"',
      description: "Custom URL for Security page.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-legal-footer",
      description: "Base container applying theme typography and token colors.",
    },
    {
      name: ".dl-legal-footer--login",
      description: "Centered vertical stack for authentication flows.",
    },
    {
      name: ".dl-legal-footer--sidebar",
      description: "Horizontal flex row docked to navigation rail base.",
    },
    {
      name: ".dl-legal-footer--settings",
      description: "Structured telemetry block with version badge styling.",
    },
  ];

  return (
    <ComponentView
      title="Legal Footer"
      description="Universal enterprise legal, copyright, and compliance footer. Dynamically adapts to host theme tokens, typography, and dark mode."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
