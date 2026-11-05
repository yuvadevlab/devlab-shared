"use client";

import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";
import { InlineCitationExample } from "@/registry/examples/inline-citation-example";
import { inlineCitationExample } from "@/registry/examples/inline-citation-source";

/**
 * Interactive documentation for InlineCitation.
 */
export default function InlineCitationDoc() {
  const variants: ComponentVariant[] = [
    {
      id: "source-hover-citations",
      title: "Source hover cards in generated text",
      description:
        "Show source domains inline, reveal a title and description on hover, and keep indexed citations available for generated answers.",
      preview: <InlineCitationExample />,
      codeSnippet: inlineCitationExample,
    },
  ];

  return (
    <ComponentView
      title="Inline Citation"
      category="AI Elements"
      description="Composable source citations with a themed hover preview and an indexed reference for generated text."
      variants={variants}
      propsList={[
        {
          name: "index",
          type: "number",
          default: "—",
          description: "Displayed source index.",
        },
        {
          name: "title",
          type: "string",
          default: "—",
          description: "Source title shown as tooltip text.",
        },
        {
          name: "url",
          type: "string",
          default: "—",
          description: "Optional source URL.",
        },
        {
          name: "onCitationClick",
          type: "(index: number) => void",
          default: "—",
          description: "Optional navigation or preview callback.",
        },
      ]}
    />
  );
}
