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
  // RIVO e un dezvoltator nou — nu afișăm statistici de istoric („ani de
  // experiență", „proiecte livrate"). Secțiunea se ascunde când lista e goală
  // și poate fi repopulată din /admin → Setări când există cifre reale.
  stats: [],
  contact: {
    address: "Sălciilor 16, Satu Mare",
    phone: "0744 578 985 / 0749 333 334",
    email: "office@rivoimobiliare.com",
    program: "Luni–Vineri: 09:00–18:00\nSâmbătă: 10:00–14:00",
  },
  social: {
    instagram: "https://www.instagram.com/rivoimobiliare",
    // URL-ul canonic al paginii, nu linkul de tip /share/ primit inițial:
    // acela e un redirect, iar `sameAs` din datele structurate funcționează mai
    // sigur cu adresa finală a profilului.
    facebook: "https://www.facebook.com/people/RIVO-Imobiliare/61591880582271/",
    tiktok: "https://www.tiktok.com/@rivo.imobiliare",
    // Fără cont LinkedIn deocamdată — gol înseamnă că nu se afișează deloc,
    // în loc de un link mort.
    linkedin: "",
  },
};
