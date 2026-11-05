"use client";

import { NativeSelect } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";

/**
 * Interactive documentation for NativeSelect.
 */
export default function NativeSelectDoc() {
  return (
    <ComponentView
      title="Native Select"
      category="Data Entry"
      description="Token-styled native select control with browser form behavior."
      preview={
        <NativeSelect defaultValue="staging">
          <option value="development">Development</option>
          <option value="staging">Staging</option>
          <option value="production">Production</option>
        </NativeSelect>
      }
      codeSnippet={
        '<NativeSelect defaultValue="staging"><option value="staging">Staging</option><option value="production">Production</option></NativeSelect>'
      }
      propsList={[
        {
          name: "value",
          type: "string",
          default: "—",
          description: "Selected option in controlled mode.",
        },
        {
          name: "defaultValue",
          type: "string",
          default: "—",
          description: "Initial option in uncontrolled mode.",
        },
        {
          name: "children",
          type: "ReactNode",
          default: "—",
          description: "Native option elements.",
        },
      ]}
    />
  );
}
