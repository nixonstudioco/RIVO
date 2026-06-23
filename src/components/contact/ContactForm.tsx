"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, AlertCircle } from "lucide-react";
import type { SubmissionType } from "@/lib/types";

type Status = "idle" | "loading" | "success" | "error";

interface ProjectOption {
  slug: string;
  name: string;
}

interface FormState {
  nume: string;
  email: string;
  telefon: string;
  proiect: string;
  tip: SubmissionType;
  mesaj: string;
}

interface Errors {
  [key: string]: string | undefined;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TIP_OPTIONS: { value: SubmissionType; label: string }[] = [
  { value: "mesaj", label: "Mesaj general" },
  { value: "vizionare", label: "Programare vizionare" },
  { value: "oferta", label: "Cerere ofertă" },
];

export default function ContactForm({
  projects,
}: {
  projects: ProjectOption[];
}) {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("proiect") ?? "";
  const tipParam = searchParams.get("tip");
  const initialTip: SubmissionType =
    tipParam === "vizionare" || tipParam === "oferta" ? tipParam : "mesaj";

  const [form, setForm] = useState<FormState>({
    nume: "",
    email: "",
    telefon: "",
    proiect: preselect,
    tip: initialTip,
    mesaj: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (form.nume.trim().length < 2) next.nume = "Te rugăm să-ți scrii numele.";
    if (!EMAIL_RE.test(form.email)) next.email = "Adresă de email invalidă.";
    if (form.telefon.replace(/\D/g, "").length < 9)
      next.telefon = "Număr de telefon invalid.";
    if (form.mesaj.trim().length < 10)
      next.mesaj = "Spune-ne câteva cuvinte (min. 10 caractere).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nume,
          email: form.email,
          phone: form.telefon,
          projectSlug: form.proiect,
          type: form.tip,
          message: form.mesaj,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("success");
      setForm({
        nume: "",
        email: "",
        telefon: "",
        proiect: "",
        tip: "mesaj",
        mesaj: "",
      });
    } catch {
      setStatus("error");
    }
  };

  const fieldClass = (key: string) =>
    `peer w-full border-b bg-transparent py-3 font-sans text-base text-bone placeholder-transparent transition-colors focus:outline-none ${
      errors[key] ? "border-red-400/60" : "border-bone/20 focus:border-accent"
    }`;

  const labelClass =
    "pointer-events-none absolute left-0 top-3 origin-left font-sans text-base text-bone/40 transition-all duration-300 peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:text-xs";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start gap-6 rounded-2xl border border-accent/30 bg-accent/5 p-10"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-ink">
          <Check size={26} />
        </span>
        <div>
          <h3 className="font-serif text-2xl text-bone">Mesaj trimis!</h3>
          <p className="mt-2 font-sans text-base text-bone/60">
            Îți mulțumim. Echipa RIVO te va contacta în cel mai scurt timp.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="font-sans text-sm text-accent link-underline"
        >
          Trimite alt mesaj
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <div className="grid gap-10 sm:grid-cols-2">
        {/* Nume */}
        <div className="relative">
          <input
            id="nume"
            type="text"
            placeholder="Nume"
            value={form.nume}
            onChange={(e) => update("nume", e.target.value)}
            className={fieldClass("nume")}
          />
          <label htmlFor="nume" className={labelClass}>
            Nume și prenume
          </label>
          {errors.nume && (
            <p className="mt-1.5 font-sans text-xs text-red-400/90">
              {errors.nume}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={fieldClass("email")}
          />
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          {errors.email && (
            <p className="mt-1.5 font-sans text-xs text-red-400/90">
              {errors.email}
            </p>
          )}
        </div>

        {/* Telefon */}
        <div className="relative">
          <input
            id="telefon"
            type="tel"
            placeholder="Telefon"
            value={form.telefon}
            onChange={(e) => update("telefon", e.target.value)}
            className={fieldClass("telefon")}
          />
          <label htmlFor="telefon" className={labelClass}>
            Telefon
          </label>
          {errors.telefon && (
            <p className="mt-1.5 font-sans text-xs text-red-400/90">
              {errors.telefon}
            </p>
          )}
        </div>

        {/* Proiect de interes */}
        <div className="relative">
          <select
            id="proiect"
            value={form.proiect}
            onChange={(e) => update("proiect", e.target.value)}
            className="w-full border-b border-bone/20 bg-transparent py-3 font-sans text-base text-bone transition-colors focus:border-accent focus:outline-none [&>option]:bg-ink"
          >
            <option value="">Proiect de interes (opțional)</option>
            {projects.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tip solicitare */}
        <div className="relative">
          <select
            id="tip"
            value={form.tip}
            onChange={(e) => update("tip", e.target.value)}
            className="w-full border-b border-bone/20 bg-transparent py-3 font-sans text-base text-bone transition-colors focus:border-accent focus:outline-none [&>option]:bg-ink"
          >
            {TIP_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mesaj */}
      <div className="relative">
        <textarea
          id="mesaj"
          rows={4}
          placeholder="Mesaj"
          value={form.mesaj}
          onChange={(e) => update("mesaj", e.target.value)}
          className={`${fieldClass("mesaj")} resize-none`}
        />
        <label htmlFor="mesaj" className={labelClass}>
          Mesajul tău
        </label>
        {errors.mesaj && (
          <p className="mt-1.5 font-sans text-xs text-red-400/90">
            {errors.mesaj}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          disabled={status === "loading"}
          data-cursor="Trimite"
          className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 font-sans text-sm font-medium text-ink transition-colors duration-500 hover:bg-accent-soft disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Se trimite...
            </>
          ) : (
            "Trimite mesajul"
          )}
        </button>

        <AnimatePresence>
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 font-sans text-sm text-red-400/90"
            >
              <AlertCircle size={16} />
              A apărut o eroare. Încearcă din nou.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <p className="font-sans text-xs text-bone/40">
        Prin trimiterea formularului ești de acord cu prelucrarea datelor
        conform politicii de confidențialitate.
      </p>
    </form>
  );
}
