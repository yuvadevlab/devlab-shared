import React from "react";
import { Badge } from "@yuva-devlab/ui";
import { CopyCodeButton } from "./copy-code-button";
import type { InstallationStep } from "../services/docs-service";

export interface InstallationViewProps {
  steps: InstallationStep[];
}

/**
 * Pure React Server Component rendering the installation and setup guide.
 * Utilizes pre-highlighted Shiki HTML blocks for zero runtime overhead.
 */
export function InstallationView({
  steps,
}: InstallationViewProps): React.JSX.Element {
  return (
    <div className="space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2 border-b border-border pb-6">
        <Badge variant="secondary" className="text-xs">
          Guide
        </Badge>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Installation & Setup
        </h1>
        <p className="text-muted-foreground text-sm max-w-2xl">
          Complete guide to integrating DevLab UI and tokens into your Next.js
          or React applications.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {steps.map((step) => (
          <section key={step.id} className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">{step.title}</h2>
            {step.description && (
              <p className="text-xs text-muted-foreground">
                {step.description}
              </p>
            )}
            <div className="relative group rounded-xl border border-border bg-muted/40 overflow-hidden shadow-xs">
              <div className="absolute right-3 top-3 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <CopyCodeButton code={step.codeSnippet} />
              </div>
              {step.highlightedHtml ? (
                <div
                  className="p-4 text-xs font-mono overflow-x-auto [&_pre]:!bg-transparent [&_pre]:!p-0 [&_code]:!bg-transparent"
                  dangerouslySetInnerHTML={{ __html: step.highlightedHtml }}
                />
              ) : (
                <pre className="p-4 text-xs font-mono overflow-x-auto whitespace-pre">
                  <code>{step.codeSnippet}</code>
                </pre>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
