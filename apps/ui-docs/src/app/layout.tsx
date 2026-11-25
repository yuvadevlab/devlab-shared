import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DocProviders } from "@/components/doc-providers";
import { DocShell } from "@/components/doc-shell";
import { resolveDocsBaseUrl } from "@/config/site.constants";

/** @see https://nextjs.org/docs/app/api-reference/functions/generate-viewport */
export const viewport: Viewport = {
  themeColor: "#38c4d4",
};

/** Root metadata for DevLab UI documentation — shared across all pages. */
export const metadata: Metadata = {
  metadataBase: new URL(resolveDocsBaseUrl()),
  title: {
    default: "DevLab UI — Enterprise Design System",
    template: "%s — DevLab UI",
  },
  description:
    "Pure CSS, multi-brand design system with modular W3C Cascade Layers, accessible Radix primitives, and comprehensive API reference.",
  applicationName: "DevLab UI",
  authors: [{ name: "Yuva DevLab", url: "https://yuva.devlab@gmail.com" }],
  creator: "Yuva DevLab",
  publisher: "Yuva DevLab",
  keywords: [
    "design system",
    "component library",
    "React",
    "Next.js",
    "CSS Cascade Layers",
    "multi-brand",
    "accessible",
    "Radix UI",
    "DevLab UI",
    "@yuva-devlab/ui",
    "OKLCH",
    "design tokens",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: resolveDocsBaseUrl(),
    siteName: "DevLab UI",
    title: "DevLab UI — Enterprise Design System",
    description:
      "Pure CSS, multi-brand design system with modular W3C Cascade Layers, accessible Radix primitives, and comprehensive API reference.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "DevLab UI — Enterprise Design System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevLab UI — Enterprise Design System",
    description:
      "Pure CSS, multi-brand design system with modular W3C Cascade Layers, accessible Radix primitives.",
    images: ["/opengraph-image"],
    creator: "@yuvadevlab",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
      <body className="dl-docs-body">
        <DocProviders>
          <DocShell>{children}</DocShell>
        </DocProviders>
      </body>
    </html>
  );
}
