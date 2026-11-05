import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/item";
import {
  ConfirmationProps,
  ConfirmationMediaProps,
  ConfirmationContentProps,
  ConfirmationTitleProps,
  ConfirmationDescriptionProps,
  ConfirmationActionsProps,
} from "./confirmation-types";

export type {
  ConfirmationProps,
  ConfirmationMediaProps,
  ConfirmationContentProps,
  ConfirmationTitleProps,
  ConfirmationDescriptionProps,
  ConfirmationActionsProps,
};

export const ConfirmationMedia = React.forwardRef<
  HTMLDivElement,
  ConfirmationMediaProps
>(({ className, children, ...props }, ref) => (
  <ItemMedia
    ref={ref}
    className={cn("dl-confirmation__media", className)}
    {...props}
  >
    {children}
  </ItemMedia>
));
ConfirmationMedia.displayName = "ConfirmationMedia";

export const ConfirmationTitle = React.forwardRef<
  HTMLHeadingElement,
  ConfirmationTitleProps
>(({ className, ...props }, ref) => (
  <ItemTitle
    ref={ref}
    className={cn("dl-confirmation__title", className)}
    {...props}
  />
));
ConfirmationTitle.displayName = "ConfirmationTitle";

export const ConfirmationDescription = React.forwardRef<
  HTMLParagraphElement,
  ConfirmationDescriptionProps
>(({ className, ...props }, ref) => (
  <ItemDescription
    ref={ref}
    className={cn("dl-confirmation__description", className)}
    {...props}
  />
));
ConfirmationDescription.displayName = "ConfirmationDescription";

export const ConfirmationContent = React.forwardRef<
  HTMLDivElement,
  ConfirmationContentProps
>(({ className, ...props }, ref) => (
  <ItemContent
    ref={ref}
    className={cn("dl-confirmation__content", className)}
    {...props}
  />
));
ConfirmationContent.displayName = "ConfirmationContent";

export const ConfirmationActions = React.forwardRef<
  HTMLDivElement,
  ConfirmationActionsProps
>(({ className, ...props }, ref) => (
  <ItemActions
    ref={ref}
    className={cn("dl-confirmation__actions", className)}
    {...props}
  />
));
ConfirmationActions.displayName = "ConfirmationActions";

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
    { className, variant = "outline", size = "md", children, ...props },
    ref,
  ) => (
    <Item
      ref={ref}
      className={cn(
        "dl-confirmation",
        `dl-confirmation--${variant}`,
        `dl-confirmation--${size}`,
        className,
      )}
      {...props}
    >
      <div className="dl-confirmation__body">{children}</div>
    </Item>
  ),
);
Confirmation.displayName = "Confirmation";
