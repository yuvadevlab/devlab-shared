import * as React from "react";
import { cn } from "@/lib/utils";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual presentation variant */
  variant?: "default" | "outline" | "ghost";
  /** Size variant */
  size?: "sm" | "md" | "lg";
}

/**
 * Semantic keycap element used to display keyboard shortcuts and hotkeys.
 *
 * @example
 * ```tsx
 * <Kbd>⌘</Kbd>
 * <Kbd>K</Kbd>
 * ```
 */
export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  (
    { className, variant = "default", size = "md", children, ...props },
    ref,
  ) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          "dl-kbd",
          `dl-kbd--${variant}`,
          `dl-kbd--${size}`,
          className,
        )}
        {...props}
      >
        {children}
      </kbd>
    );
  },
);

Kbd.displayName = "Kbd";

export interface KbdGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional delimiter between keys, e.g. "+" or empty */
  separator?: React.ReactNode;
}

/**
 * Container grouping multiple keycaps into a hotkey combination sequence.
 *
 * @example
 * ```tsx
 * <KbdGroup>
 *   <Kbd>⌘</Kbd>
 *   <Kbd>⇧</Kbd>
 *   <Kbd>P</Kbd>
 * </KbdGroup>
 * ```
 */
export const KbdGroup = React.forwardRef<HTMLDivElement, KbdGroupProps>(
  ({ className, separator, children, ...props }, ref) => {
    const items = React.Children.toArray(children);

    return (
      <div
        ref={ref}
        className={cn("dl-kbd-group", className)}
        role="group"
        aria-label="Keyboard shortcut"
        {...props}
      >
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            {item}
            {separator && idx < items.length - 1 && (
              <span className="dl-kbd-separator" aria-hidden="true">
                {separator}
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  },
);

KbdGroup.displayName = "KbdGroup";
