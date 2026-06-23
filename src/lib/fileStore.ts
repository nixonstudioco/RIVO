import "server-only";
import fs from "node:fs";
import path from "node:path";
import { SEED_PROJECTS, type Project } from "./projects";
import type { Store, SiteSettings, Submission } from "./types";
import { DEFAULT_SETTINGS } from "./defaults";

/**
 * Store bazat pe fișier JSON (`data/store.json`) — folosit local / fallback
 * când Supabase nu e configurat.
 */

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_PATH = path.join(DATA_DIR, "store.json");

function defaultStore(): Store {
  return {
    projects: structuredClone(SEED_PROJECTS),
    settings: structuredClone(DEFAULT_SETTINGS),
    submissions: [],
  };
}

function ensureFile(): void {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, JSON.stringify(defaultStore(), null, 2), "utf-8");
  }
}

function getStore(): Store {
  ensureFile();
  try {
    const raw = fs.readFileSync(STORE_PATH, "utf-8");
    const parsed = JSON.parse(raw) as Partial<Store>;
    return {
      projects: parsed.projects ?? structuredClone(SEED_PROJECTS),
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
      submissions: parsed.submissions ?? [],
    };
  } catch {
    return defaultStore();
  }
}

function saveStore(store: Store): void {
  ensureFile();
  fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

/* ---------- Proiecte ---------- */

export function getProjects(): Project[] {
  return getStore().projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getStore().projects.find((p) => p.slug === slug);
}

export function createProject(project: Project): Project {
  const store = getStore();
  if (store.projects.some((p) => p.slug === project.slug)) {
    throw new Error("Există deja un proiect cu acest slug.");
  }
  store.projects.push(project);
  saveStore(store);
  return project;
}

export function updateProject(slug: string, data: Project): Project {
  const store = getStore();
  const idx = store.projects.findIndex((p) => p.slug === slug);
  if (idx === -1) throw new Error("Proiect inexistent.");
  if (data.slug !== slug && store.projects.some((p) => p.slug === data.slug)) {
    throw new Error("Există deja un proiect cu noul slug.");
  }
  store.projects[idx] = data;
  saveStore(store);
  return data;
}

export function deleteProject(slug: string): void {
  const store = getStore();
  store.projects = store.projects.filter((p) => p.slug !== slug);
  saveStore(store);
}

/* ---------- Setări ---------- */

export function getSettings(): SiteSettings {
  return getStore().settings;
}

export function saveSettings(settings: SiteSettings): SiteSettings {
  const store = getStore();
  store.settings = settings;
  saveStore(store);
  return settings;
}

/* ---------- Mesaje / Vizionări ---------- */

export function getSubmissions(): Submission[] {
  return getStore()
    .submissions.slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addSubmission(
  data: Omit<Submission, "id" | "status" | "createdAt">
): Submission {
  const store = getStore();
  const submission: Submission = {
    ...data,
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: "nou",
    createdAt: new Date().toISOString(),
  };
  store.submissions.push(submission);
  saveStore(store);
  return submission;
}

export function updateSubmission(
  id: string,
  patch: Partial<Pick<Submission, "status">>
): Submission | undefined {
  const store = getStore();
  const sub = store.submissions.find((s) => s.id === id);
  if (!sub) return undefined;
  Object.assign(sub, patch);
  saveStore(store);
  return sub;
}

export function deleteSubmission(id: string): void {
  const store = getStore();
  store.submissions = store.submissions.filter((s) => s.id !== id);
  saveStore(store);
}
