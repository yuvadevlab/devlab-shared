"use client";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Input,
} from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";

/**
 * Interactive documentation for the Field component family.
 */
export default function FieldDoc() {
  return (
    <ComponentView
      title="Field"
      category="Data Entry"
      description="Composes a form control with its label, description, and validation message."
      preview={
        <Field className="dl-story-w-sm">
          <FieldLabel htmlFor="docs-email">Email address</FieldLabel>
          <Input id="docs-email" type="email" placeholder="name@example.com" />
          <FieldDescription>
            Used only for account notifications.
          </FieldDescription>
          <FieldError />
        </Field>
      }
      codeSnippet={
        '<Field><FieldLabel htmlFor="email">Email</FieldLabel><Input id="email" /><FieldDescription>Account notices only.</FieldDescription></Field>'
      }
      propsList={[
        {
          name: "Field",
          type: "HTMLAttributes<HTMLDivElement>",
          default: "—",
          description: "Vertical layout for a single control and its metadata.",
        },
        {
          name: "FieldLabel",
          type: "LabelHTMLAttributes<HTMLLabelElement>",
          default: "—",
          description: "Label with native htmlFor association.",
        },
        {
          name: "FieldDescription",
          type: "HTMLAttributes<HTMLParagraphElement>",
          default: "—",
          description: "Supporting guidance.",
        },
        {
          name: "FieldError",
          type: "HTMLAttributes<HTMLParagraphElement>",
          default: "—",
          description: "Validation message announced with role=alert.",
        },
      ]}
    />
  );
}
