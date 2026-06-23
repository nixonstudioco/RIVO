import { cn, statusBadgeClasses, statusLabel } from "@/lib/utils";
import type { ProjectStatus } from "@/lib/projects";

export default function StatusBadge({
  status,
  className,
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] backdrop-blur-sm",
        statusBadgeClasses(status),
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {statusLabel(status)}
    </span>
  );
}
