"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import {
  imagesFromDrop,
  uploadImage,
  validateImage,
  NON_IMAGE_MESSAGE,
} from "./uploadImage";

/**
 * Zonă de drop pentru mai multe imagini deodată (galerie, etape).
 * Încarcă tot ce primește și raportează URL-urile reușite prin `onUploaded`,
 * păstrând ordinea în care au fost selectate fișierele.
 */
export default function ImageDropzone({
  onUploaded,
  hint,
}: {
  onUploaded: (urls: string[]) => void;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [done, setDone] = useState(0);
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);
  const dragDepth = useRef(0);

  const busy = total > 0;

  const handleFiles = async (files: File[]) => {
    if (!files.length || busy) return;

    // Respingem local ce e clar invalid, ca să nu pornim cereri inutile.
    const rejected: string[] = [];
    const accepted = files.filter((f) => {
      const bad = validateImage(f);
      if (bad) rejected.push(bad);
      return !bad;
    });

    setErrors(rejected);
    if (!accepted.length) return;

    setTotal(accepted.length);
    setDone(0);

    const results = await Promise.allSettled(
      accepted.map((f) =>
        uploadImage(f).finally(() => setDone((n) => n + 1))
      )
    );

    const urls: string[] = [];
    const failed: string[] = [...rejected];
    results.forEach((r, i) => {
      if (r.status === "fulfilled") urls.push(r.value);
      else
        failed.push(
          `„${accepted[i].name}": ${
            r.reason instanceof Error ? r.reason.message : "eroare"
          }`
        );
    });

    setTotal(0);
    setDone(0);
    setErrors(failed);
    if (urls.length) onUploaded(urls);
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        onDragEnter={(e) => {
          if (!e.dataTransfer.types.includes("Files")) return;
          dragDepth.current += 1;
          setDragging(true);
        }}
        onDragOver={(e) => {
          if (e.dataTransfer.types.includes("Files")) e.preventDefault();
        }}
        onDragLeave={() => {
          dragDepth.current = Math.max(0, dragDepth.current - 1);
          if (dragDepth.current === 0) setDragging(false);
        }}
        onDrop={(e) => {
          const { images, droppedNonImages } = imagesFromDrop(e.dataTransfer);
          if (!images.length && !droppedNonImages) return;
          e.preventDefault();
          dragDepth.current = 0;
          setDragging(false);
          if (droppedNonImages) {
            setErrors([NON_IMAGE_MESSAGE]);
            return;
          }
          handleFiles(images);
        }}
        className={`flex w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed px-4 py-6 font-sans text-xs transition-colors ${
          dragging
            ? "border-accent bg-accent/10 text-accent"
            : "border-bone/20 text-bone/55 hover:border-accent/50 hover:text-accent"
        } disabled:cursor-wait`}
      >
        {busy ? (
          <>
            <Loader2 size={18} className="animate-spin text-accent" />
            <span>
              Se încarcă {done}/{total}…
            </span>
          </>
        ) : (
          <>
            <ImagePlus size={18} />
            <span>
              {dragging
                ? "Eliberează pozele aici"
                : "Trage pozele aici sau apasă ca să le alegi"}
            </span>
            <span className="text-bone/35">
              {hint ?? "Mai multe imagini simultan · max 8 MB fiecare"}
            </span>
          </>
        )}
      </button>

      {errors.length > 0 && (
        <ul className="mt-2 space-y-1">
          {errors.map((e, i) => (
            <li key={i} className="font-sans text-xs text-red-400/90">
              {e}
            </li>
          ))}
        </ul>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(Array.from(e.target.files ?? []));
          e.target.value = "";
        }}
      />
    </div>
  );
}
