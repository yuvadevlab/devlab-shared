import type { ReactNode } from "react";
import type { ComponentCategory } from "../config/meta-types";

/**
 * Specification for a single component property in the API reference table.
 */
export interface PropDefinition {
  name: string;
  type: string;
  default?: string;
  description: string;
}

/**
 * Specification for a scoped CSS class token in the design system reference table.
 */
export interface CssClassDefinition {
  name: string;
  description: string;
}

/**
 * Representation of a single interactive component variant / usage demo.
 */
export interface ComponentVariant {
  id?: string;
  title: string;
  description?: string;
  preview: ReactNode;
  codeSnippet: string;
  highlightedHtml?: string;
}

/**
 * Full documentation document for a DevLab UI component.
 */
export interface ComponentDoc {
  slug: string;
  title: string;
  description: string;
  category: ComponentCategory;
  variants: ComponentVariant[];
  propsList: PropDefinition[];
  cssClasses?: CssClassDefinition[];
}
