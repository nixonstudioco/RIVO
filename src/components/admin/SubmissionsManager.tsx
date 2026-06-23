"use client";

import { useMemo, useState } from "react";
import {
  Mail,
  Phone,
  Trash2,
  Calendar,
  Building2,
  Loader2,
} from "lucide-react";
import type {
  Submission,
  SubmissionStatus,
  SubmissionType,
} from "@/lib/types";
import {
  SUBMISSION_TYPE_LABELS,
  SUBMISSION_STATUS_LABELS,
} from "@/lib/types";
import { cn } from "@/lib/utils";

type FilterType = "toate" | SubmissionType;

const TYPE_FILTERS: { value: FilterType; label: string }[] = [
  { value: "toate", label: "Toate" },
  { value: "mesaj", label: "Mesaje" },
  { value: "vizionare", label: "Vizionări" },
  { value: "oferta", label: "Oferte" },
];

const STATUS_CYCLE: SubmissionStatus[] = ["nou", "citit", "rezolvat"];

const statusStyle: Record<SubmissionStatus, string> = {
  nou: "bg-accent/15 text-accent-soft border-accent/30",
  citit: "bg-bone/10 text-bone/70 border-bone/20",
  rezolvat: "bg-emerald-400/10 text-emerald-200/90 border-emerald-300/25",
};

export default function SubmissionsManager({
  initial,
  projectNames,
}: {
  initial: Submission[];
  projectNames: Record<string, string>;
}) {
  const [items, setItems] = useState<Submission[]>(initial);
  const [filter, setFilter] = useState<FilterType>("toate");
  const [busyId, setBusyId] = useState<string>("");

  const filtered = useMemo(
    () => (filter === "toate" ? items : items.filter((i) => i.type === filter)),
    [items, filter]
  );

  const cycleStatus = async (sub: Submission) => {
    const idx = STATUS_CYCLE.indexOf(sub.status);
    const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
    setBusyId(sub.id);
    const res = await fetch(`/api/admin/submissions/${sub.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    if (res.ok) {
      setItems((prev) =>
        prev.map((i) => (i.id === sub.id ? { ...i, status: next } : i))
      );
    }
    setBusyId("");
  };

  const remove = async (sub: Submission) => {
    if (!window.confirm("Ștergi această solicitare?")) return;
    setBusyId(sub.id);
    const res = await fetch(`/api/admin/submissions/${sub.id}`, {
      method: "DELETE",
    });
    if (res.ok) setItems((prev) => prev.filter((i) => i.id !== sub.id));
    setBusyId("");
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString("ro-RO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl tracking-tightest sm:text-4xl">
            Mesaje & Vizionări
          </h1>
          <p className="mt-2 font-sans text-sm text-bone/50">
            Solicitările primite prin formularul de contact.
          </p>
        </div>
      </div>

      {/* Filtre */}
      <div className="mt-6 flex flex-wrap gap-2">
        {TYPE_FILTERS.map((f) => {
          const count =
            f.value === "toate"
              ? items.length
              : items.filter((i) => i.type === f.value).length;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "rounded-full border px-4 py-1.5 font-sans text-sm transition-colors",
                filter === f.value
                  ? "border-accent bg-accent/15 text-accent-soft"
                  : "border-bone/15 text-bone/60 hover:text-bone"
              )}
            >
              {f.label} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Listă */}
      <div className="mt-6 space-y-4">
        {filtered.map((sub) => (
          <article
            key={sub.id}
            className="rounded-2xl border border-bone/10 bg-ink-soft p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-serif text-lg text-bone">{sub.name}</h3>
                  <span className="rounded-full border border-bone/15 px-2.5 py-0.5 font-sans text-[11px] uppercase tracking-wide text-accent-soft">
                    {SUBMISSION_TYPE_LABELS[sub.type]}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 font-sans text-sm text-bone/60">
                  <a
                    href={`mailto:${sub.email}`}
                    className="flex items-center gap-1.5 hover:text-accent"
                  >
                    <Mail size={14} /> {sub.email}
                  </a>
                  {sub.phone && (
                    <a
                      href={`tel:${sub.phone}`}
                      className="flex items-center gap-1.5 hover:text-accent"
                    >
                      <Phone size={14} /> {sub.phone}
                    </a>
                  )}
                  {sub.projectSlug && projectNames[sub.projectSlug] && (
                    <span className="flex items-center gap-1.5">
                      <Building2 size={14} />{" "}
                      {projectNames[sub.projectSlug]}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-bone/40">
                    <Calendar size={14} /> {fmtDate(sub.createdAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => cycleStatus(sub)}
                  disabled={busyId === sub.id}
                  className={cn(
                    "rounded-full border px-3 py-1 font-sans text-[11px] uppercase tracking-wide transition-colors disabled:opacity-50",
                    statusStyle[sub.status]
                  )}
                  title="Click pentru a schimba statusul"
                >
                  {busyId === sub.id ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    SUBMISSION_STATUS_LABELS[sub.status]
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => remove(sub)}
                  disabled={busyId === sub.id}
                  aria-label="Șterge"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-bone/15 text-bone/50 transition-colors hover:border-red-400/50 hover:text-red-300 disabled:opacity-50"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            {sub.message && (
              <p className="mt-4 rounded-lg border border-bone/10 bg-ink p-4 font-sans text-sm leading-relaxed text-bone/75">
                {sub.message}
              </p>
            )}
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-bone/10 bg-ink-soft p-10 text-center font-sans text-sm text-bone/40">
            Nicio solicitare în această categorie.
          </div>
        )}
      </div>
    </div>
  );
}
