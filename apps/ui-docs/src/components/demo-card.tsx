"use client";

import React, { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";
import { Button } from "@yuva-devlab/ui";

export interface ComponentVariant {
  id?: string;
  title: string;
  description?: string;
  preview: React.ReactNode;
  codeSnippet: string;
}

interface DemoCardProps {
  variant: ComponentVariant;
  index: number;
}

export function DemoCard({ variant, index }: DemoCardProps) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(variant.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      <div className="px-5 py-4 bg-card flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60">
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
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-7 px-2.5 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
            title="Copy code"
          >
            {copied ? (
              <Check className="size-3 text-success" />
            ) : (
              <Copy className="size-3" />
            )}
            <span className="hidden sm:inline">
              {copied ? "Copied" : "Copy"}
            </span>
          </Button>

          <Button
            variant={showCode ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setShowCode(!showCode)}
            className="h-7 px-2.5 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
            title={showCode ? "Hide code" : "Show code"}
          >
            <Code2 className="size-3.5" />
            <span className="hidden sm:inline">
              {showCode ? "Hide Code" : "Code"}
            </span>
          </Button>
        </div>
      </div>

      {/* Expandable Code Snippet */}
      {showCode && (
        <div className="bg-muted/40 p-4 border-t border-border overflow-x-auto font-mono text-xs animate-in fade-in-50 duration-150">
          <pre className="text-foreground whitespace-pre">
            {variant.codeSnippet}
          </pre>
        </div>
      )}
    </div>
  );
}
