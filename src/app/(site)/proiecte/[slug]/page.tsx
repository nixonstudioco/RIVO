import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { getProjectBySlug, getProjects } from "@/lib/store";
import ProjectDetailHero from "@/components/projects/ProjectDetailHero";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProgressBar from "@/components/projects/ProgressBar";
import ProjectCard from "@/components/projects/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "Proiect inexistent" };

  return {
    title: project.name,
    description: `${project.tagline} ${project.location}. ${project.description.slice(0, 120)}`,
    openGraph: {
      title: `${project.name} · RIVO Imobiliare`,
      description: project.tagline,
      images: [project.cover],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const related = (await getProjects())
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <article>
      <ProjectDetailHero project={project} />

      {/* Descriere + specificații */}
      <section className="container-rivo py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <span className="section-index">Despre proiect</span>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 font-serif text-2xl leading-[1.4] text-bone sm:text-3xl">
                {project.tagline}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-bone/60">
                {project.description}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-12 max-w-md">
                <ProgressBar value={project.progress} />
              </div>
            </Reveal>
          </div>

          {/* Specificații */}
          <div className="lg:col-span-5">
            <Reveal>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10">
                {project.specs.map((spec) => (
                  <div key={spec.label} className="bg-ink p-6">
                    <dt className="font-sans text-xs uppercase tracking-[0.14em] text-bone/45">
                      {spec.label}
                    </dt>
                    <dd className="mt-2 font-serif text-xl text-bone">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="container-rivo py-12 lg:py-16">
        <Reveal>
          <h2 className="mb-10 text-3xl tracking-tightest sm:text-4xl">
            Galerie
          </h2>
        </Reveal>
        <ProjectGallery images={project.gallery} name={project.name} />
      </section>

      {/* Tipologii + facilități */}
      <section className="container-rivo py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="text-3xl tracking-tightest sm:text-4xl">
                Tipologii & suprafețe
              </h2>
            </Reveal>
            <div className="mt-10 divide-y divide-bone/10 border-y border-bone/10">
              {project.typologies.map((t) => (
                <Reveal key={t.name}>
                  <div className="flex items-center justify-between py-5">
                    <div>
                      <p className="font-serif text-xl text-bone">{t.name}</p>
                      <p className="font-sans text-sm text-bone/50">
                        {t.rooms} {t.rooms === "1" ? "cameră" : "camere"}
                      </p>
                    </div>
                    <span className="font-sans text-lg text-accent">
                      {t.surface}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
            {/* TODO: adaugă planuri / tipologii reale (PDF sau imagini). */}
            <p className="mt-6 font-sans text-xs text-bone/40">
              Planurile detaliate sunt disponibile la cerere.
            </p>
          </div>

          <div>
            <Reveal>
              <h2 className="text-3xl tracking-tightest sm:text-4xl">
                Facilități
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {project.amenities.map((a) => (
                <Reveal key={a}>
                  <li className="flex items-center gap-3 font-sans text-base text-bone/75">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 text-accent">
                      <Check size={14} />
                    </span>
                    {a}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Locație / hartă */}
      <section className="container-rivo py-12 lg:py-16">
        <Reveal>
          <h2 className="mb-10 text-3xl tracking-tightest sm:text-4xl">
            Locație
          </h2>
        </Reveal>
        <Reveal>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-bone/10 lg:aspect-[21/9]">
            {/* Embed simplu OpenStreetMap (fără chei API). */}
            <iframe
              title={`Hartă ${project.name}`}
              className="h-full w-full grayscale-[0.4] invert-[0.92] hue-rotate-180 contrast-[0.9]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                project.map.lng - 0.012
              }%2C${project.map.lat - 0.008}%2C${project.map.lng + 0.012}%2C${
                project.map.lat + 0.008
              }&layer=mapnik&marker=${project.map.lat}%2C${project.map.lng}`}
            />
          </div>
        </Reveal>
        <p className="mt-4 font-sans text-sm text-bone/50">{project.location}</p>
      </section>

      {/* CTA */}
      <section className="container-rivo py-24 lg:py-32">
        <div className="overflow-hidden rounded-3xl border border-bone/10 bg-ink-soft p-10 text-center sm:p-16">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-tight tracking-tightest">
              Te interesează{" "}
              <span className="italic text-accent">{project.name}</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-5 max-w-lg font-sans text-base text-bone/60">
              Programează o vizionare sau cere o ofertă personalizată pentru
              acest proiect. Îți răspundem în cel mai scurt timp.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton
                href={`/contact?proiect=${project.slug}`}
                cursorLabel="Scrie-ne"
              >
                Programează o vizionare
              </MagneticButton>
              <MagneticButton
                href={`/contact?proiect=${project.slug}`}
                variant="outline"
              >
                Cere ofertă
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Proiecte similare */}
      <section className="container-rivo pb-28 lg:pb-40">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-3xl tracking-tightest sm:text-4xl">
            Alte proiecte
          </h2>
          <Link
            href="/proiecte"
            className="group inline-flex items-center gap-2 font-sans text-sm text-bone/70 transition-colors hover:text-bone"
          >
            Vezi toate
            <ArrowRight
              size={18}
              className="text-accent transition-transform duration-500 group-hover:translate-x-1"
            />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {related.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>
    </article>
  );
}
