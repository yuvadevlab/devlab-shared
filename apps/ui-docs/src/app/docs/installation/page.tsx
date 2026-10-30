import type { Metadata } from "next";
import { getInstallationSteps } from "../../../services/docs-service";
import { InstallationView } from "../../../components/installation-view";

export const metadata: Metadata = {
  title: "Installation & Setup — DevLab UI",
  description:
    "Complete guide to installing and configuring @yuva-devlab/ui and @yuva-devlab/tokens in React and Next.js.",
};

/**
 * Ultra-thin page route wrapper for the installation guide.
 * Pre-fetches highlighted code blocks on the server via docs-service.
 */
export default async function InstallationPage() {
  const steps = await getInstallationSteps();
  return <InstallationView steps={steps} />;
}
