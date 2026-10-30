import React from "react";
import { Sparkles, ArrowRight, Trash2, Send } from "lucide-react";
import { Button } from "@yuva-devlab/ui";
import type {
  ComponentVariant,
  PropDefinition,
  CssClassDefinition,
} from "../../../types/component-doc";

export const BUTTON_VARIANTS: ComponentVariant[] = [
  {
    id: "styles",
    title: "Style Variants",
    description:
      "AntD-inspired style taxonomy: Default (Primary), Secondary, Outline, Ghost, Destructive, and Link.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link Style</Button>
      </div>
    ),
    codeSnippet: `<Button variant="default">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link Style</Button>`,
  },
  {
    id: "sizes",
    title: "Sizes (Small, Default, Large, Icon)",
    description:
      "Consistent standard sizes across all layouts: sm (2rem), default (2.25rem), lg (2.5rem), and square icon.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="sm">Small (sm)</Button>
        <Button size="default">Default (md)</Button>
        <Button size="lg">Large (lg)</Button>
        <Button size="icon" variant="outline" aria-label="Sparkles Action">
          <Sparkles className="size-4" />
        </Button>
      </div>
    ),
    codeSnippet: `<Button size="sm">Small (sm)</Button>
<Button size="default">Default (md)</Button>
<Button size="lg">Large (lg)</Button>
<Button size="icon" variant="outline"><Sparkles className="size-4" /></Button>`,
  },
  {
    id: "icons",
    title: "With Icons & Actions",
    description:
      "Buttons enriched with leading, trailing, or standalone action icons.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button className="gap-2">
          <Sparkles className="size-4" />
          <span>Generate with AI</span>
        </Button>
        <Button variant="secondary" className="gap-2">
          <span>Continue</span>
          <ArrowRight className="size-4" />
        </Button>
        <Button variant="outline" className="gap-2">
          <Send className="size-4" />
          <span>Send Email</span>
        </Button>
        <Button variant="destructive" className="gap-2">
          <Trash2 className="size-4" />
          <span>Delete</span>
        </Button>
      </div>
    ),
    codeSnippet: `<Button className="gap-2">
  <Sparkles className="size-4" />
  <span>Generate with AI</span>
</Button>
<Button variant="secondary" className="gap-2">
  <span>Continue</span>
  <ArrowRight className="size-4" />
</Button>`,
  },
  {
    id: "disabled",
    title: "Disabled State",
    description:
      "Non-interactive state with 50% opacity and disabled cursor preventing click handlers.",
    preview: (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button disabled variant="default">
          Disabled Primary
        </Button>
        <Button disabled variant="secondary">
          Disabled Secondary
        </Button>
        <Button disabled variant="outline">
          Disabled Outline
        </Button>
        <Button disabled size="icon" variant="outline">
          <Sparkles className="size-4" />
        </Button>
      </div>
    ),
    codeSnippet: `<Button disabled variant="default">Disabled Primary</Button>
<Button disabled variant="secondary">Disabled Secondary</Button>
<Button disabled variant="outline">Disabled Outline</Button>`,
  },
];

export const BUTTON_PROPS: PropDefinition[] = [
  {
    name: "variant",
    type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
    default: '"default"',
    description: "Visual style variant mapped to scoped dl-btn--* rules.",
  },
  {
    name: "size",
    type: '"default" | "sm" | "lg" | "icon"',
    default: '"default"',
    description: "Dimensions and padding preset for the button element.",
  },
  {
    name: "asChild",
    type: "boolean",
    default: "false",
    description:
      "Delegates rendering to child element via Radix Slot (e.g. Next.js Link).",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "Disables interaction and displays cursor: not-allowed.",
  },
];

export const BUTTON_CSS: CssClassDefinition[] = [
  {
    name: ".dl-btn",
    description: "Base button container establishing focus ring and flexbox.",
  },
  {
    name: ".dl-btn--default",
    description: "Primary theme background and text.",
  },
  {
    name: ".dl-btn--secondary",
    description: "Secondary background and surface contrast.",
  },
  {
    name: ".dl-btn--outline",
    description: "Transparent background with 1px border.",
  },
  {
    name: ".dl-btn--destructive",
    description: "Destructive error status background.",
  },
  {
    name: ".dl-btn--ghost",
    description: "Transparent surface displaying background on hover.",
  },
];
