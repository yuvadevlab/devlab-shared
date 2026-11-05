import * as React from "react";
import { ExternalLink, Globe, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/trace";
import { SourceItem, SourcesProps, SourceCardProps } from "./sources-types";

export type { SourceItem, SourcesProps, SourceCardProps };

/**
 * Card representing an external referenced source or documentation link.
 */
/**
 * Renders one external source link in a trace-compatible row.
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
        <TraceLine className="p-0">
          <span className="text-xs text-muted-foreground">{source.index}</span>
          <TraceIcon>
            <Globe />
          </TraceIcon>
          <TraceTitle className="min-w-0 flex-1">{source.title}</TraceTitle>
          <span className="text-xs text-muted-foreground">{domain}</span>
          <ExternalLink
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
        </TraceLine>
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
      <Trace ref={ref} className={cn("dl-sources", className)} {...props}>
        <TraceCollapsible defaultOpen>
          <TraceCollapsibleTrigger className="w-full">
            <TraceLine>
              <TraceIcon>
                <BookOpen />
              </TraceIcon>
              <TraceTitle>Sources ({sources.length})</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <Trace>
              {sources.map((src) => (
                <SourceCard
                  key={src.id}
                  source={src}
                  onClick={() => onSourceClick?.(src)}
                />
              ))}
            </Trace>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    );
  },
);
Sources.displayName = "Sources";
