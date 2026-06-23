import "server-only";
import type { Project } from "./projects";

/** Slug „prietenos" din text. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function str(v: unknown, fallback = ""): string {
  return typeof v === "string" ? v : fallback;
}

function num(v: unknown, fallback = 0): number {
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return Number.isFinite(n) ? n : fallback;
}

/** Coerce-uiește datele primite de la formular într-un Project valid. */
export function normalizeProject(input: any): Project {
  const name = str(input?.name).trim() || "Proiect nou";
  const slug = str(input?.slug).trim() || slugify(name);

  const allowedStatus = [
    "in-constructie",
    "in-vanzare",
    "finalizat",
    "in-curand",
  ];
  const allowedType = ["rezidential", "mixt", "comercial"];

  return {
    slug,
    name,
    tagline: str(input?.tagline),
    location: str(input?.location),
    status: allowedStatus.includes(input?.status)
      ? input.status
      : "in-curand",
    type: allowedType.includes(input?.type) ? input.type : "rezidential",
    year: str(input?.year),
    progress: Math.max(0, Math.min(100, num(input?.progress))),
    cover: str(input?.cover),
    gallery: Array.isArray(input?.gallery)
      ? input.gallery.filter((g: unknown) => typeof g === "string" && g)
      : [],
    description: str(input?.description),
    specs: Array.isArray(input?.specs)
      ? input.specs
          .filter((s: any) => s && (s.label || s.value))
          .map((s: any) => ({ label: str(s.label), value: str(s.value) }))
      : [],
    typologies: Array.isArray(input?.typologies)
      ? input.typologies
          .filter((t: any) => t && (t.name || t.surface))
          .map((t: any) => ({
            name: str(t.name),
            surface: str(t.surface),
            rooms: str(t.rooms),
          }))
      : [],
    amenities: Array.isArray(input?.amenities)
      ? input.amenities.filter((a: unknown) => typeof a === "string" && a)
      : [],
    map: {
      lat: num(input?.map?.lat, 47.7929),
      lng: num(input?.map?.lng, 22.8857),
    },
  };
}
