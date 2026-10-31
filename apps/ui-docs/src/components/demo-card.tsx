import React from "react";
import { Code2 } from "lucide-react";
import { Flex, Stack } from "@yuva-devlab/ui";
import type { ComponentVariant } from "@/types/component-doc";
import { CopyCodeButton } from "@/components/copy-code-button";

export type { ComponentVariant };

export interface DemoCardProps {
  variant: ComponentVariant;
  index: number;
}

/**
 * Server component rendering a demo showcase card for a component variant.
 * Features an interactive preview canvas, variant title/description, clipboard copy action,
 * and a server-rendered syntax highlighted disclosure block.
 */
export function DemoCard({ variant, index }: DemoCardProps) {
  const id = variant.id || `demo-${index}`;

  return (
    <div id={id} className="dl-demo-card">
      {/* Interactive Preview Canvas */}
      <div className="dl-demo-card__canvas">
        <Flex
          align="center"
          justify="center"
          className="dl-demo-card__canvas-inner"
        >
          {variant.preview}
        </Flex>
      </div>

      {/* Meta & Actions Bar */}
      <Flex align="center" justify="between" className="dl-demo-card__meta">
        <Stack gap={1} className="dl-demo-card__info">
          <h4 className="dl-demo-card__title">{variant.title}</h4>
          {variant.description && (
            <p className="dl-demo-card__desc">{variant.description}</p>
          )}
        </Stack>

        <div className="dl-demo-card__actions">
          <CopyCodeButton code={variant.codeSnippet} />
        </div>
      </Flex>

      {/* Native Zero-JS Accessible Code Disclosure */}
      <details className="dl-demo-card__disclosure">
        <summary className="dl-demo-card__summary">
          <Flex align="center" gap={2}>
            <Code2 className="dl-demo-card__icon-sm" />
            <span>View Source</span>
          </Flex>
          <span className="dl-demo-card__arrow">▼</span>
        </summary>

        <div className="dl-demo-card__code">
          {variant.highlightedHtml ? (
            <div
              className="dl-demo-card__code-highlighted"
              dangerouslySetInnerHTML={{ __html: variant.highlightedHtml }}
            />
          ) : (
            <pre className="dl-demo-card__code-raw">{variant.codeSnippet}</pre>
          )}
        </div>
      </details>
    </div>
  );
}
