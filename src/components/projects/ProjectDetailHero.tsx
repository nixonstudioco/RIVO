"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import type { Project } from "@/lib/projects";
import { TYPE_LABELS } from "@/lib/projects";
import StatusBadge from "@/components/ui/StatusBadge";

export default function ProjectDetailHero({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative h-[88svh] min-h-[560px] overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={project.cover}
          alt={`${project.name} — ${project.location}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/60" />
      </motion.div>

      <div className="container-rivo relative flex h-full flex-col justify-end pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/proiecte"
            className="group inline-flex items-center gap-2 font-sans text-sm text-bone/70 transition-colors hover:text-bone"
          >
            <ArrowLeft
              size={16}
              className="text-accent transition-transform duration-300 group-hover:-translate-x-1"
            />
            Toate proiectele
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 flex flex-wrap items-center gap-3"
        >
          <StatusBadge status={project.status} />
          <span className="rounded-full border border-bone/20 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-bone/70">
            {TYPE_LABELS[project.type]}
          </span>
          <span className="rounded-full border border-bone/20 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-bone/70">
            {project.year}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-4xl text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.98] tracking-tightest"
        >
          {project.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="mt-5 flex items-center gap-2 font-sans text-lg text-bone/70"
        >
          <MapPin size={18} className="text-accent" />
          {project.location}
        </motion.p>
      </div>
    </section>
  );
}
