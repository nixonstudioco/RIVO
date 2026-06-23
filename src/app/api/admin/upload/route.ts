import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import {
  isSupabaseConfigured,
  getSupabaseAdmin,
  SUPABASE_BUCKET,
} from "@/lib/supabase";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

/**
 * Primește un fișier (multipart/form-data, câmp "file") și îl salvează:
 * - în Supabase Storage (bucket `rivo-media`) dacă Supabase e configurat;
 * - altfel local, în `public/uploads`.
 * Returnează URL-ul public al imaginii.
 */
export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Niciun fișier." }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { error: "Tip de fișier neacceptat (doar imagini)." },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Fișier prea mare (max 8 MB)." },
        { status: 400 }
      );
    }

    const ext = (file.name.split(".").pop() ?? "jpg")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    const fileName = `${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}.${ext || "jpg"}`;
    const bytes = Buffer.from(await file.arrayBuffer());

    // --- Supabase Storage ---
    if (isSupabaseConfigured()) {
      const sb = getSupabaseAdmin();
      const objectPath = `uploads/${fileName}`;
      const { error } = await sb.storage
        .from(SUPABASE_BUCKET)
        .upload(objectPath, bytes, {
          contentType: file.type,
          upsert: false,
        });
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      const { data } = sb.storage.from(SUPABASE_BUCKET).getPublicUrl(objectPath);
      return NextResponse.json({ url: data.publicUrl }, { status: 201 });
    }

    // --- Local (fallback) ---
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }
    fs.writeFileSync(path.join(UPLOAD_DIR, fileName), bytes);
    return NextResponse.json({ url: `/uploads/${fileName}` }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Eroare la încărcare." },
      { status: 500 }
    );
  }
}
