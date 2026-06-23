import Link from "next/link";
import {
  Building2,
  Inbox,
  Mail,
  CalendarClock,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { getProjects, getSubmissions } from "@/lib/store";
import {
  STATUS_LABELS,
} from "@/lib/projects";
import {
  SUBMISSION_TYPE_LABELS,
  SUBMISSION_STATUS_LABELS,
} from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [projects, submissions] = await Promise.all([
    getProjects(),
    getSubmissions(),
  ]);
  const newCount = submissions.filter((s) => s.status === "nou").length;
  const viewings = submissions.filter((s) => s.type === "vizionare").length;

  const cards = [
    {
      label: "Proiecte",
      value: projects.length,
      icon: Building2,
      href: "/admin/proiecte",
    },
    {
      label: "Mesaje noi",
      value: newCount,
      icon: Inbox,
      href: "/admin/mesaje",
    },
    {
      label: "Total solicitări",
      value: submissions.length,
      icon: Mail,
      href: "/admin/mesaje",
    },
    {
      label: "Cereri vizionare",
      value: viewings,
      icon: CalendarClock,
      href: "/admin/mesaje",
    },
  ];

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl tracking-tightest sm:text-4xl">
            Bun venit înapoi
          </h1>
          <p className="mt-2 font-sans text-sm text-bone/50">
            Gestionează proiectele, conținutul și solicitările RIVO.
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

      {/* Carduri statistici */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-bone/10 bg-ink-soft p-6 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center justify-between">
              <Icon size={22} className="text-accent" />
              <ArrowUpRight
                size={18}
                className="text-bone/30 transition-colors group-hover:text-accent"
              />
            </div>
            <p className="mt-6 font-serif text-4xl font-semibold">{value}</p>
            <p className="mt-1 font-sans text-sm text-bone/50">{label}</p>
          </Link>
        ))}
      </div>

      {/* Proiecte + solicitări recente */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-bone/10 bg-ink-soft p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl">Proiecte</h2>
            <Link
              href="/admin/proiecte"
              className="font-sans text-xs text-accent hover:underline"
            >
              Vezi toate
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-bone/10">
            {projects.slice(0, 5).map((p) => (
              <li
                key={p.slug}
                className="flex items-center justify-between py-3"
              >
                <Link
                  href={`/admin/proiecte/${p.slug}`}
                  className="font-sans text-sm text-bone hover:text-accent"
                >
                  {p.name}
                </Link>
                <span className="font-sans text-xs text-bone/40">
                  {STATUS_LABELS[p.status]}
                </span>
              </li>
            ))}
            {projects.length === 0 && (
              <li className="py-3 font-sans text-sm text-bone/40">
                Niciun proiect încă.
              </li>
            )}
          </ul>
        </section>

        <section className="rounded-2xl border border-bone/10 bg-ink-soft p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl">Solicitări recente</h2>
            <Link
              href="/admin/mesaje"
              className="font-sans text-xs text-accent hover:underline"
            >
              Vezi toate
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-bone/10">
            {submissions.slice(0, 5).map((s) => (
              <li key={s.id} className="py-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm text-bone">{s.name}</span>
                  <span className="font-sans text-xs text-accent-soft">
                    {SUBMISSION_TYPE_LABELS[s.type]}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-sans text-xs text-bone/40">
                    {s.email}
                  </span>
                  <span className="font-sans text-xs text-bone/40">
                    {SUBMISSION_STATUS_LABELS[s.status]}
                  </span>
                </div>
              </li>
            ))}
            {submissions.length === 0 && (
              <li className="py-3 font-sans text-sm text-bone/40">
                Nicio solicitare încă.
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
