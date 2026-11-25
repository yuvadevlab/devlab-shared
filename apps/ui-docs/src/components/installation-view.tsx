"use client";

import React from "react";
import { THEME_CONFIGS, type ThemeName } from "@yuva-devlab/tokens";
import { Badge, Stack } from "@yuva-devlab/ui";
import { CopyCodeButton } from "@/components/copy-code-button";
import { useTheme } from "@/components/theme-provider";
import type { InstallationStep } from "@/services/docs-service";

export interface InstallationViewProps {
  stepsByBrand: Record<ThemeName, InstallationStep[]>;
}

/**
 * Client view selecting the pre-highlighted installation guide for the active brand.
 */
export function InstallationView({
  stepsByBrand,
}: InstallationViewProps): React.JSX.Element {
  const { brand } = useTheme();
  const steps = stepsByBrand[brand] ?? stepsByBrand.orchestrai;
  const brandLabel = THEME_CONFIGS[brand]?.label ?? brand;

  return (
    <div className="dl-guide-view">
      <Stack gap={10}>
        <header className="dl-guide-header">
          <Stack gap={2}>
            <Badge variant="secondary" className="dl-guide-header__badge">
              Guide · {brandLabel}
            </Badge>
            <h1 className="dl-guide-header__title">Installation & Setup</h1>
            <p className="dl-guide-header__desc">
              Complete guide to integrating DevLab UI and design tokens using
              the active {brandLabel} theme preset.
            </p>
          </Stack>
        </header>

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
