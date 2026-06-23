import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/projects/ProjectCard";
import Reveal from "@/components/ui/Reveal";

export default function Projects({ projects }: { projects: Project[] }) {
  // Pe home arătăm primele 4 proiecte.
  const featured = projects.slice(0, 4);

  return (
    <section className="relative py-28 lg:py-40">
      <div className="container-rivo">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="02"
            eyebrow="Portofoliu"
            title={
              <>
                Proiecte în{" "}
                <span className="italic text-accent">dezvoltare</span>
              </>
            }
            description="Ansambluri aflate în diverse stadii — de la idee la chei. Fiecare proiect RIVO poartă aceeași grijă pentru detaliu."
          />
          <Reveal delay={0.1}>
            <Link
              href="/proiecte"
              data-cursor="Toate"
              className="group inline-flex items-center gap-2 font-sans text-sm text-bone/70 transition-colors hover:text-bone"
            >
              Vezi toate proiectele
              <ArrowRight
                size={18}
                className="text-accent transition-transform duration-500 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              priority={i < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
