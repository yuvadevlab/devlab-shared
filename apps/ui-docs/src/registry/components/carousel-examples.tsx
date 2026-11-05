import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@yuva-devlab/ui";
import type { ComponentVariant } from "@/components/component-view";

const slideNames = ["OrchestrAI", "FinAI", "VitalAI", "Portal", "Logs"];

function WorkspaceSlide({ name }: { name: string }) {
  return (
    <Card>
      <CardContent className="dl-center dl-p-6">
        <strong>{name}</strong>
      </CardContent>
    </Card>
  );
}

/**
 * Interactive Carousel examples covering the default, sizing, spacing, and
 * vertical orientation patterns used by the component.
 */
export const carouselVariants: ComponentVariant[] = [
  {
    id: "default",
    title: "Default",
    description:
      "A single full-width slide with previous and next controls outside the viewport.",
    preview: (
      <div className="dl-demo-frame dl-demo-frame--carousel">
        <Carousel>
          <CarouselContent>
            {slideNames.map((name) => (
              <CarouselItem key={name}>
                <WorkspaceSlide name={name} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    ),
    codeSnippet: `<Carousel>
  <CarouselContent>
    <CarouselItem><Card>Slide 1</Card></CarouselItem>
    <CarouselItem><Card>Slide 2</Card></CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  },
  {
    id: "sizes",
    title: "Sizes",
    description:
      "Show multiple slides at once by setting a basis class on each item.",
    preview: (
      <div className="dl-demo-frame dl-demo-frame--carousel">
        <Carousel>
          <CarouselContent>
            {slideNames.map((name) => (
              <CarouselItem className="dl-carousel-item--basis-1-3" key={name}>
                <WorkspaceSlide name={name} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    ),
    codeSnippet: `<Carousel>
  <CarouselContent>
    <CarouselItem className="dl-carousel-item--basis-1-3">
      <Card>Slide 1</Card>
    </CarouselItem>
    <CarouselItem className="dl-carousel-item--basis-1-3">
      <Card>Slide 2</Card>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  },
  {
    id: "spacing",
    title: "Spacing",
    description:
      "Add consistent token-based spacing between slides while showing a partial next slide.",
    preview: (
      <div className="dl-demo-frame dl-demo-frame--carousel">
        <Carousel>
          <CarouselContent className="dl-carousel-track--spaced">
            {slideNames.map((name) => (
              <CarouselItem className="dl-carousel-item--basis-1-3" key={name}>
                <WorkspaceSlide name={name} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    ),
    codeSnippet: `<Carousel>
  <CarouselContent className="dl-carousel-track--spaced">
    <CarouselItem className="dl-carousel-item--basis-1-3">
      <Card>Slide 1</Card>
    </CarouselItem>
    <CarouselItem className="dl-carousel-item--basis-1-3">
      <Card>Slide 2</Card>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  },
  {
    id: "vertical",
    title: "Orientation",
    description: "Set vertical orientation to move through a column of slides.",
    preview: (
      <div className="dl-demo-frame--carousel-vertical">
        <Carousel orientation="vertical" opts={{ loop: true }}>
          <CarouselContent>
            {slideNames.slice(0, 3).map((name) => (
              <CarouselItem key={name}>
                <WorkspaceSlide name={name} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    ),
    codeSnippet: `<Carousel orientation="vertical" opts={{ loop: true }}>
  <CarouselContent>
    <CarouselItem><Card>Slide 1</Card></CarouselItem>
    <CarouselItem><Card>Slide 2</Card></CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`,
  },
];
