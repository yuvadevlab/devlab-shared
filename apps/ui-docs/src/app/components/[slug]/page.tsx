import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllComponentSlugs } from "@/services/components-service";
import { getComponentMetadata } from "@/services/metadata-service";
import { getComponentDocComponent } from "@/registry/components-registry";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllComponentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  return getComponentMetadata(slug);
}

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const ComponentDoc = await getComponentDocComponent(slug);
  if (!ComponentDoc) notFound();

  return <ComponentDoc />;
}
