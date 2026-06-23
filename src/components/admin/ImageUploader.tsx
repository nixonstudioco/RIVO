"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, X, ImageIcon } from "lucide-react";

/**
 * Câmp de imagine: permite încărcarea unui fișier (salvat în /public/uploads)
 * SAU lipirea unui URL. Returnează URL-ul final prin `onChange`.
 */
export default function ImageUploader({
  value,
  onChange,
  label,
  compact = false,
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  compact?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Eroare la încărcare.");
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {label && (
        <label className="mb-2 block font-sans text-xs uppercase tracking-[0.14em] text-bone/40">
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        {/* Preview */}
        <div
          className={`relative shrink-0 overflow-hidden rounded-lg border border-bone/15 bg-ink-muted ${
            compact ? "h-12 w-16" : "h-20 w-28"
          }`}
        >
          {value ? (
            <Image
              src={value}
              alt="Previzualizare"
              fill
              sizes="112px"
              className="object-cover"
              unoptimized={value.startsWith("/uploads")}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-bone/30">
              <ImageIcon size={20} />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL imagine sau încarcă un fișier"
            className="w-full rounded-lg border border-bone/15 bg-ink px-3 py-2 font-sans text-sm text-bone placeholder:text-bone/30 focus:border-accent focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg border border-bone/15 px-3 py-1.5 font-sans text-xs text-bone/70 transition-colors hover:border-accent/50 hover:text-accent disabled:opacity-60"
            >
              {uploading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Upload size={14} />
              )}
              {uploading ? "Se încarcă..." : "Încarcă"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-1 rounded-lg border border-bone/15 px-3 py-1.5 font-sans text-xs text-bone/60 transition-colors hover:border-red-400/50 hover:text-red-300"
              >
                <X size={14} />
                Elimină
              </button>
            )}
          </div>
          {error && (
            <p className="font-sans text-xs text-red-400/90">{error}</p>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
