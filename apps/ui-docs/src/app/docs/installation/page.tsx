import type { Metadata } from "next";
import { getInstallationStepsByBrand } from "@/services/docs-service";
import { InstallationView } from "@/components/installation-view";

export const metadata: Metadata = {
  title: "Installation & Setup",
  description:
    "Complete guide to installing and configuring @yuva-devlab/ui and @yuva-devlab/tokens in React and Next.js projects with pure CSS Cascade Layers.",
  openGraph: {
    title: "Installation & Setup — DevLab UI",
    description:
      "Complete guide to installing and configuring @yuva-devlab/ui and @yuva-devlab/tokens in React and Next.js projects with pure CSS Cascade Layers.",
  },
};

/**
 * Thin page route wrapper for the installation guide.
 * Pre-renders Shiki-highlighted snippets for every brand theme on the server.
 */
export default async function InstallationPage() {
  const stepsByBrand = await getInstallationStepsByBrand();
  return <InstallationView stepsByBrand={stepsByBrand} />;
}
