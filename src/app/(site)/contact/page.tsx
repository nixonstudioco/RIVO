import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { getProjects, getSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează RIVO Imobiliare din Satu Mare. Programează o vizionare sau cere o ofertă pentru proiectele noastre rezidențiale.",
};

export default async function ContactPage() {
  const [settings, allProjects] = await Promise.all([
    getSettings(),
    getProjects(),
  ]);
  const projects = allProjects.map((p) => ({ slug: p.slug, name: p.name }));

  const DETAILS = [
    { icon: MapPin, label: "Adresă", value: settings.contact.address },
    { icon: Phone, label: "Telefon", value: settings.contact.phone },
    { icon: Mail, label: "Email", value: settings.contact.email },
    { icon: Clock, label: "Program", value: settings.contact.program },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Hai să <span className="italic text-accent">vorbim</span>
          </>
        }
        description="Ai o întrebare, vrei o vizionare sau o ofertă? Completează formularul sau folosește datele de mai jos. Îți răspundem prompt."
      />

      <section className="container-rivo pb-16 lg:pb-24">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Formular */}
          <div className="lg:col-span-7">
            <Suspense fallback={<div className="h-96" />}>
              <ContactForm projects={projects} />
            </Suspense>
          </div>

          {/* Detalii */}
          <div className="lg:col-span-5 lg:pl-8">
            <Reveal>
              <h2 className="font-serif text-2xl text-bone">
                Date de contact
              </h2>
            </Reveal>
            <div className="mt-8 space-y-8">
              {DETAILS.map(({ icon: Icon, label, value }) => (
                <Reveal key={label}>
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-bone/15 text-accent">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-[0.18em] text-bone/40">
                        {label}
                      </p>
                      <p className="mt-1 whitespace-pre-line font-sans text-base text-bone/80">
                        {value}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hartă */}
      <section className="container-rivo pb-28 lg:pb-40">
        <Reveal>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-bone/10 lg:aspect-[21/8]">
            <iframe
              title="Sediul RIVO Imobiliare — Satu Mare"
              className="h-full w-full grayscale-[0.4] invert-[0.92] hue-rotate-180 contrast-[0.9]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=22.864%2C47.785%2C22.905%2C47.802&layer=mapnik&marker=47.7929%2C22.8857"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}
