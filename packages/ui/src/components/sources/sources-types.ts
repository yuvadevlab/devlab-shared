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

export interface InlineCitationProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** Index number of the citation, e.g. 1 */
  index: number;
  /** Title of the cited source */
  title?: string;
  /** URL of the source */
  url?: string;
  /** Text snippet from source */
  snippet?: string;
  /** Optional click handler to navigate or open preview */
  onCitationClick?: (index: number) => void;
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
