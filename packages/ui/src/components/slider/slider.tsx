import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export type SliderProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
>;

/**
 * Interactive slider component for selecting single numeric values or continuous ranges.
 * Built upon Radix UI Slider with scoped CSS track and thumb styling.
 *
 * @example
 * ```tsx
 * // Volume slider (0 - 100)
 * <Slider
 *   value={[volume]}
 *   onValueChange={([val]) => setVolume(val)}
 *   max={100}
 *   step={1}
 * />
 *
 * // Range slider (e.g. min & max price)
 * <Slider
 *   value={priceRange}
 *   onValueChange={setPriceRange}
 *   min={0}
 *   max={1000}
 *   step={10}
 * />
 * ```
 */
const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("dl-slider", className)}
    {...props}
  >
    <SliderPrimitive.Track className="dl-slider__track">
      <SliderPrimitive.Range className="dl-slider__range" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="dl-slider__thumb" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
