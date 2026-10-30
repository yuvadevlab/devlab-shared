import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { SearchProvider } from "../components/search-provider";
import { Header } from "../components/header";
import { Sidebar } from "../components/sidebar";
import { ScrollToTop } from "../components/scroll-to-top";
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
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground h-screen flex flex-col overflow-hidden antialiased">
        <ThemeProvider>
          <SearchProvider>
            <ScrollToTop />
            <Header />
            <div className="flex flex-1 min-h-0 overflow-hidden">
              <Sidebar />
              <main
                id="main-content"
                className="min-w-0 flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-10"
              >
                <div className="mx-auto max-w-5xl">{children}</div>
              </main>
            </div>
            <Toaster />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
