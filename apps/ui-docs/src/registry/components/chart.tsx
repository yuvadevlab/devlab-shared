"use client";

import React from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@yuva-devlab/ui";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis } from "recharts";
import {
  ComponentView,
  type ComponentVariant,
} from "@/components/component-view";

const chartData = [
  { month: "Jan", tokens: 1860, cost: 80 },
  { month: "Feb", tokens: 3050, cost: 200 },
  { month: "Mar", tokens: 2370, cost: 120 },
  { month: "Apr", tokens: 4730, cost: 190 },
  { month: "May", tokens: 5090, cost: 230 },
  { month: "Jun", tokens: 6140, cost: 280 },
];

const chartConfig = {
  tokens: {
    label: "Tokens (k)",
    color: "var(--primary)",
  },
  cost: {
    label: "Cost ($)",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig;

export default function ChartDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "bar",
      title: "Interactive Bar Chart",
      description:
        "AntD-inspired categorical comparison bar chart with custom token tooltips.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md dl-demo-box">
          <ChartContainer config={chartConfig} className="dl-demo-chart">
            <BarChart data={chartData}>
              <XAxis
                dataKey="month"
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                dataKey="tokens"
                fill="var(--color-tokens)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      ),
      codeSnippet: `<ChartContainer config={chartConfig} className="dl-demo-chart">
  <BarChart data={chartData}>
    <XAxis dataKey="month" />
    <YAxis />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Bar dataKey="tokens" fill="var(--color-tokens)" radius={4} />
  </BarChart>
</ChartContainer>`,
    },
    {
      id: "area",
      title: "Smooth Gradient Area Chart",
      description:
        "Time-series area chart with theme token fill gradient and interactive hover cursor.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--md dl-demo-box">
          <ChartContainer config={chartConfig} className="dl-demo-chart">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="tokenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-tokens)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-tokens)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="var(--muted-foreground)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="tokens"
                stroke="var(--color-tokens)"
                fillOpacity={1}
                fill="url(#tokenGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </div>
      ),
      codeSnippet: `<ChartContainer config={chartConfig} className="dl-demo-chart">
  <AreaChart data={chartData}>
    <XAxis dataKey="month" />
    <ChartTooltip content={<ChartTooltipContent />} />
    <Area type="monotone" dataKey="tokens" stroke="var(--color-tokens)" fill="url(#tokenGradient)" />
  </AreaChart>
</ChartContainer>`,
    },
  ];

  const propsList = [
    {
      name: "config",
      type: "ChartConfig",
      default: "undefined",
      description:
        "Mapping of series identifiers to labels, icons, and theme color variables.",
    },
    {
      name: "children",
      type: "React.ReactNode",
      default: "undefined",
      description: "Recharts chart element (BarChart, AreaChart, LineChart).",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-chart-container",
      description:
        "Responsive wrapper injecting CSS color variables per theme.",
    },
    {
      name: ".dl-chart-tooltip",
      description: "Card popover styling for chart tooltip values.",
    },
  ];

  return (
    <ComponentView
      title="Chart"
      description="Theme-aware Recharts visualization container providing automatic OKLCH design token color injection, custom tooltips, and legends. Showcasing bar charts and smooth gradient area charts."
      category="Data Display"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
