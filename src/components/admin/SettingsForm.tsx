"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Check } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

const labelCls =
  "mb-2 block font-sans text-xs uppercase tracking-[0.14em] text-bone/40";
const inputCls =
  "w-full rounded-lg border border-bone/15 bg-ink px-3 py-2.5 font-sans text-sm text-bone placeholder:text-bone/30 focus:border-accent focus:outline-none";

export default function SettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [s, setS] = useState<SiteSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings: s }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare la salvare.");
      setSaved(true);
      router.refresh();
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-6 lg:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl tracking-tightest sm:text-4xl">
            Conținut & Setări
          </h1>
          <p className="mt-2 font-sans text-sm text-bone/50">
            Editează textele site-ului, statisticile și datele de contact.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:bg-accent-soft disabled:opacity-70"
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : saved ? (
            <Check size={16} />
          ) : (
            <Save size={16} />
          )}
          {saved ? "Salvat" : "Salvează"}
        </button>
      </div>

      {error && (
        <p className="mt-6 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 font-sans text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Hero */}
        <Section title="Secțiunea Hero (prima pagină)">
          <Field label="Eyebrow (text mic deasupra titlului)">
            <input
              className={inputCls}
              value={s.hero.eyebrow}
              onChange={(e) =>
                setS({ ...s, hero: { ...s.hero, eyebrow: e.target.value } })
              }
            />
          </Field>
          <Field label="Titlu — rândul 1">
            <input
              className={inputCls}
              value={s.hero.titleTop}
              onChange={(e) =>
                setS({ ...s, hero: { ...s.hero, titleTop: e.target.value } })
              }
            />
          </Field>
          <Field label="Titlu — rândul 2 (accentuat)">
            <input
              className={inputCls}
              value={s.hero.titleAccent}
              onChange={(e) =>
                setS({
                  ...s,
                  hero: { ...s.hero, titleAccent: e.target.value },
                })
              }
            />
          </Field>
          <Field label="Subtitlu">
            <textarea
              className={`${inputCls} resize-y`}
              rows={3}
              value={s.hero.subtitle}
              onChange={(e) =>
                setS({ ...s, hero: { ...s.hero, subtitle: e.target.value } })
              }
            />
          </Field>
        </Section>

        {/* Manifest + brand */}
        <Section title="Brand & manifest">
          <Field label="Nume brand">
            <input
              className={inputCls}
              value={s.brand.name}
              onChange={(e) =>
                setS({ ...s, brand: { ...s.brand, name: e.target.value } })
              }
            />
          </Field>
          <Field label="Tagline brand">
            <input
              className={inputCls}
              value={s.brand.tagline}
              onChange={(e) =>
                setS({ ...s, brand: { ...s.brand, tagline: e.target.value } })
              }
            />
          </Field>
          <Field label="Text manifest (secțiunea Viziune)">
            <textarea
              className={`${inputCls} resize-y`}
              rows={5}
              value={s.manifest}
              onChange={(e) => setS({ ...s, manifest: e.target.value })}
            />
          </Field>
        </Section>

        {/* Statistici */}
        <Section title="Statistici animate">
          <div className="space-y-4">
            {s.stats.map((stat, i) => (
              <div key={i} className="grid grid-cols-12 gap-2">
                <input
                  className={`${inputCls} col-span-3`}
                  type="number"
                  value={stat.value}
                  onChange={(e) =>
                    setS({
                      ...s,
                      stats: s.stats.map((x, xi) =>
                        xi === i ? { ...x, value: Number(e.target.value) } : x
                      ),
                    })
                  }
                />
                <input
                  className={`${inputCls} col-span-2`}
                  placeholder="+ / K"
                  value={stat.suffix}
                  onChange={(e) =>
                    setS({
                      ...s,
                      stats: s.stats.map((x, xi) =>
                        xi === i ? { ...x, suffix: e.target.value } : x
                      ),
                    })
                  }
                />
                <input
                  className={`${inputCls} col-span-7`}
                  placeholder="Etichetă"
                  value={stat.label}
                  onChange={(e) =>
                    setS({
                      ...s,
                      stats: s.stats.map((x, xi) =>
                        xi === i ? { ...x, label: e.target.value } : x
                      ),
                    })
                  }
                />
              </div>
            ))}
          </div>
        </Section>

        {/* Contact + social */}
        <Section title="Date de contact & social">
          <Field label="Adresă">
            <textarea
              className={`${inputCls} resize-y`}
              rows={2}
              value={s.contact.address}
              onChange={(e) =>
                setS({
                  ...s,
                  contact: { ...s.contact, address: e.target.value },
                })
              }
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Telefon">
              <input
                className={inputCls}
                value={s.contact.phone}
                onChange={(e) =>
                  setS({
                    ...s,
                    contact: { ...s.contact, phone: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Email">
              <input
                className={inputCls}
                value={s.contact.email}
                onChange={(e) =>
                  setS({
                    ...s,
                    contact: { ...s.contact, email: e.target.value },
                  })
                }
              />
            </Field>
          </div>
          <Field label="Program">
            <textarea
              className={`${inputCls} resize-y`}
              rows={2}
              value={s.contact.program}
              onChange={(e) =>
                setS({
                  ...s,
                  contact: { ...s.contact, program: e.target.value },
                })
              }
            />
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Field label="Instagram URL">
              <input
                className={inputCls}
                value={s.social.instagram}
                onChange={(e) =>
                  setS({
                    ...s,
                    social: { ...s.social, instagram: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Facebook URL">
              <input
                className={inputCls}
                value={s.social.facebook}
                onChange={(e) =>
                  setS({
                    ...s,
                    social: { ...s.social, facebook: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="LinkedIn URL">
              <input
                className={inputCls}
                value={s.social.linkedin}
                onChange={(e) =>
                  setS({
                    ...s,
                    social: { ...s.social, linkedin: e.target.value },
                  })
                }
              />
            </Field>
          </div>
        </Section>
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}
