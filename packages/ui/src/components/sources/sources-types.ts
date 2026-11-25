import * as React from "react";

/**
 * Canonical classification for grounded source references.
 */
export const SourceKind = {
  WEB: "web",
  DATABASE: "database",
  TOOL: "tool",
  DOCUMENT: "document",
} as const;

export type SourceKind = (typeof SourceKind)[keyof typeof SourceKind];

/**
 * Grounded reference entry displayed in the sources list and inline citation previews.
 */
export interface SourceItem {
  id: string;
  index: number;
  title: string;
  url: string;
  domain?: string;
  kind?: SourceKind;
  badge?: string;
  snippet?: string;
  favicon?: string;
}

/**
 * Props for the interactive {@link InlineCitation} badge.
 */
export interface InlineCitationProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  index: number;
  title?: string;
  url?: string;
  domain?: string;
  snippet?: string;
  kind?: SourceKind;
  onCitationClick?: (index: number) => void;
}

/**
 * Props for the {@link Sources} disclosure and reference list.
 */
export interface SourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  sources?: SourceItem[];
  title?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSourceClick?: (source: SourceItem) => void;
}

/**
 * Props for {@link SourcesTrigger}.
 */
export interface SourcesTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  count: number;
  label?: string;
}

/**
 * Props for an individual {@link SourceCard}.
 */
export interface SourceCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  source: SourceItem;
  onSourceClick?: (source: SourceItem) => void;
}
