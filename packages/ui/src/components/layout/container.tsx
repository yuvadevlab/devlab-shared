import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/**
 * Responsive maximum width constraint for the Container.
 */
export type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "fluid";

/**
 * Props for the Container layout primitive.
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * If true, delegates rendering to the direct child element via Radix Slot.
   * @default false
   */
  asChild?: boolean;
  /**
   * HTML element type to render.
   * @default "div"
   */
  as?: React.ElementType;
  /**
   * Maximum width threshold.
   * @default "xl"
   */
  size?: ContainerSize;
}

/**
 * Centered responsive max-width boundary component for page sections and layouts.
 *
 * @example
 * ```tsx
 * <Container size="xl">
 *   <Header />
 *   <Main />
 * </Container>
 * ```
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, asChild = false, as, size = "xl", ...props }, ref) => {
    const Comp = asChild ? Slot : as || "div";

    return (
      <Comp
        ref={ref}
        className={cn("dl-container", `dl-container--${size}`, className)}
        {...props}
      />
    );
  },
);

Container.displayName = "Container";
