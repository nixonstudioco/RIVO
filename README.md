# RIVO Imobiliare — Website de prezentare

Website premium, modern și puternic animat pentru **RIVO Imobiliare**, dezvoltator
rezidențial și mixt din **Satu Mare, România**.

## Rulare locală

```bash
npm install
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000).

Alte comenzi: `npm run build`, `npm run start`, `npm run lint`.

> Necesită Node.js 18.18+ (recomandat 20+).

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · GSAP +
ScrollTrigger · Lenis · React Three Fiber / Three.js · lucide-react · fonturi
Fraunces + Inter (next/font).

## Panou de administrare (`/admin`)

Site-ul are un **CMS propriu**. Intră pe [http://localhost:3000/admin](http://localhost:3000/admin)
și autentifică-te:

- **Utilizator:** `rivoimobiliare`
- **Parolă:** `R!v01m0b1l1ar3`

De aici controlezi tot conținutul:

- **Proiecte** — adaugă / editează / șterge proiecte. Fiecare câmp e editabil:
  nume, slug, status, tip, an, stadiu lucrări, descriere, **imagine principală**,
  **galerie**, specificații, tipologii, facilități, coordonate hartă.
- **Imagini** — încarci fișiere direct (se salvează în `public/uploads/`) sau
  lipești un URL.
- **Conținut & Setări** — texte hero, manifest, statisticile animate, date de
  contact, program, linkuri social. Se reflectă instant pe site.
- **Mesaje & Vizionări** — toate solicitările din formularul de contact, cu
  status (nou / citit / rezolvat) și ștergere.

### Cum funcționează persistența

Datele „vii" se salvează în **`data/store.json`** (generat automat la prima
rulare din datele seed). Imaginile încărcate stau în `public/uploads/`. Aceste
fișiere NU se versionează (vezi `.gitignore`).

> Pentru schimbarea credențialelor admin, editează `src/lib/auth.ts`.
> Pentru producție multi-user, înlocuiește store-ul JSON cu o bază de date reală.

## Personalizare cod

- **Culori:** `tailwind.config.ts` (`accent`, `ink`, `bone`) + `src/app/globals.css` (`:root`).
- **Fonturi:** `src/app/layout.tsx` (next/font).
- **Date seed proiecte:** `src/lib/projects.ts` (folosite doar la prima inițializare).
- **Secțiuni statice** (De ce RIVO, Proces, Testimoniale): `src/components/home/`.

## Pagini

**Public:** `/` · `/proiecte` (listing + filtrare) · `/proiecte/[slug]` (detaliu) ·
`/despre` · `/contact`.
**Admin:** `/admin` (panou) · `/admin/proiecte` · `/admin/mesaje` · `/admin/setari`.

© RIVO Imobiliare.
