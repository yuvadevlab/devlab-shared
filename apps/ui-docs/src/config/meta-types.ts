export interface ComponentMeta {
  name: string;
  slug: string;
  href: string;
  category:
    | "General"
    | "Layout"
    | "Navigation"
    | "Data Entry"
    | "Data Display"
    | "Feedback & Overlays"
    | "Utility";
  description: string;
  keywords: string[];
}

export const ALL_CATEGORIES = [
  "General",
  "Layout",
  "Navigation",
  "Data Entry",
  "Data Display",
  "Feedback & Overlays",
  "Utility",
] as const;

export type ComponentCategory = (typeof ALL_CATEGORIES)[number];
