import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil, ExternalLink } from "lucide-react";
import { getProjects } from "@/lib/store";
import { STATUS_LABELS, TYPE_LABELS } from "@/lib/projects";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl tracking-tightest sm:text-4xl">
            Proiecte
          </h1>
          <p className="mt-2 font-sans text-sm text-bone/50">
            {projects.length}{" "}
            {projects.length === 1 ? "proiect" : "proiecte"} în portofoliu.
          </p>
        </div>
        <Link
          href="/admin/proiecte/nou"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:bg-accent-soft"
        >
          <Plus size={16} />
          Proiect nou
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-bone/10">
        {projects.map((p) => (
          <div
            key={p.slug}
            className="flex items-center gap-4 border-b border-bone/10 bg-ink-soft p-4 last:border-b-0"
          >
            <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-ink-muted">
              {p.cover ? (
                <Image
                  src={p.cover}
                  alt={p.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-lg text-bone">{p.name}</p>
              <p className="truncate font-sans text-xs text-bone/40">
                {p.location || "—"}
              </p>
            </div>

            <div className="hidden shrink-0 sm:block">
              <span className="rounded-full border border-bone/15 px-3 py-1 font-sans text-[11px] uppercase tracking-wide text-bone/60">
                {STATUS_LABELS[p.status]}
              </span>
            </div>
            <div className="hidden shrink-0 md:block">
              <span className="font-sans text-xs text-bone/40">
                {TYPE_LABELS[p.type]}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={`/proiecte/${p.slug}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Vezi pe site"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-bone/15 text-bone/60 transition-colors hover:border-accent/50 hover:text-accent"
              >
                <ExternalLink size={16} />
              </a>
              <Link
                href={`/admin/proiecte/${p.slug}`}
                aria-label="Editează"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-bone/15 text-bone/60 transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Pencil size={16} />
              </Link>
              <DeleteProjectButton slug={p.slug} name={p.name} />
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="bg-ink-soft p-10 text-center font-sans text-sm text-bone/40">
            Niciun proiect. Adaugă primul proiect.
          </div>
        )}
      </div>
    </div>
  );
}
