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
    VariantProps<typeof badgeVariants> {}

/**
 * Small status or label indicator with curated design-token variant styling.
 *
 * @example
 * ```tsx
 * <Badge variant="success">Completed</Badge>
 * <Badge variant="destructive">Failed</Badge>
 * <Badge variant="outline">v1.2.0</Badge>
 * ```
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
export { Badge, badgeVariants };
