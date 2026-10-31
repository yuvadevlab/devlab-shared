"use client";

import React from "react";
import { MetricCard, MetricsGrid } from "@yuva-devlab/ui";
import { Cpu, Zap, Activity, AlertTriangle } from "lucide-react";
import { ComponentView, ComponentVariant } from "@/components/component-view";

/**
 * Documentation page for MetricCard component showcasing positive and warning trends.
 */
export default function MetricCardDocPage() {
  const variants: ComponentVariant[] = [
    {
      id: "kpi",
      title: "KPI Metric Cards Grid",
      description:
        "High-level statistics displaying values, notes, positive trend flags, and icons.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--lg">
          <MetricsGrid>
            <MetricCard
              label="Execution Velocity"
              value="1,420 t/s"
              note="+18.4% vs last hour"
              positive={true}
              icon={<Zap className="dl-demo-icon dl-demo-icon--sm" />}
            />
            <MetricCard
              label="Active Nodes"
              value="48 / 50"
              note="96% capacity"
              positive={true}
              icon={<Cpu className="dl-demo-icon dl-demo-icon--sm" />}
            />
            <MetricCard
              label="Error Rate"
              value="0.04%"
              note="Within SLA (<0.1%)"
              positive={true}
              icon={<Activity className="dl-demo-icon dl-demo-icon--sm" />}
            />
          </MetricsGrid>
        </div>
      ),
      codeSnippet: `<MetricsGrid>
  <MetricCard
    label="Execution Velocity"
    value="1,420 t/s"
    note="+18.4% vs last hour"
    positive={true}
    icon={<Zap />}
  />
  <MetricCard
    label="Error Rate"
    value="0.04%"
    note="Within SLA"
    positive={true}
    icon={<Activity />}
  />
</MetricsGrid>`,
    },
    {
      id: "negative",
      title: "Warning & Negative Trends",
      description:
        "Highlighting degraded system metrics requiring developer or DevOps intervention.",
      preview: (
        <div className="dl-demo-frame dl-demo-frame--sm">
          <MetricCard
            label="Vector Cache Latency"
            value="142 ms"
            note="+38% latency spike"
            positive={false}
            icon={<AlertTriangle className="dl-demo-icon dl-demo-icon--sm" />}
          />
        </div>
      ),
      codeSnippet: `<MetricCard
  label="Vector Cache Latency"
  value="142 ms"
  note="+38% latency spike"
  positive={false}
  icon={<AlertTriangle />}
/>`,
    },
  ];

  const propsList = [
    {
      name: "label",
      type: "string",
      default: "undefined",
      description: "Text header describing the statistic metric.",
    },
    {
      name: "value",
      type: "string | number",
      default: "undefined",
      description: "Primary large statistic value.",
    },
    {
      name: "note",
      type: "string",
      default: "undefined",
      description: "Secondary sub-note explaining change or context.",
    },
    {
      name: "positive",
      type: "boolean",
      default: "undefined",
      description:
        "When true, styles note green; when false, styles note amber/red.",
    },
    {
      name: "icon",
      type: "React.ReactNode",
      default: "undefined",
      description: "Optional top-right corner icon ornament.",
    },
  ];

  const cssClasses = [
    {
      name: ".dl-metric-card",
      description: "Elevated metric statistics card.",
    },
    {
      name: ".dl-metrics-grid",
      description: "Grid layout container for organizing metric cards.",
    },
  ];

  return (
    <ComponentView
      title="Metric Card"
      description="Dashboard KPI and statistic presentation card with trend indicators, inspired by Ant Design's Statistic."
      variants={variants}
      propsList={propsList}
      cssClasses={cssClasses}
    />
  );
}
