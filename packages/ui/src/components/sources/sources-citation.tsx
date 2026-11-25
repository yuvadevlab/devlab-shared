import * as React from "react";
import { Globe, Database, Wrench, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/hover-card";
import { SourceKind, type InlineCitationProps } from "./sources-types";

/**
 * Checks whether a reference URL targets an external HTTP/HTTPS origin.
 */
export function isExternalHref(url?: string): boolean {
  return Boolean(url && /^https?:\/\//i.test(url));
}

/**
 * Resolves a human-readable domain or internal route label for a source entry.
 */
export function resolveSourceDomain(url?: string, domain?: string): string {
  if (domain) return domain;
  if (!url) return "reference";
  if (url.startsWith("/")) return url;
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "reference";
  }
}

/**
 * Renders a category icon corresponding to {@link SourceKind}.
 */
export function SourceKindIcon({ kind }: { kind?: SourceKind }) {
  switch (kind) {
    case SourceKind.DATABASE:
      return <Database className="dl-source-card__icon" aria-hidden="true" />;
    case SourceKind.TOOL:
      return <Wrench className="dl-source-card__icon" aria-hidden="true" />;
    case SourceKind.DOCUMENT:
      return <FileText className="dl-source-card__icon" aria-hidden="true" />;
    case SourceKind.WEB:
    default:
      return <Globe className="dl-source-card__icon" aria-hidden="true" />;
  }
}

/**
 * Inline citation badge with HoverCard excerpt preview on hover.
 */
export const InlineCitation = React.forwardRef<
  HTMLButtonElement,
  InlineCitationProps
>(
  (
    {
      className,
      index,
      title,
      url,
      domain,
      snippet,
      kind,
      onCitationClick,
      onClick,
      ...props
    },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      onCitationClick?.(index);
      if (!onClick && !onCitationClick && isExternalHref(url)) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    };

    const hasPreview = Boolean(title || snippet || domain || url);
    const resolvedDomain = resolveSourceDomain(url, domain);

    const triggerButton = (
      <button
        ref={ref}
        type="button"
        aria-label={title ? `Source ${index}: ${title}` : `Source ${index}`}
        onClick={handleClick}
        className={cn("dl-citation", className)}
        {...props}
      >
        {index}
      </button>
    );

    if (!hasPreview) return triggerButton;

    return (
      <HoverCard openDelay={180} closeDelay={100}>
        <HoverCardTrigger asChild>{triggerButton}</HoverCardTrigger>
        <HoverCardContent className="dl-citation-popover" align="start">
          <div className="dl-citation-popover__meta">
            <span className="dl-source-card__index">{index}</span>
            <SourceKindIcon kind={kind} />
            <span className="dl-source-card__domain">{resolvedDomain}</span>
          </div>
          {title && <div className="dl-citation-popover__title">{title}</div>}
          {snippet && <p className="dl-citation-popover__snippet">{snippet}</p>}
        </HoverCardContent>
      </HoverCard>
    );
  },
);
InlineCitation.displayName = "InlineCitation";
