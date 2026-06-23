import "server-only";
import { isSupabaseConfigured } from "./supabase";
import * as file from "./fileStore";
import * as sb from "./supabaseStore";
import type { Project } from "./projects";
import type { SiteSettings, Submission } from "./types";

/**
 * Dispatcher pentru store: folosește Supabase dacă e configurat (producție),
 * altfel store-ul bazat pe fișier (local / fallback). Toate funcțiile sunt async.
 */

const viaSupabase = () => isSupabaseConfigured();

/* ---------- Proiecte ---------- */

export async function getProjects(): Promise<Project[]> {
  return viaSupabase() ? sb.getProjects() : file.getProjects();
}

export async function getProjectBySlug(
  slug: string
): Promise<Project | undefined> {
  return viaSupabase() ? sb.getProjectBySlug(slug) : file.getProjectBySlug(slug);
}

export async function getAllSlugs(): Promise<string[]> {
  return (await getProjects()).map((p) => p.slug);
}

export async function createProject(project: Project): Promise<Project> {
  return viaSupabase() ? sb.createProject(project) : file.createProject(project);
}

export async function updateProject(
  slug: string,
  data: Project
): Promise<Project> {
  return viaSupabase() ? sb.updateProject(slug, data) : file.updateProject(slug, data);
}

export async function deleteProject(slug: string): Promise<void> {
  return viaSupabase() ? sb.deleteProject(slug) : file.deleteProject(slug);
}

/* ---------- Setări ---------- */

export async function getSettings(): Promise<SiteSettings> {
  return viaSupabase() ? sb.getSettings() : file.getSettings();
}

export async function saveSettings(
  settings: SiteSettings
): Promise<SiteSettings> {
  return viaSupabase() ? sb.saveSettings(settings) : file.saveSettings(settings);
}

/* ---------- Mesaje / Vizionări ---------- */

export async function getSubmissions(): Promise<Submission[]> {
  return viaSupabase() ? sb.getSubmissions() : file.getSubmissions();
}

export async function addSubmission(
  data: Omit<Submission, "id" | "status" | "createdAt">
): Promise<Submission> {
  return viaSupabase() ? sb.addSubmission(data) : file.addSubmission(data);
}

export async function updateSubmission(
  id: string,
  patch: Partial<Pick<Submission, "status">>
): Promise<Submission | undefined> {
  return viaSupabase()
    ? sb.updateSubmission(id, patch)
    : file.updateSubmission(id, patch);
}

export async function deleteSubmission(id: string): Promise<void> {
  return viaSupabase() ? sb.deleteSubmission(id) : file.deleteSubmission(id);
}
