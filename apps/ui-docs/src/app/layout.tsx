import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import { Toaster } from "@yuva-devlab/ui";

export const metadata: Metadata = {
  title: "DevLab UI — Enterprise Design System & Component Showcase",
  description:
    "Pure CSS, multi-brand design system with zero Tailwind collisions, accessible Radix primitives, and comprehensive API reference.",
};

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
        <ThemeProvider>
          <Header />
          <div className="flex flex-1 min-h-0 overflow-hidden">
            <Sidebar />
            <main className="min-w-0 flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10">
              <div className="mx-auto max-w-5xl">{children}</div>
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
