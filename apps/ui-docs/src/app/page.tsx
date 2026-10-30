import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Palette,
  Terminal,
} from "lucide-react";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@yuva-devlab/ui";
import { COMPONENTS_LIST, ALL_CATEGORIES } from "../config/components-meta";
import { SearchTrigger } from "../components/search-trigger";

export default function HomePage() {
  return (
    <div className="space-y-14">
      {/* Hero Section */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1.5 py-1 text-xs">
            <Sparkles className="size-3 text-primary" />
            <span>Complete 56 Components Showcase</span>
          </Badge>
          <Badge variant="outline" className="text-xs">
            Pure CSS • Zero Tailwind Collisions
          </Badge>
        </div>
        <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
          DevLab UI Design System
        </h1>
        <p className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg">
          Enterprise React UI primitives engineered with scoped{" "}
          <code className="text-primary font-mono text-sm">dl-*</code> CSS
          classes, multi-brand OKLCH theme tokens, and rich JSDoc documentation
          for flawless developer ergonomics.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button asChild size="lg" className="gap-2">
            <Link href="/components/button">
              <span>Explore All 56 Components</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <div className="w-auto">
            <SearchTrigger variant="header" className="h-10 sm:w-64" />
          </div>
          <Button asChild variant="outline" size="lg">
            <Link href="/docs/tokens">Design Tokens</Link>
          </Button>
        </div>
      </section>

      {/* Feature Pillar Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="bg-primary/10 text-primary mb-2 flex size-9 items-center justify-center rounded-lg">
              <ShieldCheck className="size-5" />
            </div>
            <CardTitle className="text-base">Zero Style Collisions</CardTitle>
            <CardDescription className="text-xs">
              Every component uses isolated, pure CSS classes mapped inside{" "}
              <code className="font-mono text-[11px]">
                @layer dl-components
              </code>{" "}
              so consuming apps never experience outline or flex collapses.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="bg-primary/10 text-primary mb-2 flex size-9 items-center justify-center rounded-lg">
              <Palette className="size-5" />
            </div>
            <CardTitle className="text-base">Multi-Brand & OKLCH</CardTitle>
            <CardDescription className="text-xs">
              Switch seamlessly between OrchestrAI (Robotic Blue/Teal), FinAI
              (Emerald Forest), DevLab Portal, DevLab Logs, and VitalAI with
              perceptual OKLCH color palettes and dark mode support.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="bg-primary/10 text-primary mb-2 flex size-9 items-center justify-center rounded-lg">
              <Terminal className="size-5" />
            </div>
            <CardTitle className="text-base">Rich IntelliSense</CardTitle>
            <CardDescription className="text-xs">
              Every prop, variant, and component has comprehensive JSDoc
              annotations and copyable code examples directly in VS Code hover
              dialogs.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Ant Design Inspired Component Directory */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Component Directory
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Explore all {COMPONENTS_LIST.length} primitives grouped by
              functional domain.
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            {COMPONENTS_LIST.length} Components
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ALL_CATEGORIES.map((category) => {
            const comps = COMPONENTS_LIST.filter(
              (c) => c.category === category,
            );
            return (
              <div
                key={category}
                className="border border-border/80 rounded-xl p-5 bg-card/40 space-y-3"
              >
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <h3 className="font-semibold text-sm text-foreground">
                    {category}
                  </h3>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {comps.length}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {comps.map((c) => (
                    <Link
                      key={c.slug}
                      href={c.href}
                      className="p-2 rounded-lg bg-muted/30 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition text-xs font-medium text-foreground hover:text-primary truncate block"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quickstart Installation Block */}
      <section className="space-y-4">
        <h2 className="text-foreground text-xl font-bold tracking-tight">
          Quick Installation
        </h2>
        <div className="border-border bg-muted/40 relative rounded-lg border p-4 font-mono text-xs">
          <div className="text-muted-foreground select-none pb-2 font-sans font-semibold uppercase tracking-wider text-[10px]">
            1. Install Packages
          </div>
          <code className="text-foreground">
            pnpm add @yuva-devlab/ui @yuva-devlab/tokens
          </code>
        </div>

        <div className="border-border bg-muted/40 relative rounded-lg border p-4 font-mono text-xs">
          <div className="text-muted-foreground select-none pb-2 font-sans font-semibold uppercase tracking-wider text-[10px]">
            2. Import Styles in globals.css
          </div>
          <pre className="text-foreground whitespace-pre">
            {`@import "tailwindcss";
@import "@yuva-devlab/tokens/preset.css";
@import "@yuva-devlab/tokens/themes/orchestrai.css";
@import "@yuva-devlab/ui/styles.css";`}
          </pre>
        </div>
      </section>
    </div>
  );
}
