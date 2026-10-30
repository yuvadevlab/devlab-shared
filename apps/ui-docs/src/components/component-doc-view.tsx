import React from "react";
import type { ComponentDoc } from "@/types/component-doc";
import { ComponentHeader } from "@/components/component-header";
import { ComponentApiSection } from "@/components/component-api-section";
import { InteractiveVariantsSection } from "@/components/interactive-variants-section";

export interface ComponentDocViewProps {
  component: ComponentDoc;
}

/**
 * Master server component view for rendering a component's documentation page.
 * Assembles the server-rendered header, interactive variant stack, and API reference tables.
 */
export function ComponentDocView({ component }: ComponentDocViewProps) {
  return (
    <article className="space-y-12 pb-16">
      <ComponentHeader
        title={component.title}
        description={component.description}
        category={component.category}
        variantCount={component.variants.length}
      />

      <InteractiveVariantsSection variants={component.variants} />

      <ComponentApiSection
        propsList={component.propsList}
        cssClasses={component.cssClasses}
      />
    </article>
  );
}
