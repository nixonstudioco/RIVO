import "server-only";
import { getSupabaseAdmin } from "./supabase";
import { SEED_PROJECTS, type Project } from "./projects";
import type { SiteSettings, Submission } from "./types";
import { DEFAULT_SETTINGS } from "./defaults";

/**
 * Implementare store pe Supabase (Postgres). Tabele prefixate `rivo_` pentru a
 * coexista în siguranță cu alte proiecte din același Supabase.
 */

const T_PROJECTS = "rivo_projects";
const T_SUBMISSIONS = "rivo_submissions";
const T_SETTINGS = "rivo_settings";

/* ---------- mapping rând <-> Project ---------- */

type Row = Record<string, any>;

function rowToProject(r: Row): Project {
  return {
    slug: r.slug,
    name: r.name ?? "",
    tagline: r.tagline ?? "",
    location: r.location ?? "",
    status: r.status,
    type: r.type,
    year: r.year ?? "",
    progress: r.progress ?? 0,
    cover: r.cover ?? "",
    description: r.description ?? "",
    gallery: r.gallery ?? [],
    specs: r.specs ?? [],
    typologies: r.typologies ?? [],
    amenities: r.amenities ?? [],
    map: r.map ?? { lat: 47.7929, lng: 22.8857 },
  };
}

function projectToRow(p: Project, position?: number): Row {
  const row: Row = {
    slug: p.slug,
    name: p.name,
    tagline: p.tagline,
    location: p.location,
    status: p.status,
    type: p.type,
    year: p.year,
    progress: p.progress,
    cover: p.cover,
    description: p.description,
    gallery: p.gallery,
    specs: p.specs,
    typologies: p.typologies,
    amenities: p.amenities,
    map: p.map,
  };
  if (position !== undefined) row.position = position;
  return row;
}

/* ---------- Proiecte ---------- */

export async function getProjects(): Promise<Project[]> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from(T_PROJECTS)
    .select("*")
    .order("position", { ascending: true });
  if (error) throw new Error(error.message);

  if (!data || data.length === 0) {
    // Seed inițial idempotent (rezistent la cereri concurente).
    const seedRows = SEED_PROJECTS.map((p, i) => projectToRow(p, i));
    await sb
      .from(T_PROJECTS)
      .upsert(seedRows, { onConflict: "slug", ignoreDuplicates: true });
    const { data: after } = await sb
      .from(T_PROJECTS)
      .select("*")
      .order("position", { ascending: true });
    return (after ?? []).map(rowToProject);
  }
  return data.map(rowToProject);
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from(T_PROJECTS)
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToProject(data) : undefined;
}

export async function createProject(project: Project): Promise<Project> {
  const sb = getSupabaseAdmin();
  const { data: maxRow } = await sb
    .from(T_PROJECTS)
    .select("position")
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();
  const position = (maxRow?.position ?? -1) + 1;

  const { error } = await sb
    .from(T_PROJECTS)
    .insert(projectToRow(project, position));
  if (error) {
    if (error.code === "23505")
      throw new Error("Există deja un proiect cu acest slug.");
    throw new Error(error.message);
  }
  return project;
}

export async function updateProject(
  slug: string,
  data: Project
): Promise<Project> {
  const sb = getSupabaseAdmin();
  const { error } = await sb
    .from(T_PROJECTS)
    .update(projectToRow(data))
    .eq("slug", slug);
  if (error) {
    if (error.code === "23505")
      throw new Error("Există deja un proiect cu noul slug.");
    throw new Error(error.message);
  }
  return data;
}

export async function deleteProject(slug: string): Promise<void> {
  const sb = getSupabaseAdmin();
  const { error } = await sb.from(T_PROJECTS).delete().eq("slug", slug);
  if (error) throw new Error(error.message);
}

/* ---------- Setări ---------- */

export async function getSettings(): Promise<SiteSettings> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from(T_SETTINGS)
    .select("data")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw new Error(error.message);

  if (!data) {
    // Seed idempotent (rezistent la cereri concurente).
    await sb
      .from(T_SETTINGS)
      .upsert({ id: 1, data: DEFAULT_SETTINGS }, { ignoreDuplicates: true });
    const { data: after } = await sb
      .from(T_SETTINGS)
      .select("data")
      .eq("id", 1)
      .maybeSingle();
    return { ...DEFAULT_SETTINGS, ...((after?.data as SiteSettings) ?? {}) };
  }
  return { ...DEFAULT_SETTINGS, ...(data.data as SiteSettings) };
}

export async function saveSettings(
  settings: SiteSettings
): Promise<SiteSettings> {
  const sb = getSupabaseAdmin();
  const { error } = await sb
    .from(T_SETTINGS)
    .upsert({ id: 1, data: settings });
  if (error) throw new Error(error.message);
  return settings;
}

/* ---------- Mesaje / Vizionări ---------- */

function rowToSubmission(r: Row): Submission {
  return {
    id: r.id,
    type: r.type,
    status: r.status,
    name: r.name ?? "",
    email: r.email ?? "",
    phone: r.phone ?? "",
    projectSlug: r.project_slug ?? "",
    message: r.message ?? "",
    createdAt: r.created_at,
  };
}

export async function getSubmissions(): Promise<Submission[]> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from(T_SUBMISSIONS)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []).map(rowToSubmission);
}

export async function addSubmission(
  d: Omit<Submission, "id" | "status" | "createdAt">
): Promise<Submission> {
  const sb = getSupabaseAdmin();
  const submission: Submission = {
    ...d,
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: "nou",
    createdAt: new Date().toISOString(),
  };
  const { error } = await sb.from(T_SUBMISSIONS).insert({
    id: submission.id,
    type: submission.type,
    status: submission.status,
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    project_slug: submission.projectSlug,
    message: submission.message,
    created_at: submission.createdAt,
  });
  if (error) throw new Error(error.message);
  return submission;
}

export async function updateSubmission(
  id: string,
  patch: Partial<Pick<Submission, "status">>
): Promise<Submission | undefined> {
  const sb = getSupabaseAdmin();
  const { data, error } = await sb
    .from(T_SUBMISSIONS)
    .update({ status: patch.status })
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? rowToSubmission(data) : undefined;
}

export async function deleteSubmission(id: string): Promise<void> {
  const sb = getSupabaseAdmin();
  const { error } = await sb.from(T_SUBMISSIONS).delete().eq("id", id);
  if (error) throw new Error(error.message);
}
