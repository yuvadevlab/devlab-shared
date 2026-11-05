import * as React from "react";

/**
 * Props for a region with an explicit text direction.
 */
export interface DirectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Text direction applied to descendants. */
  dir: "ltr" | "rtl";
}

/**
 * Applies left-to-right or right-to-left text direction to its content.
 */
export const Direction = React.forwardRef<HTMLDivElement, DirectionProps>(
  ({ dir, ...props }, ref) => <div ref={ref} dir={dir} {...props} />,
);
Direction.displayName = "Direction";
