"use client";

import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { useCarousel } from "./carousel-context";

export type CarouselContentProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Viewport and track container holding all carousel slides.
 */
export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  CarouselContentProps
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className="dl-carousel-viewport">
      <div
        ref={ref}
        className={cn(
          "dl-carousel-track",
          orientation === "horizontal"
            ? "dl-carousel-track--horizontal"
            : "dl-carousel-track--vertical",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

export type CarouselItemProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Individual slide element within a `CarouselContent` track.
 */
export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "dl-carousel-item",
          orientation === "horizontal"
            ? "dl-carousel-item--horizontal"
            : "dl-carousel-item--vertical",
          className,
        )}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

export type CarouselPreviousProps = React.ComponentProps<typeof Button>;

/**
 * Navigation button that moves to the previous carousel slide.
 */
export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  CarouselPreviousProps
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "dl-carousel-btn",
        orientation === "horizontal"
          ? "dl-carousel-btn--prev-horizontal"
          : "dl-carousel-btn--prev-vertical",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

export type CarouselNextProps = React.ComponentProps<typeof Button>;

/**
 * Navigation button that moves to the next carousel slide.
 */
export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  CarouselNextProps
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "dl-carousel-btn",
        orientation === "horizontal"
          ? "dl-carousel-btn--next-horizontal"
          : "dl-carousel-btn--next-vertical",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";
