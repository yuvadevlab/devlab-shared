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
    <div className="dl-story-w-md">
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
