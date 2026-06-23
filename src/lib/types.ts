/**
 * Tipuri partajate (safe pentru import în client — fără dependențe de fs).
 */
import type { Project } from "./projects";

export type { Project };

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface SiteSettings {
  brand: {
    name: string;
    tagline: string;
  };
  hero: {
    eyebrow: string;
    titleTop: string;
    titleAccent: string;
    subtitle: string;
  };
  manifest: string;
  stats: StatItem[];
  contact: {
    address: string;
    phone: string;
    email: string;
    program: string;
  };
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
}

export type SubmissionType = "mesaj" | "vizionare" | "oferta";
export type SubmissionStatus = "nou" | "citit" | "rezolvat";

export const SUBMISSION_TYPE_LABELS: Record<SubmissionType, string> = {
  mesaj: "Mesaj",
  vizionare: "Vizionare",
  oferta: "Cerere ofertă",
};

export const SUBMISSION_STATUS_LABELS: Record<SubmissionStatus, string> = {
  nou: "Nou",
  citit: "Citit",
  rezolvat: "Rezolvat",
};

export interface Submission {
  id: string;
  type: SubmissionType;
  status: SubmissionStatus;
  name: string;
  email: string;
  phone: string;
  projectSlug: string;
  message: string;
  createdAt: string; // ISO
}

export interface Store {
  projects: Project[];
  settings: SiteSettings;
  submissions: Submission[];
}
