"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, Loader2, ArrowLeft, Save } from "lucide-react";
import type { Project, ProjectStatus, ProjectType } from "@/lib/projects";
import { STATUS_LABELS, TYPE_LABELS } from "@/lib/projects";
import ImageUploader from "./ImageUploader";

const EMPTY: Project = {
  slug: "",
  name: "",
  tagline: "",
  location: "",
  status: "in-curand",
  type: "rezidential",
  year: new Date().getFullYear().toString(),
  progress: 0,
  cover: "",
  gallery: [],
  description: "",
  specs: [],
  typologies: [],
  amenities: [],
  map: { lat: 47.7929, lng: 22.8857 },
};

const STATUSES = Object.keys(STATUS_LABELS) as ProjectStatus[];
const TYPES = Object.keys(TYPE_LABELS) as ProjectType[];

const labelCls =
  "mb-2 block font-sans text-xs uppercase tracking-[0.14em] text-bone/40";
const inputCls =
  "w-full rounded-lg border border-bone/15 bg-ink px-3 py-2.5 font-sans text-sm text-bone placeholder:text-bone/30 focus:border-accent focus:outline-none";

export default function ProjectForm({
  initial,
  mode,
  originalSlug,
}: {
  initial?: Project;
  mode: "new" | "edit";
  originalSlug?: string;
}) {
  const router = useRouter();
  const [p, setP] = useState<Project>(initial ?? EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof Project>(key: K, val: Project[K]) =>
    setP((prev) => ({ ...prev, [key]: val }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url =
        mode === "new"
          ? "/api/admin/projects"
          : `/api/admin/projects/${originalSlug}`;
      const res = await fetch(url, {
        method: mode === "new" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare la salvare.");
      router.push("/admin/proiecte");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/proiecte"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-bone/15 text-bone/60 hover:text-accent"
          >
            <ArrowLeft size={16} />
          </Link>
          <h1 className="font-serif text-2xl tracking-tightest sm:text-3xl">
            {mode === "new" ? "Proiect nou" : `Editează: ${initial?.name}`}
          </h1>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:bg-accent-soft disabled:opacity-70"
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Save size={16} />
          )}
          Salvează
        </button>
      </div>

      {error && (
        <p className="mt-6 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Coloana principală */}
        <div className="space-y-6 lg:col-span-2">
          {/* Date de bază */}
          <Section title="Informații de bază">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Nume proiect</label>
                <input
                  className={inputCls}
                  value={p.name}
                  onChange={(e) => set("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>
                  Slug (URL){" "}
                  <span className="lowercase text-bone/30">
                    — lasă gol pentru auto
                  </span>
                </label>
                <input
                  className={inputCls}
                  value={p.slug}
                  onChange={(e) => set("slug", e.target.value)}
                  placeholder="ex: rivo-park-residence"
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Tagline (subtitlu scurt)</label>
              <input
                className={inputCls}
                value={p.tagline}
                onChange={(e) => set("tagline", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Locație</label>
              <input
                className={inputCls}
                value={p.location}
                onChange={(e) => set("location", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>Descriere</label>
              <textarea
                className={`${inputCls} resize-y`}
                rows={5}
                value={p.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </div>
          </Section>

          {/* Galerie */}
          <Section title="Imagine principală & galerie">
            <ImageUploader
              label="Imagine principală (cover)"
              value={p.cover}
              onChange={(url) => set("cover", url)}
            />
            <div className="mt-6">
              <p className={labelCls}>Galerie</p>
              <div className="space-y-3">
                {p.gallery.map((img, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="flex-1">
                      <ImageUploader
                        compact
                        value={img}
                        onChange={(url) =>
                          set(
                            "gallery",
                            p.gallery.map((g, gi) => (gi === i ? url : g))
                          )
                        }
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        set(
                          "gallery",
                          p.gallery.filter((_, gi) => gi !== i)
                        )
                      }
                      className="mt-1 flex h-9 w-9 items-center justify-center rounded-lg border border-bone/15 text-bone/50 hover:border-red-400/50 hover:text-red-300"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
              <AddBtn
                label="Adaugă imagine în galerie"
                onClick={() => set("gallery", [...p.gallery, ""])}
              />
            </div>
          </Section>

          {/* Specificații */}
          <Section title="Specificații">
            <div className="space-y-3">
              {p.specs.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className={inputCls}
                    placeholder="Etichetă (ex: Apartamente)"
                    value={s.label}
                    onChange={(e) =>
                      set(
                        "specs",
                        p.specs.map((x, xi) =>
                          xi === i ? { ...x, label: e.target.value } : x
                        )
                      )
                    }
                  />
                  <input
                    className={inputCls}
                    placeholder="Valoare (ex: 84 unități)"
                    value={s.value}
                    onChange={(e) =>
                      set(
                        "specs",
                        p.specs.map((x, xi) =>
                          xi === i ? { ...x, value: e.target.value } : x
                        )
                      )
                    }
                  />
                  <RemoveBtn
                    onClick={() =>
                      set(
                        "specs",
                        p.specs.filter((_, xi) => xi !== i)
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <AddBtn
              label="Adaugă specificație"
              onClick={() =>
                set("specs", [...p.specs, { label: "", value: "" }])
              }
            />
          </Section>

          {/* Tipologii */}
          <Section title="Tipologii & suprafețe">
            <div className="space-y-3">
              {p.typologies.map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className={inputCls}
                    placeholder="Nume (ex: 2 camere)"
                    value={t.name}
                    onChange={(e) =>
                      set(
                        "typologies",
                        p.typologies.map((x, xi) =>
                          xi === i ? { ...x, name: e.target.value } : x
                        )
                      )
                    }
                  />
                  <input
                    className={inputCls}
                    placeholder="Suprafață (ex: 54–66 m²)"
                    value={t.surface}
                    onChange={(e) =>
                      set(
                        "typologies",
                        p.typologies.map((x, xi) =>
                          xi === i ? { ...x, surface: e.target.value } : x
                        )
                      )
                    }
                  />
                  <input
                    className={`${inputCls} max-w-[90px]`}
                    placeholder="Cam."
                    value={t.rooms}
                    onChange={(e) =>
                      set(
                        "typologies",
                        p.typologies.map((x, xi) =>
                          xi === i ? { ...x, rooms: e.target.value } : x
                        )
                      )
                    }
                  />
                  <RemoveBtn
                    onClick={() =>
                      set(
                        "typologies",
                        p.typologies.filter((_, xi) => xi !== i)
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <AddBtn
              label="Adaugă tipologie"
              onClick={() =>
                set("typologies", [
                  ...p.typologies,
                  { name: "", surface: "", rooms: "" },
                ])
              }
            />
          </Section>

          {/* Facilități */}
          <Section title="Facilități">
            <div className="space-y-3">
              {p.amenities.map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    className={inputCls}
                    placeholder="ex: Parcare subterană"
                    value={a}
                    onChange={(e) =>
                      set(
                        "amenities",
                        p.amenities.map((x, xi) =>
                          xi === i ? e.target.value : x
                        )
                      )
                    }
                  />
                  <RemoveBtn
                    onClick={() =>
                      set(
                        "amenities",
                        p.amenities.filter((_, xi) => xi !== i)
                      )
                    }
                  />
                </div>
              ))}
            </div>
            <AddBtn
              label="Adaugă facilitate"
              onClick={() => set("amenities", [...p.amenities, ""])}
            />
          </Section>
        </div>

        {/* Coloana laterală */}
        <div className="space-y-6">
          <Section title="Status & clasificare">
            <div>
              <label className={labelCls}>Status</label>
              <select
                className={`${inputCls} [&>option]:bg-ink`}
                value={p.status}
                onChange={(e) => set("status", e.target.value as ProjectStatus)}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Tip</label>
              <select
                className={`${inputCls} [&>option]:bg-ink`}
                value={p.type}
                onChange={(e) => set("type", e.target.value as ProjectType)}
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>An</label>
              <input
                className={inputCls}
                value={p.year}
                onChange={(e) => set("year", e.target.value)}
              />
            </div>
            <div>
              <label className={labelCls}>
                Stadiu lucrări: {p.progress}%
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={p.progress}
                onChange={(e) => set("progress", Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
            </div>
          </Section>

          <Section title="Locație pe hartă">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Latitudine</label>
                <input
                  className={inputCls}
                  type="number"
                  step="0.0001"
                  value={p.map.lat}
                  onChange={(e) =>
                    set("map", { ...p.map, lat: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className={labelCls}>Longitudine</label>
                <input
                  className={inputCls}
                  type="number"
                  step="0.0001"
                  value={p.map.lng}
                  onChange={(e) =>
                    set("map", { ...p.map, lng: Number(e.target.value) })
                  }
                />
              </div>
            </div>
            <p className="mt-2 font-sans text-xs text-bone/40">
              Coordonate aproximative pentru harta din pagina proiectului.
            </p>
          </Section>
        </div>
      </div>
    </form>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-bone/10 bg-ink-soft p-6">
      <h2 className="mb-5 font-serif text-lg text-bone">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function AddBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 inline-flex items-center gap-2 rounded-lg border border-dashed border-bone/20 px-3 py-2 font-sans text-xs text-bone/60 transition-colors hover:border-accent/50 hover:text-accent"
    >
      <Plus size={14} />
      {label}
    </button>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Elimină"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-bone/15 text-bone/50 hover:border-red-400/50 hover:text-red-300"
    >
      <Trash2 size={15} />
    </button>
  );
}
