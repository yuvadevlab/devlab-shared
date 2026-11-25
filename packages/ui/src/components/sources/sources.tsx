import * as React from "react";
import {
  ExternalLink,
  BookOpen,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  InlineCitation,
  SourceKindIcon,
  isExternalHref,
  resolveSourceDomain,
} from "./sources-citation";
import {
  SourceKind,
  type SourceItem,
  type InlineCitationProps,
  type SourcesProps,
  type SourcesTriggerProps,
  type SourceCardProps,
} from "./sources-types";

export {
  InlineCitation,
  SourceKind,
  type SourceItem,
  type InlineCitationProps,
  type SourcesProps,
  type SourcesTriggerProps,
  type SourceCardProps,
};

const SourcesContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ open: true, setOpen: () => {} });

/**
 * Interactive source item card displaying domain metadata, excerpt, and external/internal affordance.
 */
export const SourceCard = React.forwardRef<HTMLAnchorElement, SourceCardProps>(
  ({ className, source, onSourceClick, onClick, ...props }, ref) => {
    const external = isExternalHref(source.url);
    const domain = resolveSourceDomain(source.url, source.domain);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (onSourceClick) {
        if (!external) e.preventDefault();
        onSourceClick(source);
      }
    };

    return (
      <a
        ref={ref}
        href={source.url || "#"}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        className={cn("dl-source-card", className)}
        {...props}
      >
        <div className="dl-source-card__meta">
          <span className="dl-source-card__index">{source.index}</span>
          <SourceKindIcon kind={source.kind} />
          <span className="dl-source-card__domain">{domain}</span>
          {source.badge && (
            <span className="dl-source-card__badge">{source.badge}</span>
          )}
          {external ? (
            <ExternalLink
              className="dl-source-card__external"
              aria-hidden="true"
            />
          ) : (
            <ArrowUpRight
              className="dl-source-card__external"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="dl-source-card__title" title={source.title}>
          {source.title}
        </div>
        {source.snippet && (
          <div className="dl-source-card__snippet">{source.snippet}</div>
        )}
      </a>
    );
  },
);
SourceCard.displayName = "SourceCard";

/**
 * Collapsible summary toggle button matching shadcn AI Elements ("Used N sources").
 */
export const SourcesTrigger = React.forwardRef<
  HTMLButtonElement,
  SourcesTriggerProps
>(({ className, count, label, children, ...props }, ref) => {
  const { open, setOpen } = React.useContext(SourcesContext);
  const text = label ?? `Used ${count} source${count === 1 ? "" : "s"}`;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setOpen((prev) => !prev)}
      aria-expanded={open}
      className={cn("dl-sources__trigger", className)}
      {...props}
    >
      <BookOpen className="dl-sources__header-icon" aria-hidden="true" />
      <span>{children ?? text}</span>
      <ChevronDown
        className={cn(
          "dl-sources__chevron",
          open && "dl-sources__chevron--open",
        )}
        aria-hidden="true"
      />
    </button>
  );
});
SourcesTrigger.displayName = "SourcesTrigger";

/**
 * Container revealed when {@link Sources} is expanded.
 */
export const SourcesContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open } = React.useContext(SourcesContext);
  if (!open) return null;

  return (
    <div ref={ref} className={cn("dl-sources__grid", className)} {...props}>
      {children}
    </div>
  );
});
SourcesContent.displayName = "SourcesContent";

/**
 * Grounded sources drawer & reference cards matching shadcn AI Elements patterns.
 */
export const Sources = React.forwardRef<HTMLDivElement, SourcesProps>(
  (
    {
      className,
      sources = [],
      title,
      collapsible = true,
      defaultOpen = true,
      open: propOpen,
      onOpenChange,
      onSourceClick,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const isOpen = !collapsible
      ? true
      : propOpen !== undefined
        ? propOpen
        : internalOpen;

    const setOpen = React.useCallback(
      (action: React.SetStateAction<boolean>) => {
        const next = typeof action === "function" ? action(isOpen) : action;
        if (propOpen === undefined) setInternalOpen(next);
        onOpenChange?.(next);
      },
      [isOpen, propOpen, onOpenChange],
    );

    if (!children && sources.length === 0) return null;

    return (
      <SourcesContext.Provider value={{ open: isOpen, setOpen }}>
        <div ref={ref} className={cn("dl-sources", className)} {...props}>
          {children ? (
            children
          ) : (
            <>
              {collapsible ? (
                <SourcesTrigger count={sources.length} label={title} />
              ) : (
                <div className="dl-sources__header">
                  <BookOpen
                    className="dl-sources__header-icon"
                    aria-hidden="true"
                  />
                  <span>{title ?? `Used ${sources.length} sources`}</span>
                </div>
              )}
              <SourcesContent>
                {sources.map((src) => (
                  <SourceCard
                    key={src.id}
                    source={src}
                    onSourceClick={onSourceClick}
                  />
                ))}
              </SourcesContent>
            </>
          )}
        </div>
      </SourcesContext.Provider>
    );
  },
);
Sources.displayName = "Sources";
