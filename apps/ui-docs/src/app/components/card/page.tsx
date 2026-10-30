"use client";

import React from "react";
import { ArrowRight, Cpu, TrendingUp } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  MetricCard,
  SecretRevealCard,
  Button,
  Badge,
} from "@yuva-devlab/ui";
import {
  ComponentView,
  type ComponentVariant,
} from "../../../components/component-view";

export default function CardDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "standard",
      title: "Standard Content Card",
      description:
        "Structured container featuring header, badge, body content, and footer actions.",
      preview: (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Autonomous Fleet</CardTitle>
              <Badge variant="success">Online</Badge>
            </div>
            <CardDescription>Cluster Node: us-east4-agent-01</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Cluster operating normally. 99.98% uptime maintained over the last
              30 days.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm">
              Dismiss
            </Button>
            <Button size="sm" className="gap-1.5">
              <span>Inspect Node</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </CardFooter>
        </Card>
      ),
      codeSnippet: `<Card className="w-full max-w-sm">
  <CardHeader>
    <div className="flex items-center justify-between">
      <CardTitle>Autonomous Fleet</CardTitle>
      <Badge variant="success">Online</Badge>
    </div>
    <CardDescription>Cluster Node: us-east4</CardDescription>
  </CardHeader>
  <CardContent><p>Cluster operating normally.</p></CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="ghost" size="sm">Dismiss</Button>
    <Button size="sm">Inspect Node</Button>
  </CardFooter>
</Card>`,
    },
    {
      id: "metric",
      title: "Metric / KPI Card",
      description:
        "AntD-inspired statistic card displaying numerical KPIs, trend delta badges, and icons.",
      preview: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
          <MetricCard
            label="Total Tokens"
            value="14.2M"
            note="+18.4% vs previous 30 days"
            positive={true}
            icon={<Cpu className="size-4" />}
          />
          <MetricCard
            label="Active Agents"
            value="482"
            note="+12.0% active tasks"
            positive={true}
            icon={<TrendingUp className="size-4" />}
          />
        </div>
      ),
      codeSnippet: `import { MetricCard } from "@yuva-devlab/ui";

<MetricCard
  label="Total Tokens"
  value="14.2M"
  note="+18.4% vs last month"
  positive={true}
  icon={<Cpu className="size-4" />}
/>`,
    },
    {
      id: "secret",
      title: "Secret / Credential Card",
      description:
        "Secure card for displaying sensitive API keys with click-to-reveal mask and instant copy.",
      preview: (
        <div className="w-full max-w-md">
          <SecretRevealCard
            secret="AIzaSyB4x902_devlab_production_secret_key"
            warningMessage="Store this credential in server vault immediately."
            copyLabel="Copy Key"
          />
        </div>
      ),
      codeSnippet: `import { SecretRevealCard } from "@yuva-devlab/ui";

<SecretRevealCard
  secret="AIzaSyB4x902_devlab_production_secret_key"
  warningMessage="Store this credential in server vault."
  copyLabel="Copy Key"
/>`,
    },
  ];

  const propsList = [
    {
      name: "Card",
      type: "React.HTMLAttributes<HTMLDivElement>",
      default: "—",
      description: "Outer card container with rounded corners and border.",
    },
    {
      name: "MetricCard",
      type: "React.Component",
      default: "—",
      description: "Statistic card with title, value, change %, and icon.",
    },
    {
      name: "SecretRevealCard",
      type: "React.Component",
      default: "—",
      description: "Masked credential card with reveal toggle and copy action.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-card",
      description: "Base card surface with var(--card) background and border.",
    },
    {
      name: ".dl-metric-card",
      description: "Statistic card layout with value, trend badge, and icon.",
    },
    {
      name: ".dl-secret-reveal-card",
      description: "Container for secret key mask and copy button.",
    },
  ];

  return (
    <ComponentView
      title="Card"
      description="Bordered surface component for organizing related content, metrics, or actions. Showcasing standard content cards, KPI statistic cards (MetricCard), and secure credential reveal cards (SecretRevealCard)."
      category="Data Display"
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
