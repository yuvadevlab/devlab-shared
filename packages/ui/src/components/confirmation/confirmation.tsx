import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ConfirmationApprovalState,
  ConfirmationProps,
  ConfirmationMediaProps,
  ConfirmationContentProps,
  ConfirmationTitleProps,
  ConfirmationDescriptionProps,
  ConfirmationActionsProps,
} from "./confirmation-types";

export type {
  ConfirmationApprovalState,
  ConfirmationProps,
  ConfirmationMediaProps,
  ConfirmationContentProps,
  ConfirmationTitleProps,
  ConfirmationDescriptionProps,
  ConfirmationActionsProps,
};

const ConfirmationContext = React.createContext<{
  state?: ConfirmationApprovalState;
}>({});

/**
 * Icon or avatar badge slot for {@link Confirmation}.
 */
export const ConfirmationMedia = React.forwardRef<
  HTMLDivElement,
  ConfirmationMediaProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn("dl-confirmation__media", className)} {...props}>
    {children}
  </div>
));
ConfirmationMedia.displayName = "ConfirmationMedia";

/**
 * Title heading for {@link Confirmation}.
 */
export const ConfirmationTitle = React.forwardRef<
  HTMLHeadingElement,
  ConfirmationTitleProps
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("dl-confirmation__title", className)}
    {...props}
  />
));
ConfirmationTitle.displayName = "ConfirmationTitle";

/**
 * Descriptive explanation for {@link Confirmation}.
 */
export const ConfirmationDescription = React.forwardRef<
  HTMLParagraphElement,
  ConfirmationDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("dl-confirmation__description", className)}
    {...props}
  />
));
ConfirmationDescription.displayName = "ConfirmationDescription";

/**
 * Main text content stack for {@link Confirmation}.
 */
export const ConfirmationContent = React.forwardRef<
  HTMLDivElement,
  ConfirmationContentProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("dl-confirmation__content", className)}
    {...props}
  />
));
ConfirmationContent.displayName = "ConfirmationContent";

/**
 * Right-aligned action bar for approve/deny buttons inside {@link Confirmation}.
 */
export const ConfirmationActions = React.forwardRef<
  HTMLDivElement,
  ConfirmationActionsProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("dl-confirmation__actions", className)}
    {...props}
  />
));
ConfirmationActions.displayName = "ConfirmationActions";

/**
 * Renders children only when confirmation is awaiting user approval.
 */
export function ConfirmationRequest({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state } = React.useContext(ConfirmationContext);
  if (state && state !== "approval-requested") return null;
  return <>{children}</>;
}

/**
 * Renders children only after approval is granted.
 */
export function ConfirmationAccepted({
  className,
  children,
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { state } = React.useContext(ConfirmationContext);
  if (state !== "approval-accepted") return null;
  return (
    <span
      className={cn(
        "dl-confirmation__status-note dl-confirmation__status-note--accepted",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Renders children only after approval is rejected.
 */
export function ConfirmationRejected({
  className,
  children,
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { state } = React.useContext(ConfirmationContext);
  if (state !== "approval-rejected") return null;
  return (
    <span
      className={cn(
        "dl-confirmation__status-note dl-confirmation__status-note--rejected",
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * Human-in-the-loop action approval card for sensitive or destructive agent operations.
 *
 * @example
 * ```tsx
 * <Confirmation>
 *   <ConfirmationMedia><AlertTriangle /></ConfirmationMedia>
 *   <ConfirmationContent>
 *     <ConfirmationTitle>Run migration script?</ConfirmationTitle>
 *     <ConfirmationDescription>Alters 3 database tables.</ConfirmationDescription>
 *   </ConfirmationContent>
 *   <ConfirmationActions>
 *     <Button variant="outline" size="sm">Deny</Button>
 *     <Button size="sm">Approve</Button>
 *   </ConfirmationActions>
 * </Confirmation>
 * ```
 */
export const Confirmation = React.forwardRef<HTMLDivElement, ConfirmationProps>(
  (
    { className, variant = "outline", size = "md", state, children, ...props },
    ref,
  ) => (
    <ConfirmationContext.Provider value={{ state }}>
      <div
        ref={ref}
        className={cn(
          "dl-confirmation",
          `dl-confirmation--${variant}`,
          `dl-confirmation--${size}`,
          state === "approval-accepted" && "dl-confirmation--accepted",
          state === "approval-rejected" && "dl-confirmation--destructive",
          className,
        )}
        {...props}
      >
        <div className="dl-confirmation__body">{children}</div>
      </div>
    </ConfirmationContext.Provider>
  ),
);
Confirmation.displayName = "Confirmation";
