import { NextResponse } from "next/server";
import { addSubmission } from "@/lib/store";
import type { SubmissionType } from "@/lib/types";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_TYPES: SubmissionType[] = ["mesaj", "vizionare", "oferta"];

/**
 * Endpoint public folosit de formularul de contact.
 * Salvează solicitarea în store (vizibilă în /admin/mesaje).
 */
export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  const name = String(body?.name ?? "").trim();
  const email = String(body?.email ?? "").trim();
  const phone = String(body?.phone ?? "").trim();
  const message = String(body?.message ?? "").trim();
  const projectSlug = String(body?.projectSlug ?? "").trim();
  const type: SubmissionType = VALID_TYPES.includes(body?.type)
    ? body.type
    : "mesaj";

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 5) {
    return NextResponse.json(
      { error: "Date invalide. Verifică numele, emailul și mesajul." },
      { status: 400 }
    );
  }

  const submission = await addSubmission({
    type,
    name,
    email,
    phone,
    projectSlug,
    message,
  });

  return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
}
