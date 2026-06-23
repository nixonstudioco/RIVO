"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { TYPE_LABELS } from "@/lib/projects";
import StatusBadge from "@/components/ui/StatusBadge";

/**
 * Card de proiect premium cu hover zoom pe imagine, mask și săgeată animată.
 */
export default function ProjectCard({
  project,
  index,
  priority = false,
}: {
  project: Project;
  index?: number;
  priority?: boolean;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link
        href={`/proiecte/${project.slug}`}
        data-cursor="Vezi proiectul"
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink-muted">
          <Image
            src={project.cover}
            alt={`${project.name} — ${project.location}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-[1.2s] ease-rivo will-change-transform group-hover:scale-110"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />

          {/* Top row: index + status */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
            {typeof index === "number" && (
              <span className="font-serif text-sm text-bone/70">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <StatusBadge status={project.status} />
          </div>

          {/* Bottom info */}
          <div className="absolute inset-x-0 bottom-0 p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.18em] text-accent-soft">
                  {TYPE_LABELS[project.type]}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-tight text-bone sm:text-3xl">
                  {project.name}
                </h3>
                <p className="mt-2 flex items-center gap-1.5 font-sans text-sm text-bone/60">
                  <MapPin size={14} className="text-accent" />
                  {project.location}
                </p>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-bone/20 text-bone transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                <ArrowUpRight
                  size={20}
                  className="transition-transform duration-500 group-hover:rotate-45"
                />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
