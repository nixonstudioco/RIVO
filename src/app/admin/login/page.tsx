"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Loader2, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Autentificare eșuată.");
        setLoading(false);
        return;
      }
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Eroare de rețea. Încearcă din nou.");
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm"
    >
      <div className="mb-10 flex flex-col items-center text-center">
        <Image
          src="/logo-rivo.png"
          alt="RIVO Imobiliare"
          width={873}
          height={360}
          priority
          className="h-16 w-auto"
        />
        <p className="mt-5 font-sans text-xs uppercase tracking-[0.25em] text-bone/50">
          Panou de administrare
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-bone/10 bg-ink-soft p-8"
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="font-sans text-xs uppercase tracking-[0.18em] text-bone/40"
            >
              Utilizator
            </label>
            <div className="mt-2 flex items-center gap-3 border-b border-bone/20 pb-2 focus-within:border-accent">
              <User size={16} className="text-bone/40" />
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent font-sans text-base text-bone focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="font-sans text-xs uppercase tracking-[0.18em] text-bone/40"
            >
              Parolă
            </label>
            <div className="mt-2 flex items-center gap-3 border-b border-bone/20 pb-2 focus-within:border-accent">
              <Lock size={16} className="text-bone/40" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent font-sans text-base text-bone focus:outline-none"
                required
              />
            </div>
          </div>

          {error && (
            <p className="flex items-center gap-2 font-sans text-sm text-red-400/90">
              <AlertCircle size={16} />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 font-sans text-sm font-medium text-ink transition-colors hover:bg-accent-soft disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Se conectează...
              </>
            ) : (
              "Autentificare"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
