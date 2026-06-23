import { notFound } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { getProjectBySlug } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <ProjectForm mode="edit" initial={project} originalSlug={project.slug} />
  );
}
