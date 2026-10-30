import React from "react";
import Link from "next/link";
import { Badge } from "@yuva-devlab/ui";
import type { ComponentMeta, ComponentCategory } from "../config/meta-types";

export interface HomeCatalogProps {
  totalComponents: number;
  groupedComponents: Record<ComponentCategory, ComponentMeta[]>;
}

/**
 * Server component rendering the categorized component directory on the homepage.
 */
export function HomeCatalog({
  totalComponents,
  groupedComponents,
}: HomeCatalogProps) {
  const categories = Object.keys(groupedComponents) as ComponentCategory[];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Component Directory
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Explore all {totalComponents} primitives grouped by functional
            domain.
          </p>
        </div>
        <Badge variant="outline" className="font-mono text-xs">
          {totalComponents} Components
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const comps = groupedComponents[category] || [];
          return (
            <div
              key={category}
              className="border border-border/80 rounded-xl p-5 bg-card/40 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <h3 className="font-semibold text-sm text-foreground">
                  {category}
                </h3>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {comps.length}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {comps.map((c) => (
                  <Link
                    key={c.slug}
                    href={c.href}
                    className="p-2 rounded-lg bg-muted/30 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition text-xs font-medium text-foreground hover:text-primary truncate block"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
