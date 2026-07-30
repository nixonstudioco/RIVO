import type { SiteSettings } from "./types";

/** Setări implicite ale site-ului (folosite la prima inițializare a store-ului). */
export const DEFAULT_SETTINGS: SiteSettings = {
  brand: {
    name: "RIVO",
    tagline: "Construim viitorul orașului Satu Mare",
  },
  hero: {
    eyebrow: "Dezvoltator imobiliar · Satu Mare",
    titleTop: "Construit în jurul",
    titleAccent: "viitorului tău",
    subtitle:
      "Proiecte rezidențiale și mixte premium, gândite pentru oameni care vor mai mult de la locul în care trăiesc. Calitate, transparență și predare la timp.",
  },
  manifest:
    "Pentru noi, imobiliarele nu înseamnă doar beton și planuri. Înseamnă comunități, lumină, liniște și locuri în care viața se așază frumos. Construim cu răbdare, cu materiale care durează și cu respect pentru orașul nostru.",
  stats: [
    { value: 12, suffix: "+", label: "Ani de experiență" },
    { value: 9, suffix: "", label: "Proiecte livrate" },
    { value: 1450, suffix: "+", label: "Apartamente & case" },
    { value: 186, suffix: "K", label: "m² construiți" },
  ],
  contact: {
    address: "Str. Exemplu nr. 10, 440000 Satu Mare, România",
    phone: "+40 700 000 000",
    email: "contact@rivo-imobiliare.ro",
    program: "Luni–Vineri: 09:00–18:00\nSâmbătă: 10:00–14:00",
  },
  social: {
    instagram: "#",
    facebook: "#",
    linkedin: "#",
  },
};
