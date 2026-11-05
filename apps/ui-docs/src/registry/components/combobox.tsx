"use client";

import { Combobox } from "@yuva-devlab/ui";
import { ComponentView } from "@/components/component-view";

/**
 * Interactive documentation for Combobox.
 */
export default function ComboboxDoc() {
  return (
    <ComponentView
      title="Combobox"
      category="Data Entry"
      description="Searchable single-value picker with keyboard navigation and a popover list."
      preview={
        <Combobox
          options={[
            { label: "GPT-4.1", value: "gpt-4.1" },
            { label: "Claude Sonnet", value: "claude-sonnet" },
            { label: "Gemini Pro", value: "gemini-pro" },
          ]}
          placeholder="Choose a model..."
        />
      }
      codeSnippet={
        '<Combobox options={models} value={model} onChange={setModel} placeholder="Choose a model..." />'
      }
      propsList={[
        {
          name: "options",
          type: "SearchableSelectOption[]",
          default: "—",
          description: "Options include a visible label and unique value.",
        },
        {
          name: "value",
          type: "string",
          default: "—",
          description: "Currently selected option value.",
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          default: "—",
          description: "Called when an option is selected.",
        },
        {
          name: "searchPlaceholder",
          type: "string",
          default: '"Search..."',
          description: "Placeholder shown in the search input.",
        },
      ]}
    />
  );
}
