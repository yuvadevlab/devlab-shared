"use client";

import { Item, ItemContent, ItemDescription, ItemTitle } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";

/**
 * Interactive documentation for Item.
 */
export default function ItemDoc() {
  return (
    <ComponentView
      title="Item"
      category="Data Display"
      description="Flexible row composed from media, content, and action regions."
      preview={
        <Item className="dl-story-w-md">
          <ItemContent>
            <ItemTitle>Deployment completed</ItemTitle>
            <ItemDescription>Production · 2 minutes ago</ItemDescription>
          </ItemContent>
        </Item>
      }
      codeSnippet={
        "<Item><ItemContent><ItemTitle>Deployment completed</ItemTitle><ItemDescription>Production · 2 minutes ago</ItemDescription></ItemContent></Item>"
      }
      propsList={[
        {
          name: "Item",
          type: "HTMLAttributes<HTMLDivElement>",
          default: "—",
          description: "Row container.",
        },
        {
          name: "ItemContent",
          type: "HTMLAttributes<HTMLDivElement>",
          default: "—",
          description: "Flexible text content region.",
        },
        {
          name: "ItemTitle",
          type: "HTMLAttributes<HTMLHeadingElement>",
          default: "—",
          description: "Primary item heading.",
        },
        {
          name: "ItemDescription",
          type: "HTMLAttributes<HTMLParagraphElement>",
          default: "—",
          description: "Supporting detail.",
        },
      ]}
    />
  );
}
