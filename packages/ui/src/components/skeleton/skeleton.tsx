import * as React from "react";
import { cn } from "@/lib/utils";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Animated placeholder component for representing content loading states.
 *
 * @example
 * ```tsx
 * <Flex align="center" gap="4">
 *   <Skeleton variant="circle" />
 *   <Stack gap="2">
 *     <Skeleton />
 *     <Skeleton />
 *   </Stack>
 * </Flex>
 * ```
 */
function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("dl-skeleton", className)} {...props} />;
}
export { Skeleton };
