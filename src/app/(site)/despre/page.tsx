import type { Metadata } from "next";
import Image from "next/image";
import { Compass, HeartHandshake, Leaf, Sparkles } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal, { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import MagneticButton from "@/components/ui/MagneticButton";

export const metadata: Metadata = {
  title: "Despre noi",
  description:
    "Povestea RIVO Imobiliare: cum am ajuns un reper printre dezvoltatorii din Satu Mare, valorile și echipa din spatele proiectelor.",
};

// TODO: înlocuiește cu echipa reală (nume, roluri, fotografii).
const TEAM = [
  {
    name: "Andrei Rusu",
    role: "Fondator & CEO",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ioana Varga",
    role: "Director Dezvoltare",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mihai Crișan",
    role: "Arhitect-șef",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Elena Marc",
    role: "Director Vânzări",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
  },
];

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

const MILESTONES = [
  { year: "2013", text: "RIVO se naște la Satu Mare, cu primul teren achiziționat." },
  { year: "2016", text: "Finalizăm primul ansamblu rezidențial — 48 de apartamente." },
  { year: "2020", text: "Depășim 1.000 de unități livrate în diverse proiecte." },
  { year: "2023", text: "Lansăm RIVO Green Court, complet locuit în primul an." },
  { year: "2026", text: "Patru proiecte simultane în dezvoltare. Și abia începem." },
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
                alt="Echipa RIVO pe șantier"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-6">
            <SectionHeading
              index="01"
              eyebrow="Povestea noastră"
              title={
                <>
                  De la o idee, la un reper al{" "}
                  <span className="italic text-accent">orașului</span>
                </>
              }
            />
            <Reveal delay={0.1}>
              <div className="mt-8 space-y-5 font-sans text-base leading-relaxed text-bone/60">
                <p>
                  RIVO a pornit dintr-o convingere simplă: Satu Mare merită
                  locuințe la standardele orașelor din Vest. Am început cu un
                  singur teren și multă ambiție, iar astăzi suntem printre
                  dezvoltatorii de referință ai regiunii.
                </p>
                <p>
                  Fiecare proiect este pentru noi o promisiune. De aceea
                  alegem cu grijă terenurile, lucrăm cu arhitecți și
                  constructori de top și verificăm fiecare detaliu înainte de a
                  preda cheile.
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { v: 12, s: "+", l: "Ani" },
                { v: 9, s: "", l: "Proiecte" },
                { v: 1450, s: "+", l: "Unități" },
              ].map((stat) => (
                <Reveal key={stat.l}>
                  <div>
                    <p className="font-serif text-4xl text-bone">
                      <Counter value={stat.v} suffix={stat.s} />
                    </p>
                    <p className="mt-1 font-sans text-sm text-bone/50">
                      {stat.l}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
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

      {/* Istoric / realizări */}
      <section className="border-t border-bone/10 py-24 lg:py-32">
        <div className="container-rivo">
          <SectionHeading index="03" eyebrow="Parcurs" title="Repere în timp" />
          <div className="mt-14 border-t border-bone/10">
            {MILESTONES.map((m) => (
              <Reveal key={m.year}>
                <div className="group grid grid-cols-1 gap-2 border-b border-bone/10 py-8 transition-colors hover:bg-ink-soft/50 sm:grid-cols-12 sm:items-baseline sm:gap-8">
                  <span className="font-serif text-3xl text-accent sm:col-span-2">
                    {m.year}
                  </span>
                  <p className="font-sans text-lg text-bone/75 sm:col-span-10">
                    {m.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Echipă */}
      <section className="border-t border-bone/10 py-24 lg:py-32">
        <div className="container-rivo">
          <SectionHeading
            index="04"
            eyebrow="Echipă"
            title="Oamenii din spatele RIVO"
            description="O echipă mică, dedicată, care pune pasiune în fiecare metru pătrat."
          />
          <RevealGroup
            className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4"
            stagger={0.1}
          >
            {TEAM.map((member) => (
              <RevealItem key={member.name}>
                <div className="group">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink-muted">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-lg text-bone">
                    {member.name}
                  </h3>
                  <p className="font-sans text-sm text-accent-soft">
                    {member.role}
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
