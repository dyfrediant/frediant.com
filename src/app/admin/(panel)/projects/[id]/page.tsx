import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectForm } from "@/components/admin/project-form";
import { getProjectById } from "@/lib/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Edit project" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProjectById(Number(id));

  if (!project) notFound();

  return <ProjectForm project={project} />;
}
