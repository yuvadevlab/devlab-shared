import * as React from "react";
import { ExternalLink, Globe, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SourceItem,
  InlineCitationProps,
  SourcesProps,
  SourceCardProps,
} from "./sources-types";

export type { SourceItem, InlineCitationProps, SourcesProps, SourceCardProps };

/**
 * Clickable citation reference badge embedded inline in AI-generated answers.
 *
 * @example
 * ```tsx
 * <span>According to PostgreSQL official docs <InlineCitation index={1} title="MVCC Concurrency" /></span>
 * ```
 */
export const InlineCitation = React.forwardRef<
  HTMLButtonElement,
  InlineCitationProps
>(
  (
    { className, index, title, url, snippet, onCitationClick, ...props },
    ref,
  ) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      props.onClick?.(e);
      onCitationClick?.(index);
      if (!props.onClick && !onCitationClick && url) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
    };

    const tooltipText = [title, snippet].filter(Boolean).join(" — ");

    return (
      <button
        ref={ref}
        type="button"
        title={tooltipText || `Source [${index}]`}
        onClick={handleClick}
        className={cn("dl-citation", className)}
        {...props}
      >
        {index}
      </button>
    );
  },
);
InlineCitation.displayName = "InlineCitation";

/**
 * Card representing an external referenced source or documentation link.
 */
export const SourceCard = React.forwardRef<HTMLAnchorElement, SourceCardProps>(
  ({ className, source, ...props }, ref) => {
    const domain =
      source.domain ||
      (() => {
        try {
          return new URL(source.url).hostname.replace("www.", "");
        } catch {
          return "external";
        }
      })();

    return (
      <a
        ref={ref}
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("dl-source-card", className)}
        {...props}
      >
        <div className="dl-source-card__meta">
          <span className="dl-source-card__index">{source.index}</span>
          <Globe className="size-3 text-muted-foreground shrink-0" />
          <span className="dl-source-card__domain">{domain}</span>
          <ExternalLink className="size-2.5 ml-auto text-muted-foreground shrink-0 opacity-70" />
        </div>
        <div className="dl-source-card__title" title={source.title}>
          {source.title}
        </div>
      </a>
    );
  },
);
SourceCard.displayName = "SourceCard";

/**
 * Grid or card list displaying sources, citations, and ground-truth web search links.
 *
 * @example
 * ```tsx
 * <Sources sources={[{ id: "1", index: 1, title: "Turborepo Docs", url: "https://turbo.build" }]} />
 * ```
 */
export const Sources = React.forwardRef<HTMLDivElement, SourcesProps>(
  ({ className, sources = [], onSourceClick, ...props }, ref) => {
    if (sources.length === 0) return null;

    return (
      <div ref={ref} className={cn("dl-sources", className)} {...props}>
        <div className="dl-sources__header">
          <BookOpen className="size-3.5 text-primary" />
          <span>Sources ({sources.length})</span>
        </div>
        <div className="dl-sources__grid">
          {sources.map((src) => (
            <SourceCard
              key={src.id}
              source={src}
              onClick={() => onSourceClick?.(src)}
            />
          ))}
        </div>
      </div>
    );
  },
);
Sources.displayName = "Sources";
