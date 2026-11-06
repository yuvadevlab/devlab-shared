import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge style variant generator using class-variance-authority.
 */
const badgeVariants = cva("dl-badge", {
  variants: {
    variant: {
      default: "dl-badge--default",
      secondary: "dl-badge--secondary",
      destructive: "dl-badge--destructive",
      success: "dl-badge--success",
      warning: "dl-badge--warning",
      info: "dl-badge--info",
      outline: "dl-badge--outline",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Numeric count displayed inside the floating notification badge */
  count?: number | React.ReactNode;
  /** Max numeric threshold before displaying '+' (e.g., 99+). Defaults to 99 */
  overflowCount?: number;
  /** Whether to render as a red indicator dot without numeric count */
  dot?: boolean;
  /** Whether to display the badge when count is zero. Defaults to false */
  showZero?: boolean;
  /** Offset tuple [x, y] to position the badge relative to wrapped element */
  offset?: [number | string, number | string];
}

/**
 * Versatile badge primitive supporting both standalone status labels
 * and floating notification counter badges over child components.
 *
 * @example
 * ```tsx
 * // Standalone label badge
 * <Badge variant="success">Completed</Badge>
 *
 * // Notification counter badge over icon
 * <Badge count={5}>
 *   <Button variant="ghost" size="icon"><Bell /></Button>
 * </Badge>
 *
 * // Unread indicator dot over avatar
 * <Badge dot>
 *   <Avatar src="/user.png" />
 * </Badge>
 * ```
 */
function Badge({
  className,
  variant,
  children,
  count,
  overflowCount = 99,
  dot = false,
  showZero = false,
  offset,
  style,
  ...props
}: BadgeProps) {
  const isWrapper = children !== undefined && (count !== undefined || dot);

  if (isWrapper) {
    const isCountNumber = typeof count === "number";
    const isZero = isCountNumber && count === 0;
    const shouldDisplay =
      dot || (count !== undefined && count !== null && (!isZero || showZero));

    let displayCount: React.ReactNode = count;
    if (isCountNumber && count > overflowCount) {
      displayCount = `${overflowCount}+`;
    }

    const badgeStyle: React.CSSProperties = { ...style };
    if (offset) {
      badgeStyle.transform = `translate(${offset[0]}, ${offset[1]})`;
    }

    return (
      <span className="dl-badge-wrapper">
        {children}
        {shouldDisplay && (
          <sup
            className={cn(
              "dl-badge-count",
              dot && "dl-badge-dot",
              variant && badgeVariants({ variant }),
              className,
            )}
            style={badgeStyle}
            aria-label={
              dot ? "Notification indicator" : `Unread count: ${count}`
            }
          >
            {dot ? null : displayCount}
          </sup>
        )}
      </span>
    );
  }

  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
