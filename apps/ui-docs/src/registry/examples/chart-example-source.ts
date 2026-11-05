const chartSetup = `import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@yuva-devlab/ui";
import { Area, AreaChart, Bar, BarChart, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Jan", tokens: 1860, cost: 80 },
  { month: "Feb", tokens: 3050, cost: 200 },
  { month: "Mar", tokens: 2370, cost: 120 },
  { month: "Apr", tokens: 4730, cost: 190 },
  { month: "May", tokens: 5090, cost: 230 },
  { month: "Jun", tokens: 6140, cost: 280 },
];

const chartConfig = {
  tokens: { label: "Tokens (k)", color: "var(--primary)" },
  cost: { label: "Cost ($)", color: "var(--muted-foreground)" },
} satisfies ChartConfig;`;

/** Complete source for the documented token bar chart and its sample data. */
export const chartBarExample = `"use client";

${chartSetup}

export default function Example() {
  return (
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
  );
}`;

/** Complete source for the gradient area chart and its sample data. */
export const chartAreaExample = `"use client";

${chartSetup}

export default function Example() {
  return (
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
  );
}`;
