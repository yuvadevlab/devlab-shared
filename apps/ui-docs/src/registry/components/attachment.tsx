"use client";

import { Attachment } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";
import { createExampleSource } from "@/lib/create-example-source";

/**
 * Interactive documentation for Attachment.
 */
export default function AttachmentDoc() {
  return (
    <ComponentView
      title="Attachment"
      category="AI Elements"
      description="File attachment preview with optional open and remove actions."
      preview={
        <Attachment name="schema.prisma" size="2 KB" onRemove={() => {}} />
      }
      codeSnippet={createExampleSource({
        imports: ["Attachment"],
        body: `<Attachment
  name="schema.prisma"
  size="2 KB"
  onRemove={() => console.log("Remove attachment")}
/>`,
      })}
      propsList={[
        {
          name: "name",
          type: "string",
          default: "—",
          description: "File name shown in the attachment.",
        },
        {
          name: "href",
          type: "string",
          default: "—",
          description: "Optional destination or download URL.",
        },
        {
          name: "size",
          type: "string",
          default: "—",
          description: "Optional formatted file size.",
        },
        {
          name: "onRemove",
          type: "() => void",
          default: "—",
          description: "When provided, renders a remove button.",
        },
      ]}
    />
  );
}
