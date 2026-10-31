import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Alert variant configuration mapping to dl-* scoped CSS classes.
 */
const alertVariants = cva("dl-alert", {
  variants: {
    variant: {
      default: "dl-alert--default",
      destructive: "dl-alert--destructive",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface AlertProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {}

/**
 * Banner alert component for prominent user notifications, warnings, or error states.
 *
 * @example
 * ```tsx
 * <Alert variant="destructive">
 *   <AlertCircle />
 *   <AlertTitle>Authentication Failed</AlertTitle>
 *   <AlertDescription>
 *     Your session has expired. Please log in again to continue.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  ),
);
Alert.displayName = "Alert";

export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * Bold header title element for an `Alert`.
 */
const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("dl-alert__title", className)} {...props} />
  ),
);
AlertTitle.displayName = "AlertTitle";

export type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * Descriptive body text element within an `Alert`.
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("dl-alert__desc", className)} {...props} />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
