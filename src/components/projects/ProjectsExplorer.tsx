"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import {
  STATUS_LABELS,
  type Project,
  type ProjectStatus,
} from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

type Filter = "toate" | ProjectStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "toate", label: "Toate" },
  { value: "in-vanzare", label: STATUS_LABELS["in-vanzare"] },
  { value: "in-constructie", label: STATUS_LABELS["in-constructie"] },
  { value: "in-curand", label: STATUS_LABELS["in-curand"] },
  { value: "finalizat", label: STATUS_LABELS["finalizat"] },
];

/**
 * Listing de proiecte cu filtrare după status și animații la filtrare.
 */
export default function ProjectsExplorer({
  projects,
}: {
  projects: Project[];
}) {
  const [filter, setFilter] = useState<Filter>("toate");

  const filtered = useMemo(() => {
    if (filter === "toate") return projects;
    return projects.filter((p) => p.status === filter);
  }, [filter, projects]);

  return (
    <section className="container-rivo pb-28 lg:pb-40">
      {/* Filtre */}
      <div className="sticky top-16 z-20 -mx-6 mb-12 border-y border-bone/10 bg-ink/80 px-6 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-full sm:border sm:px-3">
        <LayoutGroup>
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.value;
              const count =
                f.value === "toate"
                  ? projects.length
                  : projects.filter((p) => p.status === f.value).length;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFilter(f.value)}
                  className={cn(
                    "relative rounded-full px-5 py-2 font-sans text-sm transition-colors duration-300",
                    active ? "text-ink" : "text-bone/60 hover:text-bone"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">
                    {f.label}
                    <span className="ml-1.5 text-xs opacity-60">{count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      {/* Grid */}
      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              priority={i < 3}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-20 text-center font-sans text-bone/50">
          Niciun proiect în această categorie momentan.
        </p>
      )}
    </section>
  );
}
