import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import { getProjects } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Proiecte",
  description:
    "Descoperă toate proiectele rezidențiale și mixte RIVO din Satu Mare — în construcție, în vânzare, finalizate sau în curând.",
};

export default async function ProiectePage() {
  const projects = await getProjects();
  return (
    <>
      <PageHeader
        eyebrow="Portofoliu RIVO"
        title={
          <>
            Proiecte care{" "}
            <span className="italic text-accent">schimbă orașul</span>
          </>
        }
        description="De la ansambluri rezidențiale la proiecte mixte de amploare. Filtrează după stadiu și găsește locul potrivit pentru tine."
      />
      <ProjectsExplorer projects={projects} />
    </>
  );
}
