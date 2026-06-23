"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowUpRight,
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Marquee from "@/components/ui/Marquee";
import type { SiteSettings } from "@/lib/types";

const FOOTER_NAV = [
  { href: "/proiecte", label: "Proiecte" },
  { href: "/despre", label: "Despre noi" },
  { href: "/contact", label: "Contact" },
];

const LEGAL = [
  { href: "#", label: "Politică de confidențialitate" },
  { href: "#", label: "Termeni și condiții" },
  { href: "#", label: "Politică cookies" },
  { href: "#", label: "ANPC" },
];

export default function Footer({ settings }: { settings: SiteSettings }) {
  const SOCIAL = [
    { href: settings.social.instagram || "#", label: "Instagram", icon: Instagram },
    { href: settings.social.facebook || "#", label: "Facebook", icon: Facebook },
    { href: settings.social.linkedin || "#", label: "LinkedIn", icon: Linkedin },
  ];

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // TODO: conectează la un serviciu real de newsletter.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative overflow-hidden border-t border-bone/10 bg-ink-soft">
      <div className="border-b border-bone/10 py-8">
        <Marquee
          items={[
            "RIVO IMOBILIARE",
            "SATU MARE",
            "CONSTRUIM VIITORUL",
            "PREMIUM RESIDENTIAL",
          ]}
        />
      </div>

      <div className="container-rivo py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* Brand + manifest */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-rivo.png"
                alt="RIVO Imobiliare"
                width={873}
                height={360}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-6 max-w-sm font-sans text-base leading-relaxed text-bone/55">
              Dezvoltăm proiecte rezidențiale și mixte premium în Satu Mare.
              Construim cu grijă pentru detaliu, transparență și respect pentru
              oamenii care vor locui acolo.
            </p>

            <form onSubmit={onSubscribe} className="mt-10 max-w-sm">
              <label
                htmlFor="newsletter"
                className="font-sans text-xs uppercase tracking-[0.25em] text-bone/40"
              >
                Newsletter
              </label>
              <div className="mt-3 flex items-center gap-3 border-b border-bone/20 pb-2 focus-within:border-accent">
                <Mail size={16} className="text-bone/40" />
                <input
                  id="newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresa ta de email"
                  className="w-full bg-transparent font-sans text-sm text-bone placeholder:text-bone/30 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Abonează-te"
                  className="text-bone/60 transition-colors hover:text-accent"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
              {subscribed && (
                <p className="mt-3 font-sans text-xs text-accent-soft">
                  Mulțumim! Te-am adăugat pe lista RIVO.
                </p>
              )}
            </form>
          </div>

          {/* Navigare */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-bone/40">
              Navigare
            </h3>
            <ul className="mt-6 space-y-3">
              {FOOTER_NAV.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="link-underline font-sans text-sm text-bone/70 transition-colors hover:text-bone"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-bone/40">
              Contact
            </h3>
            <ul className="mt-6 space-y-4 font-sans text-sm text-bone/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>{settings.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-accent" />
                <a
                  href={`tel:${settings.contact.phone.replace(/\s/g, "")}`}
                  className="link-underline"
                >
                  {settings.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-accent" />
                <a
                  href={`mailto:${settings.contact.email}`}
                  className="link-underline"
                >
                  {settings.contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-2">
            <h3 className="font-sans text-xs uppercase tracking-[0.25em] text-bone/40">
              Urmărește-ne
            </h3>
            <div className="mt-6 flex gap-3">
              {SOCIAL.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 text-bone/70 transition-all duration-300 hover:border-accent hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 hairline" />

        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="font-sans text-xs text-bone/40">
            © {new Date().getFullYear()} RIVO Imobiliare. Toate drepturile
            rezervate.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="font-sans text-xs text-bone/40 transition-colors hover:text-bone/70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
