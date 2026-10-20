/**
 * Date SEED pentru proiectele RIVO (folosite la inițializarea store-ului).
 * După prima rulare, datele „vii" sunt în `data/store.json` și se editează din /admin.
 *
 * Imaginile sunt placeholdere Unsplash (arhitectură / imobiliare).
 */

export type ProjectStatus =
  | "in-constructie"
  | "in-vanzare"
  | "finalizat"
  | "in-curand";

export type ProjectType = "rezidential" | "mixt" | "comercial";

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectTypology {
  name: string;
  surface: string;
  rooms: string;
}

/**
 * O etapă de dezvoltare a proiectului, cu propriul set de imagini.
 * Permite împărțirea galeriei pe luni / faze de șantier.
 */
export interface ProjectStage {
  /** Denumirea etapei, ex: „Fundație", „Structură la roșu". */
  label: string;
  /** Luna etapei în format `YYYY-MM` (input type="month"). Poate fi gol. */
  date: string;
  images: string[];
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  status: ProjectStatus;
  type: ProjectType;
  year: string;
  // Procent stadiu lucrări (0–100). Pentru „finalizat" -> 100.
  progress: number;
  cover: string;
  gallery: string[];
  /** Opțional: galeria împărțită pe etape/luni de dezvoltare. */
  stages: ProjectStage[];
  description: string;
  specs: ProjectSpec[];
  typologies: ProjectTypology[];
  amenities: string[];
  // Coordonate aproximative pentru harta din pagina de detaliu.
  map: { lat: number; lng: number };
}

export const STATUS_LABELS: Record<ProjectStatus, string> = {
  "in-constructie": "În construcție",
  "in-vanzare": "În vânzare",
  finalizat: "Finalizat",
  "in-curand": "În curând",
};

export const TYPE_LABELS: Record<ProjectType, string> = {
  rezidential: "Rezidențial",
  mixt: "Mixt",
  comercial: "Comercial",
};

const MONTHS_RO = [
  "Ianuarie",
  "Februarie",
  "Martie",
  "Aprilie",
  "Mai",
  "Iunie",
  "Iulie",
  "August",
  "Septembrie",
  "Octombrie",
  "Noiembrie",
  "Decembrie",
];

/**
 * `2026-03` -> `Martie 2026`. Dacă formatul nu e valid, întoarce textul brut
 * (permite etichete libere gen „Faza 1").
 */
export function formatStageDate(date: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(date.trim());
  if (!m) return date.trim();
  const month = MONTHS_RO[Number(m[2]) - 1];
  return month ? `${month} ${m[1]}` : date.trim();
}

/** Eticheta afișată pentru o etapă (nume + lună, oricare există). */
export function stageLabel(stage: ProjectStage): string {
  const date = formatStageDate(stage.date);
  if (stage.label && date) return `${stage.label} · ${date}`;
  return stage.label || date || "Etapă";
}

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Randări găzduite în bucket-ul public de storage al proiectului. */
const M = (file: string) =>
  `https://lrkbkticgskmztvkmtuj.supabase.co/storage/v1/object/public/rivo-media/uploads/${file}`;

/**
 * Date seed. Sursa „vie" la runtime este store-ul (`@/lib/store`), iar valorile
 * de aici se aplică doar când tabelele sunt goale. Le ținem totuși în acord cu
 * producția: dacă store-ul e vreodată re-inițializat, site-ul trebuie să revină
 * la conținutul real, nu la placeholdere.
 *
 * TODO(RIVO): Cubic are încă imagine placeholder aici (în producție are poze
 * reale), iar specificațiile/tipologiile/facilitățile sunt goale intenționat —
 * se completează din /admin → Proiecte. Nu adăuga informații nedocumentate.
 */
export const SEED_PROJECTS: Project[] = [
  {
    slug: "cubic-residence",
    name: "Cubic Residence",
    tagline: "Ansamblu rezidențial RIVO în Satu Mare.",
    location: "Satu Mare",
    status: "in-curand",
    type: "rezidential",
    year: "",
    progress: 0,
    cover: U("photo-1545324418-cc1a3fa10c00"),
    gallery: [],
    stages: [],
    description:
      "Cubic Residence este un ansamblu rezidențial dezvoltat de RIVO Imobiliare în Satu Mare. Detaliile complete — tipologii, suprafețe, facilități și termene de predare — urmează să fie publicate.",
    specs: [],
    typologies: [],
    amenities: [],
    map: { lat: 47.7929, lng: 22.8857 },
  },
  {
    slug: "noroieni-residence",
    name: "Noroieni Residence",
    tagline: "Ansamblu rezidențial RIVO în zona Noroieni.",
    location: "Noroieni, Satu Mare",
    status: "in-constructie",
    type: "rezidential",
    year: "",
    progress: 80,
    cover: M("noroieni-residence-01-fatada-principala.jpg"),
    // Cover-ul nu se repetă în galerie: apare deja în hero-ul paginii, iar
    // duplicarea l-ar arăta de două ori în lightbox.
    gallery: [
      M("noroieni-residence-02-colt-intrare.jpg"),
      M("noroieni-residence-03-vedere-strada.jpg"),
      M("noroieni-residence-04-intrare.jpg"),
      M("noroieni-residence-05-ansamblu-strada.jpg"),
      M("noroieni-residence-06-ansamblu.jpg"),
      M("noroieni-residence-07-lateral.jpg"),
      M("noroieni-residence-08-gradina.jpg"),
      M("noroieni-residence-09-terasa.jpg"),
      M("noroieni-residence-10-terasa-detaliu.jpg"),
      M("noroieni-residence-11-terasa-masa.jpg"),
      M("noroieni-residence-12-perspectiva.jpg"),
    ],
    stages: [],
    description:
      "Noroieni Residence este un ansamblu rezidențial dezvoltat de RIVO Imobiliare în zona Noroieni, Satu Mare. Detaliile complete — tipologii, suprafețe, facilități și termene de predare — urmează să fie publicate.",
    specs: [],
    typologies: [],
    amenities: [],
    map: { lat: 47.7929, lng: 22.8857 },
  },
];
