import { STATUS_LABELS, type ProjectStatus } from "./projects";

/** Concatenare condiționată de clase (mini „clsx"). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Returnează clasele de culoare pentru badge-ul de status. */
export function statusBadgeClasses(status: ProjectStatus): string {
  switch (status) {
    case "in-vanzare":
      return "bg-accent/15 text-accent-soft border-accent/30";
    case "in-constructie":
      return "bg-amber-400/10 text-amber-200/90 border-amber-300/25";
    case "finalizat":
      return "bg-emerald-400/10 text-emerald-200/90 border-emerald-300/25";
    case "in-curand":
      return "bg-bone/10 text-bone/70 border-bone/20";
    default:
      return "bg-bone/10 text-bone/70 border-bone/20";
  }
}

export function statusLabel(status: ProjectStatus): string {
  return STATUS_LABELS[status];
}
