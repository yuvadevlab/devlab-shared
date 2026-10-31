import React from "react";
import { Badge, Stack } from "@yuva-devlab/ui";
import { CopyCodeButton } from "@/components/copy-code-button";
import type { InstallationStep } from "@/services/docs-service";

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
    <div className="dl-guide-view">
      <Stack gap={10}>
        {/* Header */}
        <header className="dl-guide-header">
          <Stack gap={2}>
            <Badge variant="secondary" className="dl-guide-header__badge">
              Guide
            </Badge>
            <h1 className="dl-guide-header__title">Installation & Setup</h1>
            <p className="dl-guide-header__desc">
              Complete guide to integrating DevLab UI and tokens into your
              Next.js or React applications.
            </p>
          </Stack>
        </header>

        {/* Steps */}
        <Stack gap={8}>
          {steps.map((step) => (
            <section key={step.id}>
              <Stack gap={3}>
                <h2 className="dl-guide-step__title">{step.title}</h2>
                {step.description && (
                  <p className="dl-guide-step__desc">{step.description}</p>
                )}
                <div className="dl-code-block">
                  <div className="dl-code-block__action">
                    <CopyCodeButton code={step.codeSnippet} />
                  </div>
                  {step.highlightedHtml ? (
                    <div
                      className="dl-code-block__content"
                      dangerouslySetInnerHTML={{ __html: step.highlightedHtml }}
                    />
                  ) : (
                    <pre className="dl-code-block__raw">
                      <code>{step.codeSnippet}</code>
                    </pre>
                  )}
                </div>
              </Stack>
            </section>
          ))}
        </Stack>
      </Stack>
    </div>
  );
}
