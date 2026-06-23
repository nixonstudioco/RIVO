"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteProjectButton({
  slug,
  name,
}: {
  slug: string;
  name: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    if (
      !window.confirm(
        `Ștergi proiectul „${name}"? Această acțiune nu poate fi anulată.`
      )
    )
      return;
    setLoading(true);
    await fetch(`/api/admin/projects/${slug}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={loading}
      aria-label={`Șterge ${name}`}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-bone/15 text-bone/60 transition-colors hover:border-red-400/50 hover:text-red-300 disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Trash2 size={16} />
      )}
    </button>
  );
}
