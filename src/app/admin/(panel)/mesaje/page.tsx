import SubmissionsManager from "@/components/admin/SubmissionsManager";
import { getSubmissions, getProjects } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const [submissions, projects] = await Promise.all([
    getSubmissions(),
    getProjects(),
  ]);
  const projectNames = Object.fromEntries(
    projects.map((p) => [p.slug, p.name])
  );

  return (
    <SubmissionsManager initial={submissions} projectNames={projectNames} />
  );
}
