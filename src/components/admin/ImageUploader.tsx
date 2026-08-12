"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Upload, Loader2, X, ImageIcon } from "lucide-react";
import {
  imagesFromDrop,
  uploadImage,
  NON_IMAGE_MESSAGE,
} from "./uploadImage";

/**
 * Câmp de imagine: acceptă un fișier tras cu mouse-ul (drag & drop), încărcat
 * din dialog SAU un URL lipit. Returnează URL-ul final prin `onChange`.
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
  const [dragging, setDragging] = useState(false);
  // dragenter/dragleave se declanșează și pentru copii — numărăm intrările
  // ca să nu stingem evidențierea când mouse-ul trece peste input sau buton.
  const dragDepth = useRef(0);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      onChange(await uploadImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare.");
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    const { images, droppedNonImages } = imagesFromDrop(e.dataTransfer);
    if (!images.length && !droppedNonImages) return;
    e.preventDefault();
    dragDepth.current = 0;
    setDragging(false);

    if (droppedNonImages) {
      setError(NON_IMAGE_MESSAGE);
      return;
    }
    // Câmpul ține o singură imagine — luăm prima.
    handleFile(images[0]);
    if (images.length > 1) {
      setError("Câmpul acceptă o singură imagine — am păstrat prima.");
    }
  };

  return (
    <div
      onDragEnter={(e) => {
        if (!e.dataTransfer.types.includes("Files")) return;
        dragDepth.current += 1;
        setDragging(true);
      }}
      onDragOver={(e) => {
        // Fără preventDefault pe dragover, drop-ul nu se declanșează.
        if (e.dataTransfer.types.includes("Files")) e.preventDefault();
      }}
      onDragLeave={() => {
        dragDepth.current = Math.max(0, dragDepth.current - 1);
        if (dragDepth.current === 0) setDragging(false);
      }}
      onDrop={onDrop}
      className={`rounded-xl transition-colors ${
        dragging ? "bg-accent/10 ring-1 ring-accent/60" : ""
      }`}
    >
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
              {uploading ? (
                <Loader2 size={20} className="animate-spin text-accent" />
              ) : (
                <ImageIcon size={20} />
              )}
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              dragging
                ? "Eliberează imaginea aici"
                : "Trage o imagine, lipește un URL sau încarcă"
            }
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
