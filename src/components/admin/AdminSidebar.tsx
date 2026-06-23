"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Settings,
  Inbox,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/admin", label: "Panou", icon: LayoutDashboard, exact: true },
  { href: "/admin/proiecte", label: "Proiecte", icon: Building2 },
  { href: "/admin/mesaje", label: "Mesaje & Vizionări", icon: Inbox },
  { href: "/admin/setari", label: "Conținut & Setări", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {/* Bara mobilă */}
      <div className="flex items-center justify-between border-b border-bone/10 bg-ink-soft p-4 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/logo-rivo.png"
            alt="RIVO Imobiliare"
            width={873}
            height={360}
            className="h-7 w-auto"
          />
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent">
            Admin
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Meniu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-bone/15"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <aside
        className={cn(
          "border-bone/10 bg-ink-soft lg:flex lg:h-screen lg:w-64 lg:flex-col lg:border-r",
          open ? "block" : "hidden lg:block"
        )}
      >
        <div className="hidden items-center gap-2 p-6 lg:flex">
          <Image
            src="/logo-rivo.png"
            alt="RIVO Imobiliare"
            width={873}
            height={360}
            className="h-8 w-auto"
          />
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-accent">
            Admin
          </span>
        </div>

        <nav className="flex flex-col gap-1 p-4 lg:px-4">
          {LINKS.map(({ href, label, icon: Icon, exact }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 font-sans text-sm transition-colors",
                isActive(href, exact)
                  ? "bg-accent/15 text-accent-soft"
                  : "text-bone/60 hover:bg-bone/5 hover:text-bone"
              )}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-1 border-t border-bone/10 p-4">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg px-4 py-3 font-sans text-sm text-bone/60 transition-colors hover:bg-bone/5 hover:text-bone"
          >
            <ExternalLink size={18} />
            Vezi site-ul
          </a>
          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-3 rounded-lg px-4 py-3 font-sans text-sm text-bone/60 transition-colors hover:bg-red-500/10 hover:text-red-300"
          >
            <LogOut size={18} />
            Deconectare
          </button>
        </div>
      </aside>
    </>
  );
}
