import { ComponentView } from "@/components/component-view";
import { carouselVariants } from "./carousel-examples";

/**
 * Documentation page for Carousel component showcasing fluid slide navigation.
 */
export default function CarouselDocPage() {
  const propsList = [
    {
      name: "orientation",
      type: '"horizontal" | "vertical"',
      default: '"horizontal"',
      description: "Scroll axis direction for the carousel slide track.",
    },
    {
      name: "opts",
      type: "EmblaOptionsType",
      default: "undefined",
      description: "Underlying Embla Carousel physics and looping options.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-carousel",
      description: "Relative wrapper positioning the carousel track.",
    },
    {
      name: ".dl-carousel-item",
      description: "Individual slide element inside the flex track.",
    },
  ];

  return (
    <ComponentView
      title="Carousel"
      description="A motion and gesture-driven carousel with accessible navigation controls, configurable looping, and horizontal or vertical layouts."
      variants={carouselVariants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
