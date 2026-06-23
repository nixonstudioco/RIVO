import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/store";
import type { SiteSettings } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ settings: await getSettings() });
}

export async function PUT(req: Request) {
  try {
    const body = (await req.json()) as { settings?: SiteSettings };
    if (!body.settings) {
      return NextResponse.json({ error: "Date lipsă." }, { status: 400 });
    }
    // Curățăm stats să fie numere valide.
    const settings = body.settings;
    settings.stats = (settings.stats ?? []).map((s) => ({
      value: Number(s.value) || 0,
      suffix: String(s.suffix ?? ""),
      label: String(s.label ?? ""),
    }));
    const saved = await saveSettings(settings);
    return NextResponse.json({ settings: saved });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Eroare server." },
      { status: 400 }
    );
  }
}
