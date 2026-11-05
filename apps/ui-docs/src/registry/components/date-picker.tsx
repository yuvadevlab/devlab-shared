import type { Metadata } from "next";
import { getComponentMetadata } from "@/services/metadata-service";
import { ComponentDocView } from "@/components/component-doc-view";
import {
  DATE_PICKER_VARIANTS,
  DATE_PICKER_PROPS,
  DATE_PICKER_CSS,
} from "@/registry/components/date-picker-doc-data";

export const metadata: Metadata = getComponentMetadata("date-picker");

/**
 * Ultra-thin page route wrapper for the DatePicker component documentation.
 * Follows the FinAI / OrchestrAI SSR architecture with server syntax highlighting.
 */
export default function DatePickerDocPage() {
  return (
    <ComponentDocView
      component={{
        slug: "date-picker",
        title: "Date Picker",
        description:
          "Accessible date selection components supporting popover calendar flyouts, inline persistent calendars, clearable dates, and disabled states.",
        category: "Data Entry",
        variants: DATE_PICKER_VARIANTS,
        propsList: DATE_PICKER_PROPS,
        cssClasses: DATE_PICKER_CSS,
      }}
    />
  );
}
