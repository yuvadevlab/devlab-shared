import type { Metadata } from "next";
import "./globals.css";
import { DocProviders } from "@/components/doc-providers";
import { DocShell } from "@/components/doc-shell";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ui.devlab.dev",
  ),
  title: "DevLab UI — Enterprise Design System & Component Showcase",
  description:
    "Pure CSS, multi-brand design system with zero Tailwind collisions, accessible Radix primitives, and comprehensive API reference.",
};

/**
 * Ultra-thin Root Layout for DevLab UI Documentation.
 * Encapsulates global styling and delegates provider and shell composition.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      data-brand="orchestrai"
      data-theme="orchestrai"
      data-full-theme="false"
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground h-screen flex flex-col overflow-hidden antialiased">
        <DocProviders>
          <DocShell>{children}</DocShell>
        </DocProviders>
      </body>
    </html>
  );
}
