import React from "react";
import { Badge } from "@yuva-devlab/ui";
import type { ComponentCategory } from "@/config/meta-types";

export interface ComponentHeaderProps {
  title: string;
  description: string;
  category?: ComponentCategory | string;
  variantCount?: number;
}

/**
 * Server component rendering the hero header section for a component documentation page.
 * Displays category badge, pure-CSS tag, variant count, component name, and description.
 */
export function ComponentHeader({
  title,
  description,
  category,
  variantCount = 0,
}: ComponentHeaderProps) {
  return (
    <header className="space-y-3 border-b pb-8 border-border">
      <div className="flex items-center gap-2 flex-wrap">
        {category && (
          <Badge
            variant="secondary"
            className="text-xs uppercase tracking-wider font-semibold"
          >
            {category}
          </Badge>
        )}
        <Badge variant="outline" className="text-xs">
          Pure CSS Scoped
        </Badge>
        {variantCount > 1 && (
          <Badge variant="outline" className="text-xs text-primary font-mono">
            {variantCount} Variants
          </Badge>
        )}
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
        {title}
      </h1>

      <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
        {description}
      </p>
    </header>
  );
}
