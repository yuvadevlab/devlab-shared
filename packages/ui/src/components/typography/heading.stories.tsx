import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./heading";

const meta: Meta<typeof Heading> = {
  title: "Components/Heading",
  component: Heading,
  argTypes: {
    as: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "span", "div"],
      description: "Underlying HTML semantic tag element",
    },
    size: {
      control: "select",
      options: ["display", "h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Visual typographic size scale",
    },
    color: {
      control: "select",
      options: [
        "default",
        "muted",
        "primary",
        "destructive",
        "warning",
        "success",
        "info",
      ],
      description: "Semantic color variant",
    },
    align: {
      control: "select",
      options: ["left", "center", "right"],
      description: "Horizontal text alignment",
    },
    truncate: {
      control: "boolean",
      description: "Truncate text with ellipsis on a single line",
    },
    children: {
      control: "text",
      description: "Heading text content",
    },
  },
  args: {
    children: "Financial Portfolio Overview",
    size: "h2",
    color: "default",
    align: "left",
    truncate: false,
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div className="dl-story-column">
      <Heading size="display">Display Title (3rem / 48px)</Heading>
      <Heading size="h1">Heading 1 (2.25rem / 36px)</Heading>
      <Heading size="h2">Heading 2 (1.75rem / 28px)</Heading>
      <Heading size="h3">Heading 3 (1.375rem / 22px)</Heading>
      <Heading size="h4">Heading 4 (1.125rem / 18px)</Heading>
      <Heading size="h5">Heading 5 (1rem / 16px)</Heading>
      <Heading size="h6">Heading 6 (0.875rem / 14px)</Heading>
    </div>
  ),
};

export const DecoupledHierarchy: Story = {
  render: () => (
    <div className="dl-story-column">
      <Heading as="h1" size="h3">
        Semantic H1 Tag with Visual H3 Styling (Accessible Page Header)
      </Heading>
      <Heading as="h2" size="display">
        Semantic H2 Tag with Visual Display Styling (Hero Section)
      </Heading>
      <Heading as="span" size="h4">
        Semantic Span Tag with Visual H4 Styling (Inline Group Header)
      </Heading>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="dl-story-column">
      <Heading size="h3" color="default">
        Default Foreground Heading
      </Heading>
      <Heading size="h3" color="primary">
        Primary Brand Heading
      </Heading>
      <Heading size="h3" color="muted">
        Muted Section Subtitle
      </Heading>
      <Heading size="h3" color="success">
        Positive Performance Indicator
      </Heading>
      <Heading size="h3" color="warning">
        Pending Confirmation Heading
      </Heading>
      <Heading size="h3" color="destructive">
        Critical Risk Alert Heading
      </Heading>
      <Heading size="h3" color="info">
        System Telemetry Heading
      </Heading>
    </div>
  ),
};
