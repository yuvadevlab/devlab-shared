"use client";

import React, { useState } from "react";
import { Badge, Button } from "@yuva-devlab/ui";
import { DemoCard, type ComponentVariant } from "@/components/demo-card";
import {
  ApiTable,
  type PropDefinition,
  type CssClassDefinition,
} from "@/components/api-table";

export type { ComponentVariant, PropDefinition, CssClassDefinition };

export interface ComponentViewProps {
  title: string;
  description: string;
  category?: string;
  variants?: ComponentVariant[];
  preview?: React.ReactNode;
  codeSnippet?: string;
  propsList: PropDefinition[];
  cssClasses?: CssClassDefinition[];
}

export function ComponentView({
  title,
  description,
  category,
  variants,
  preview,
  codeSnippet,
  propsList,
  cssClasses,
}: ComponentViewProps) {
  // Normalize variants list
  const allVariants: ComponentVariant[] =
    variants && variants.length > 0
      ? variants
      : preview && codeSnippet
        ? [
            {
              id: "basic",
              title: "Basic Usage",
              description: `Standard default implementation of the ${title} component.`,
              preview,
              codeSnippet,
            },
          ]
        : [];

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const displayedVariants =
    activeFilter === "all"
      ? allVariants
      : allVariants.filter(
          (v, idx) => (v.id || `variant-${idx}`) === activeFilter,
        );

  return (
    <div className="space-y-12 pb-16">
      {/* Header Info */}
      <div className="space-y-3 border-b pb-8 border-border">
        <div className="flex items-center gap-2">
          {category && (
            <Badge
              variant="secondary"
              className="text-xs uppercase tracking-wider"
            >
              {category}
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            Pure CSS Scoped
          </Badge>
          {allVariants.length > 1 && (
            <Badge variant="outline" className="text-xs text-primary font-mono">
              {allVariants.length} Variants
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          {title}
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
          {description}
        </p>
      </div>

      {/* Examples & Variants Section (Ant Design style) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/60 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Examples & Variants
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Explore interactive use cases and component variants.
            </p>
          </div>

          {/* Quick Filter / Jump Pills */}
          {allVariants.length > 1 && (
            <div className="flex items-center gap-1.5 flex-wrap">
              <Button
                variant={activeFilter === "all" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter("all")}
                className="h-7 text-xs px-2.5 rounded-full"
              >
                All ({allVariants.length})
              </Button>
              {allVariants.map((v, i) => {
                const vid = v.id || `variant-${i}`;
                return (
                  <Button
                    key={vid}
                    variant={activeFilter === vid ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setActiveFilter(vid)}
                    className="h-7 text-xs px-2.5 rounded-full"
                  >
                    {v.title}
                  </Button>
                );
              })}
            </div>
          )}
        </div>

        {/* Demo Cards Stack */}
        <div className="space-y-6">
          {displayedVariants.map((variant, index) => (
            <DemoCard
              key={variant.id || `card-${index}`}
              variant={variant}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* API Reference & CSS Classes */}
      <ApiTable propsList={propsList} cssClasses={cssClasses} />
    </div>
  );
}
