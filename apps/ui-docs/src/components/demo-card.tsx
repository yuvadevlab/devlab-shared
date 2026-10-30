import React from "react";
import { Code2 } from "lucide-react";
import type { ComponentVariant } from "../types/component-doc";
import { CopyCodeButton } from "./copy-code-button";

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
    <div
      id={id}
      className="border border-border rounded-xl bg-card overflow-hidden shadow-xs scroll-mt-24 transition-all hover:border-primary/40"
    >
      {/* Interactive Preview Canvas */}
      <div className="p-6 md:p-8 flex items-center justify-center min-h-45 bg-muted/10 border-b border-border">
        <div className="w-full flex justify-center items-center">
          {variant.preview}
        </div>
      </div>

      {/* Meta & Actions Bar */}
      <div className="px-5 py-4 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-foreground tracking-tight flex items-center gap-2">
            <span>{variant.title}</span>
          </h4>
          {variant.description && (
            <p className="text-xs text-muted-foreground leading-relaxed">
              {variant.description}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
          <CopyCodeButton code={variant.codeSnippet} />
        </div>
      </div>

      {/* Native Zero-JS Accessible Code Disclosure */}
      <details className="group border-t border-border">
        <summary className="flex items-center justify-between px-5 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer select-none bg-muted/20 hover:bg-muted/40 transition-colors list-none">
          <span className="flex items-center gap-1.5">
            <Code2 className="size-3.5" />
            <span>View Source</span>
          </span>
          <span className="text-[10px] text-muted-foreground transition-transform group-open:rotate-180">
            ▼
          </span>
        </summary>

        <div className="bg-muted/40 p-4 border-t border-border overflow-x-auto font-mono text-xs">
          {variant.highlightedHtml ? (
            <div
              className="[&>pre]:p-0 [&>pre]:m-0 [&>pre]:bg-transparent overflow-x-auto text-xs"
              dangerouslySetInnerHTML={{ __html: variant.highlightedHtml }}
            />
          ) : (
            <pre className="text-foreground whitespace-pre m-0">
              {variant.codeSnippet}
            </pre>
          )}
        </div>
      </details>
    </div>
  );
}
