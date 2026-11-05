import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./carousel";
import { Card, CardContent } from "@/components/card/card";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
  render: () => (
    <div className="dl-carousel-story">
      <Carousel>
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="dl-center dl-p-6">
                  <h3>Agent Swarm #{index}</h3>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="dl-carousel-story">
      <Carousel>
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((index) => (
            <CarouselItem className="dl-carousel-item--basis-1-3" key={index}>
              <Card>
                <CardContent className="dl-center dl-p-6">
                  <h3>Workspace {index}</h3>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="dl-carousel-story">
      <Carousel>
        <CarouselContent className="dl-carousel-track--spaced">
          {[1, 2, 3, 4, 5].map((index) => (
            <CarouselItem className="dl-carousel-item--basis-1-3" key={index}>
              <Card>
                <CardContent className="dl-center dl-p-6">
                  <h3>Workspace {index}</h3>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="dl-carousel-story dl-carousel-story--vertical">
      <Carousel orientation="vertical" opts={{ align: "start" }}>
        <CarouselContent>
          {[1, 2, 3, 4].map((index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="dl-center dl-p-6">
                  <h3>Workspace {index}</h3>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
