"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/MagneticButton";
import type { SiteSettings } from "@/lib/types";

const NAV_LINKS = [
  { href: "/", label: "Acasă" },
  { href: "/proiecte", label: "Proiecte" },
  { href: "/despre", label: "Despre" },
  { href: "/contact", label: "Contact" },
];

function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link
      href="/"
      aria-label="RIVO Imobiliare — Acasă"
      className="group flex items-center"
    >
      <Image
        src="/logo-rivo.png"
        alt="RIVO Imobiliare"
        width={873}
        height={360}
        priority
        className={cn(
          "w-auto transition-all duration-500 ease-rivo",
          scrolled ? "h-8" : "h-10"
        )}
      />
    </Link>
  );
}

export default function Navbar({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // Ascunde la scroll în jos, arată la scroll în sus (peste prag).
      if (y > 240 && y > lastY) setHidden(true);
      else setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Închide meniul mobil la schimbarea rutei.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: hidden && !open ? -120 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[90]"
      >
        <div
          className={cn(
            "transition-all duration-500 ease-rivo",
            scrolled
              ? "border-b border-bone/10 bg-ink/70 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <nav
            className={cn(
              "container-rivo flex items-center justify-between transition-all duration-500 ease-rivo",
              scrolled ? "h-16" : "h-24"
            )}
          >
            <Logo scrolled={scrolled} />

            <ul className="hidden items-center gap-9 md:flex">
              {NAV_LINKS.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "link-underline font-sans text-sm tracking-wide transition-colors duration-300",
                        active ? "text-bone" : "text-bone/55 hover:text-bone"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="hidden md:block">
              <MagneticButton
                href="/contact"
                variant="outline"
                className="px-6 py-2.5"
                cursorLabel="Hai să vorbim"
              >
                Programează o vizionare
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-bone/15 text-bone md:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Meniu mobil full-screen */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[88] bg-ink/95 backdrop-blur-2xl md:hidden"
          >
            <div className="container-rivo flex h-full flex-col justify-center gap-2 pt-20">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    delay: 0.08 * i,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-bone/10 py-5 font-serif text-4xl text-bone"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <p className="mt-10 font-sans text-sm text-bone/50">
                {settings.contact.address}
                <br />
                {settings.contact.phone} · {settings.contact.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
