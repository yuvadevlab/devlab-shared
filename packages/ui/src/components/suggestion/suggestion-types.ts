import * as React from "react";

export interface SuggestionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Leading icon or visual */
  icon?: React.ReactNode;
  /** Primary suggestion text */
  label?: string;
  /** Optional secondary subtitle or category */
  description?: string;
}

export interface SuggestionListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout direction: wrap or horizontal scroll */
  layout?: "wrap" | "scroll";
}
