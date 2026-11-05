import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/hover-card";

/**
 * Props for an inline source citation button.
 */
export interface InlineCitationProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** Index number of the citation. */
  index: number;
  /** Title of the cited source. */
  title?: string;
  /** URL of the cited source. */
  url?: string;
  /** Supporting excerpt from the source. */
  snippet?: string;
  /** Optional callback used instead of opening the URL. */
  onCitationClick?: (index: number) => void;
}

/**
 * Renders a compact source reference with a HoverCard preview.
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
      snippet,
      onCitationClick,
      onClick,
      ...props
    },
    ref,
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      onCitationClick?.(index);
    };
    return (
      <HoverCard openDelay={10} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button
            ref={ref}
            type="button"
            variant="secondary"
            size="sm"
            className={cn("dl-citation", className)}
            data-slot="inline-citation"
            onClick={handleClick}
            {...props}
          >
            {index}
          </Button>
        </HoverCardTrigger>
        <HoverCardContent className="flex w-64 flex-col gap-1">
          {title && <div className="font-medium">{title}</div>}
          {snippet && (
            <div className="text-sm text-muted-foreground">{snippet}</div>
          )}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              {url}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </HoverCardContent>
      </HoverCard>
    );
  },
);
InlineCitation.displayName = "InlineCitation";
