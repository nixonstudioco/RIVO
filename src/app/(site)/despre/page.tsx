import type { Metadata } from "next";
import Image from "next/image";
import { Compass, HeartHandshake, Leaf, Sparkles } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Despre noi",
  description:
    "RIVO Imobiliare — dezvoltator rezidențial din Satu Mare. Valorile și principiile după care construim.",
  alternates: { canonical: "/despre" },
};

const VALUES = [
  {
    icon: Sparkles,
    title: "Excelență",
    text: "Ridicăm constant standardul, de la materiale la experiența clientului.",
  },
  {
    icon: HeartHandshake,
    title: "Integritate",
    text: "Ne ținem promisiunile. Cuvântul dat valorează cât un contract semnat.",
  },
  {
    icon: Leaf,
    title: "Sustenabilitate",
    text: "Construim eficient energetic, cu respect pentru oraș și mediu.",
  },
  {
    icon: Compass,
    title: "Viziune",
    text: "Gândim proiecte care rămân relevante și peste 30 de ani.",
  },
];

export default function DesprePage() {
  return (
    <>
      <PageHeader
        eyebrow="Despre RIVO"
        title={
          <>
            Construim cu{" "}
            <span className="italic text-accent">grijă</span> pentru oameni și
            oraș
          </>
        }
        description="Suntem un dezvoltator imobiliar din Satu Mare, dedicat proiectelor rezidențiale și mixte de calitate. Punem accent pe detaliu, transparență și pe comunitățile pe care le creăm."
      />

      {/* Poveste cu imagine */}
      <section className="container-rivo py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
                alt="Ansamblu rezidențial în construcție"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <SectionHeading
              index="01"
              eyebrow="Cine suntem"
              title={
                <>
                  Un început construit pe{" "}
                  <span className="italic text-accent">standarde</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 font-sans text-base leading-relaxed text-bone/60">
                <p>
                  RIVO a pornit dintr-o convingere simplă: Satu Mare merită
                  locuințe la standardele orașelor din Vest. Suntem un
                  dezvoltator tânăr și tratăm asta ca pe un avantaj — putem
                  construi de la zero exact așa cum credem că trebuie făcut.
                </p>
                <p>
                  Fiecare proiect este pentru noi o promisiune. De aceea
                  alegem cu grijă terenurile, lucrăm cu arhitecți și
                  constructori de top și verificăm fiecare detaliu înainte de a
                  preda cheile.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Valori */}
      <section className="border-t border-bone/10 py-24 lg:py-32">
        <div className="container-rivo">
          <SectionHeading
            index="02"
            eyebrow="Valori"
            title="Ce ne ține pe drumul drept"
          />
          <RevealGroup
            className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4"
            stagger={0.1}
          >
            {VALUES.map(({ icon: Icon, title, text }) => (
              <RevealItem key={title}>
                <div className="group h-full bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft">
                  <Icon size={24} className="text-accent" />
                  <h3 className="mt-6 font-serif text-xl text-bone">{title}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-bone/55">
                    {text}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="container-rivo pb-28 lg:pb-40">
        <div className="rounded-3xl border border-bone/10 bg-ink-soft p-10 text-center sm:p-16">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-tight tracking-tightest">
              Vrei să afli mai multe despre{" "}
              <span className="italic text-accent">proiectele noastre</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <MagneticButton href="/proiecte" cursorLabel="Explorează">
                Vezi proiectele
              </MagneticButton>
              <MagneticButton href="/contact" variant="outline">
                Contactează-ne
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
