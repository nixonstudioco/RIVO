/**
 * Helper client pentru încărcarea imaginilor prin /api/admin/upload.
 * Validările de aici oglindesc cele din ruta API, ca utilizatorul să afle
 * imediat că fișierul e greșit, fără să aștepte un dus-întors la server.
 */

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB — la fel ca în API
export const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];

/** Mesaj de eroare dacă fișierul nu e acceptat, altfel null. */
export function validateImage(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return `„${file.name}" nu e o imagine acceptată (jpg, png, webp, avif, gif).`;
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    const mb = (file.size / 1024 / 1024).toFixed(1);
    return `„${file.name}" e prea mare (${mb} MB, maximul e 8 MB).`;
  }
  return null;
}

/** Încarcă un fișier și întoarce URL-ul public. Aruncă la eroare. */
export async function uploadImage(file: File): Promise<string> {
  const invalid = validateImage(file);
  if (invalid) throw new Error(invalid);

  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Eroare la încărcare.");
  return data.url as string;
}

/**
 * Extrage imaginile dintr-un eveniment de drop. Verificăm `types` pentru a
 * ignora drag-ul de text/elemente din pagină.
 *
 * `droppedNonImages` spune că utilizatorul a lăsat fișiere, dar niciunul nu e
 * imagine — altfel drop-ul ar fi ignorat în silență, fără explicație.
 */
export function imagesFromDrop(dt: DataTransfer): {
  images: File[];
  droppedNonImages: boolean;
} {
  if (!dt.types.includes("Files")) {
    return { images: [], droppedNonImages: false };
  }
  const all = Array.from(dt.files);
  const images = all.filter((f) => f.type.startsWith("image/"));
  return {
    images,
    droppedNonImages: all.length > 0 && images.length === 0,
  };
}

export const NON_IMAGE_MESSAGE =
  "Se pot încărca doar imagini (jpg, png, webp, avif, gif).";
