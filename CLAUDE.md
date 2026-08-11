# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

Marketing website + self-hosted CMS for **RIVO Imobiliare**, a residential/mixed-use
property developer in Satu Mare, Romania. All UI copy, comments and content are in
**Romanian**.

Public pages: `/` (animated landing), `/proiecte` (project listing with filtering),
`/proiecte/[slug]` (project detail: gallery, specs, typologies, amenities, map
coords, build progress), `/despre`, `/contact`.

Admin area at `/admin` (cookie-protected) manages projects, site settings/content
(hero text, animated stats, contact info, social links), image uploads, and contact
form submissions (status: nou / citit / rezolvat).

## Tech stack

- **Next.js 14** App Router, **React 18**, **TypeScript** (strict)
- **Tailwind CSS 3** + PostCSS; custom palette `ink` / `bone` / `accent` in
  `tailwind.config.ts`; fonts Fraunces + Inter via `next/font` in `src/app/layout.tsx`
- Animation: **Framer Motion**, **GSAP**, **Lenis** smooth scroll,
  **React Three Fiber / three.js** (hero 3D scene)
- Data: **Supabase** (Postgres + Storage) in production, JSON file store locally
- Hosting: **Netlify** (`@netlify/plugin-nextjs`), deployed from GitHub Actions

## Commands

```bash
npm install
npm run dev      # next dev — http://localhost:3000
npm run build    # next build
npm run start    # next start (production server)
npm run lint     # next lint (eslint-config-next/core-web-vitals)
```

No test suite is configured. Node 18.18+ required (CI and Netlify use Node 20).

Helper scripts (all read secrets from env, never print them):
`node scripts/setup-supabase.mjs <project-ref>`, `create-supabase-project.mjs`,
`netlify-env.mjs`, `set-gh-secrets.mjs`, `process-logo.mjs`, `update-hero.mjs`.

## Architecture

- `src/app/(site)/` — public route group; `layout.tsx` loads settings server-side and
  wraps pages in SmoothScroll / CustomCursor / Navbar / PageTransition / Footer.
- `src/app/admin/` — `login/page.tsx` plus the `(panel)` route group (dashboard,
  `proiecte`, `mesaje`, `setari`).
- `src/app/api/` — route handlers: `contact/` (public form) and `admin/*`
  (login, logout, projects, settings, submissions, upload).
- `src/components/` — `home/`, `projects/`, `admin/`, `layout/`, `ui/`, `three/`.
- `src/lib/` — `store.ts` is the **only** store entry point components should import;
  it dispatches to `supabaseStore.ts` when Supabase env vars exist, else
  `fileStore.ts`. Also `supabase.ts` (server-only admin client), `auth.ts`,
  `projects.ts` (seed data + status enums), `defaults.ts`, `types.ts`,
  `normalize.ts` (slugify + input coercion), `utils.ts` (`cn`, status badge classes).
- `supabase/schema.sql` — tables `rivo_projects`, `rivo_submissions`, `rivo_settings`.
- Path alias `@/*` → `./src/*`.

Patterns:
- **Data fetching** is server-side via async Server Components calling `@/lib/store`.
  Mutations go through `/api/admin/*` from client components, then `router.refresh()`.
- **No global state library** — settings/projects are passed down as props.
- **Auth**: `src/middleware.ts` guards `/admin/:path*` and `/api/admin/:path*` with a
  fixed httpOnly session cookie; admin pages redirect to `/admin/login`, admin APIs
  return 401.

## Environment variables

From `.env.example` (names only — never commit values):

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_BUCKET` (defaults to `rivo-media`)

All three are optional; without the first two the app falls back to the local file
store. Script/CI-only: `SUPABASE_ACCESS_TOKEN`, `SUPABASE_PROJECT_REF`,
`NETLIFY_TOKEN` / `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`, `GITHUB_TOKEN`.

## Deployment

`.github/workflows/deploy.yml` runs on push to `main` (or manual dispatch): Node 20,
`npm install`, then `npx netlify-cli@26 deploy --build --prod` using the
`NETLIFY_AUTH_TOKEN` / `NETLIFY_SITE_ID` repo secrets. `netlify.toml` sets the build
command and the official Next.js runtime plugin for SSR and API routes.

## Notes / gotchas

- Nearly every page and route handler exports `export const dynamic = "force-dynamic"`
  so admin edits show up instantly. Keep this when adding pages that read the store.
- The Supabase client is created with `cache: "no-store"` fetch to bypass Next's fetch
  cache — do not remove it.
- Supabase tables have RLS enabled with **no public policies**; all access is
  server-side with the service role key. Never import `@/lib/supabase` or `@/lib/store`
  from a client component (they are `server-only`).
- Local persistence lives in `data/store.json` (auto-seeded from `src/lib/projects.ts`
  on first run) and `public/uploads/`; both are gitignored, so local and deployed
  content diverge.
- Uploads: max 8 MB, images only; they go to the Supabase bucket when configured,
  otherwise `public/uploads/`.
- Admin credentials and the session token are **hardcoded in `src/lib/auth.ts`** (a
  client request per the file's comment). Treat that file as sensitive; moving these to
  env vars is the obvious hardening step. Changing `SESSION_TOKEN` invalidates sessions.
- `next.config.mjs` allowlists remote images from `images.unsplash.com`,
  `images.pexels.com` and `*.supabase.co`, and transpiles `three`.
- Seed data in `src/lib/projects.ts` is used only on first initialization — editing it
  will not change an already-populated store.
