import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: () => (
    <div className="dl-story-w-md">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is DevLab Shared?</AccordionTrigger>
          <AccordionContent>
            DevLab Shared is an enterprise monorepo providing foundational UI
            primitives, multi-brand design tokens, resilience pipelines, and
            authentication SDKs.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How does CSS scoping work?</AccordionTrigger>
          <AccordionContent>
            All components use scoped .dl-* class names packaged within @layer
            dl-components.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
