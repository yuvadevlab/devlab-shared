import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./box";
import { Flex } from "./flex";
import { Stack } from "./stack";
import { Grid } from "./grid";
import { Container } from "./container";
import { Button } from "@/components/button/button";
import { Badge } from "@/components/badge/badge";

const meta: Meta = {
  title: "Components/Layout",
};

export default meta;

export const BoxPrimitive: StoryObj = {
  render: () => (
    <Box p="4" radius="lg" className="dl-card dl-story-w-md">
      <h4>Polymorphic Box Primitive</h4>
      <p className="dl-text-sm dl-text-muted-foreground dl-pt-2">
        Token-driven padding, border radius, and elevation tokens.
      </p>
    </Box>
  ),
};

export const FlexPrimitive: StoryObj = {
  render: () => (
    <Flex
      justify="between"
      align="center"
      gap={4}
      className="dl-card dl-p-4 dl-story-w-md"
    >
      <span>Agent Swarm Alpha</span>
      <Badge variant="success">Active</Badge>
      <Button size="sm">Inspect</Button>
    </Flex>
  ),
};

export const StackPrimitive: StoryObj = {
  render: () => (
    <Stack gap={3} className="dl-card dl-p-4 dl-story-w-sm">
      <h4>Vertical Stack</h4>
      <div>Item 1: Healthcheck OK</div>
      <div>Item 2: Memory Nominal</div>
      <div>Item 3: CPU Idle</div>
    </Stack>
  ),
};

export const GridPrimitive: StoryObj = {
  render: () => (
    <Grid cols={3} gap={4} className="dl-story-w-lg">
      <div className="dl-card dl-p-4 dl-center">Card 1</div>
      <div className="dl-card dl-p-4 dl-center">Card 2</div>
      <div className="dl-card dl-p-4 dl-center">Card 3</div>
    </Grid>
  ),
};

export const ContainerPrimitive: StoryObj = {
  render: () => (
    <Container size="md" className="dl-card dl-p-6">
      <h3>Constrained Content Container</h3>
      <p className="dl-text-sm dl-text-muted-foreground dl-pt-2">
        Automatically centers and restricts max-width across viewports.
      </p>
    </Container>
  ),
};
