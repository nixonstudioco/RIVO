"use client";

import { ShieldCheck, Gem, MapPinned, CalendarCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const VALUES = [
  {
    icon: Gem,
    title: "Calitate fără compromis",
    text: "Materiale premium, execuție atentă și finisaje care rezistă în timp. Nu livrăm nimic ce nu am locui noi înșine.",
  },
  {
    icon: ShieldCheck,
    title: "Transparență totală",
    text: "Contracte clare, prețuri corecte și comunicare directă la fiecare etapă. Fără surprize, fără costuri ascunse.",
  },
  {
    icon: MapPinned,
    title: "Locații premium",
    text: "Alegem terenuri cu acces bun, verdeață și potențial real, în zonele care definesc viitorul Satu Mare-ului.",
  },
  {
    icon: CalendarCheck,
    title: "Predare la timp",
    text: "Respectăm termenele asumate. Planificare riguroasă și parteneri de încredere, ca tu să-ți faci planuri liniștit.",
  },
];

export default function WhyRivo() {
  return (
    <section className="relative border-t border-bone/10 py-28 lg:py-40">
      <div className="container-rivo">
        <SectionHeading
          index="03"
          eyebrow="De ce RIVO"
          title={
            <>
              Patru motive pentru care{" "}
              <span className="italic text-accent">contează</span> cu cine
              construiești
            </>
          }
        />

        <RevealGroup
          className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {VALUES.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title}>
              <div className="group h-full bg-ink p-8 transition-colors duration-500 hover:bg-ink-soft">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/15 text-accent transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                  <Icon size={22} />
                </span>
                <h3 className="mt-8 font-serif text-xl text-bone">{title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-bone/55">
                  {text}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
