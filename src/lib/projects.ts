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

const U = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Date seed. Sursa „vie" la runtime este store-ul (`@/lib/store`). */
export const SEED_PROJECTS: Project[] = [
  {
    slug: "rivo-park-residence",
    name: "RIVO Park Residence",
    tagline: "Locuire premium la marginea parcului central.",
    location: "Zona Parcului Central, Satu Mare",
    status: "in-vanzare",
    type: "rezidential",
    year: "2025",
    progress: 68,
    cover: U("photo-1545324418-cc1a3fa10c00"),
    gallery: [
      U("photo-1545324418-cc1a3fa10c00"),
      U("photo-1512917774080-9991f1c4c750"),
      U("photo-1486406146926-c627a92ad1ab"),
      U("photo-1493809842364-78817add7ffb"),
    ],
    description:
      "RIVO Park Residence redefinește standardul locuirii urbane în Satu Mare. Un ansamblu de apartamente cu finisaje premium, generos vitrate, orientate spre verdeața parcului central. Spațiile comune sunt gândite ca o extensie a locuinței: lobby cu recepție, grădini interioare și parcare subterană.",
    specs: [
      { label: "Apartamente", value: "84 unități" },
      { label: "Regim înălțime", value: "S+P+6E" },
      { label: "Tipologii", value: "2–4 camere" },
      { label: "Suprafețe", value: "54–138 m²" },
      { label: "Parcare", value: "Subterană + exterioară" },
      { label: "Predare", value: "Q4 2025" },
    ],
    typologies: [
      { name: "2 camere", surface: "54–66 m²", rooms: "2" },
      { name: "3 camere", surface: "78–96 m²", rooms: "3" },
      { name: "4 camere", surface: "112–138 m²", rooms: "4" },
    ],
    amenities: [
      "Parcare subterană",
      "Lobby cu recepție",
      "Grădini interioare",
      "Sistem smart-home",
      "Încălzire în pardoseală",
      "Acces securizat",
    ],
    map: { lat: 47.7929, lng: 22.8857 },
  },
  {
    slug: "rivo-corso-mixed",
    name: "RIVO Corso",
    tagline: "Ansamblu mixt — birouri, retail și locuințe.",
    location: "Bulevardul Transilvania, Satu Mare",
    status: "in-constructie",
    type: "mixt",
    year: "2026",
    progress: 41,
    cover: U("photo-1486325212027-8081e485255e"),
    gallery: [
      U("photo-1486325212027-8081e485255e"),
      U("photo-1497366216548-37526070297c"),
      U("photo-1431576901776-e539bd916ba2"),
      U("photo-1454165804606-c3d57bc86b40"),
    ],
    description:
      "RIVO Corso este un proiect mixt care aduce împreună spații de birouri clasa A, retail la parter și apartamente cu vedere panoramică. Un punct de reper pentru noul centru de afaceri al orașului, conceput pentru oameni care vor totul la un pas distanță.",
    specs: [
      { label: "Suprafață totală", value: "21.400 m²" },
      { label: "Birouri", value: "Clasa A" },
      { label: "Retail", value: "12 spații" },
      { label: "Apartamente", value: "58 unități" },
      { label: "Certificare", value: "BREEAM Very Good" },
      { label: "Predare", value: "Q2 2026" },
    ],
    typologies: [
      { name: "Studio", surface: "38–46 m²", rooms: "1" },
      { name: "2 camere", surface: "58–72 m²", rooms: "2" },
      { name: "3 camere", surface: "84–104 m²", rooms: "3" },
    ],
    amenities: [
      "Birouri clasa A",
      "Retail la parter",
      "Certificare BREEAM",
      "Terase verzi",
      "Stații de încărcare EV",
      "Securitate 24/7",
    ],
    map: { lat: 47.7905, lng: 22.8772 },
  },
  {
    slug: "rivo-villas-noua",
    name: "RIVO Villas Noua",
    tagline: "Case individuale într-o comunitate restrânsă.",
    location: "Cartier Noua, Satu Mare",
    status: "in-vanzare",
    type: "rezidential",
    year: "2025",
    progress: 55,
    cover: U("photo-1564013799919-ab600027ffc6"),
    gallery: [
      U("photo-1564013799919-ab600027ffc6"),
      U("photo-1568605114967-8130f3a36994"),
      U("photo-1576941089067-2de3c901e126"),
      U("photo-1600585154340-be6161a56a0c"),
    ],
    description:
      "O comunitate restrânsă de 18 case individuale, cu grădini private și arhitectură contemporană. RIVO Villas Noua îmbină intimitatea unei case proprii cu avantajele unei comunități securizate, la doar câteva minute de centrul orașului.",
    specs: [
      { label: "Case", value: "18 unități" },
      { label: "Tipologii", value: "4–5 camere" },
      { label: "Suprafață utilă", value: "146–198 m²" },
      { label: "Teren", value: "320–540 m²" },
      { label: "Garaj", value: "1–2 locuri" },
      { label: "Predare", value: "Q3 2025" },
    ],
    typologies: [
      { name: "Vilă tip A", surface: "146 m²", rooms: "4" },
      { name: "Vilă tip B", surface: "172 m²", rooms: "4" },
      { name: "Vilă tip C", surface: "198 m²", rooms: "5" },
    ],
    amenities: [
      "Grădină privată",
      "Garaj propriu",
      "Comunitate securizată",
      "Pompă de căldură",
      "Panouri fotovoltaice",
      "Finisaje la alegere",
    ],
    map: { lat: 47.8071, lng: 22.8694 },
  },
  {
    slug: "rivo-skyline-tower",
    name: "RIVO Skyline",
    tagline: "Cel mai înalt punct rezidențial al orașului.",
    location: "Zona Centrală, Satu Mare",
    status: "in-curand",
    type: "rezidential",
    year: "2027",
    progress: 8,
    cover: U("photo-1470071459604-3b5ec3a7fe05"),
    gallery: [
      U("photo-1470071459604-3b5ec3a7fe05"),
      U("photo-1449157291145-7efd050a4d0e"),
      U("photo-1480714378408-67cf0d13bc1b"),
      U("photo-1502672260266-1c1ef2d93688"),
    ],
    description:
      "RIVO Skyline va deveni cel mai înalt punct rezidențial al Satu Mare-ului. Un turn cu apartamente premium și penthouse-uri cu vedere de 360°, sky-lobby la ultimul etaj și servicii de tip hotelier. Lansare în curând — înscrie-te pe lista de priorități.",
    specs: [
      { label: "Regim înălțime", value: "S+P+14E" },
      { label: "Apartamente", value: "120 unități" },
      { label: "Penthouse", value: "6 unități" },
      { label: "Sky-lobby", value: "Etaj 14" },
      { label: "Servicii", value: "Concierge" },
      { label: "Lansare", value: "2027" },
    ],
    typologies: [
      { name: "2 camere", surface: "62–74 m²", rooms: "2" },
      { name: "3 camere", surface: "92–118 m²", rooms: "3" },
      { name: "Penthouse", surface: "180–240 m²", rooms: "4+" },
    ],
    amenities: [
      "Sky-lobby panoramic",
      "Concierge 24/7",
      "Fitness & spa",
      "Penthouse-uri exclusiviste",
      "Parcare subterană",
      "Vedere 360°",
    ],
    map: { lat: 47.792, lng: 22.8851 },
  },
  {
    slug: "rivo-green-court",
    name: "RIVO Green Court",
    tagline: "Locuire sustenabilă, în jurul unei curți verzi.",
    location: "Zona Micro 17, Satu Mare",
    status: "finalizat",
    type: "rezidential",
    year: "2023",
    progress: 100,
    cover: U("photo-1460317442991-0ec209397118"),
    gallery: [
      U("photo-1460317442991-0ec209397118"),
      U("photo-1522708323590-d24dbb6b0267"),
      U("photo-1502005229762-cf1b2da7c5d6"),
      U("photo-1416331108676-a22ccb276e35"),
    ],
    description:
      "Primul proiect RIVO finalizat și locuit integral. RIVO Green Court este construit în jurul unei curți interioare verzi, cu apartamente eficiente energetic și o comunitate vie. Un exemplu de ce înseamnă predarea la timp și calitatea promisă.",
    specs: [
      { label: "Apartamente", value: "96 unități" },
      { label: "Regim înălțime", value: "S+P+4E" },
      { label: "Tipologii", value: "1–4 camere" },
      { label: "Eficiență", value: "Clasa A" },
      { label: "Curte verde", value: "1.200 m²" },
      { label: "Status", value: "Finalizat 2023" },
    ],
    typologies: [
      { name: "1 cameră", surface: "38–44 m²", rooms: "1" },
      { name: "2 camere", surface: "56–68 m²", rooms: "2" },
      { name: "3 camere", surface: "80–98 m²", rooms: "3" },
    ],
    amenities: [
      "Curte interioară verde",
      "Eficiență energetică clasa A",
      "Loc de joacă",
      "Parcare exterioară",
      "Spații comerciale la parter",
      "Comunitate locuită",
    ],
    map: { lat: 47.7831, lng: 22.8576 },
  },
  {
    slug: "rivo-riverside",
    name: "RIVO Riverside",
    tagline: "Apartamente cu fața la râul Someș.",
    location: "Faleza Someș, Satu Mare",
    status: "in-curand",
    type: "mixt",
    year: "2027",
    progress: 3,
    cover: U("photo-1502005097973-6a7082348e28"),
    gallery: [
      U("photo-1502005097973-6a7082348e28"),
      U("photo-1487958449943-2429e8be8625"),
      U("photo-1429497419816-9ca5cfb4571a"),
      U("photo-1518005020951-eccb494ad742"),
    ],
    description:
      "RIVO Riverside aduce locuirea premium pe malul Someșului. Un ansamblu cu promenadă publică, cafenele la parter și apartamente cu balcoane generoase orientate spre apă. Proiect în pregătire — detalii complete în curând.",
    specs: [
      { label: "Apartamente", value: "72 unități" },
      { label: "Promenadă", value: "Acces public" },
      { label: "Retail", value: "Cafenele & bistro" },
      { label: "Tipologii", value: "2–4 camere" },
      { label: "Vedere", value: "Spre râu" },
      { label: "Lansare", value: "2027" },
    ],
    typologies: [
      { name: "2 camere", surface: "60–70 m²", rooms: "2" },
      { name: "3 camere", surface: "88–110 m²", rooms: "3" },
      { name: "4 camere", surface: "120–150 m²", rooms: "4" },
    ],
    amenities: [
      "Promenadă pe mal",
      "Balcoane spre râu",
      "Cafenele la parter",
      "Piste de biciclete",
      "Parcare subterană",
      "Spații verzi",
    ],
    map: { lat: 47.7968, lng: 22.8729 },
  },
];

/** Compatibilitate: unele componente client folosesc lista seed ca fallback. */
export const PROJECTS = SEED_PROJECTS;
