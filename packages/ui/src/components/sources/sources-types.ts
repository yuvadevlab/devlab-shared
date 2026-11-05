import * as React from "react";

export interface SourceItem {
  id: string;
  index: number;
  title: string;
  url: string;
  domain?: string;
  snippet?: string;
  favicon?: string;
}

export interface SourcesProps extends React.HTMLAttributes<HTMLDivElement> {
  /** List of source references */
  sources: SourceItem[];
  /** Optional callback when a source card is clicked */
  onSourceClick?: (source: SourceItem) => void;
}

export interface SourceCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  source: SourceItem;
}
