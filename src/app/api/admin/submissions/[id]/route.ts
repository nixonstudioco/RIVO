import { NextResponse } from "next/server";
import { updateSubmission, deleteSubmission } from "@/lib/store";
import type { SubmissionStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const VALID: SubmissionStatus[] = ["nou", "citit", "rezolvat"];

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = (await req.json()) as { status?: SubmissionStatus };
    if (!body.status || !VALID.includes(body.status)) {
      return NextResponse.json({ error: "Status invalid." }, { status: 400 });
    }
    const updated = await updateSubmission(params.id, { status: body.status });
    if (!updated) {
      return NextResponse.json({ error: "Inexistent." }, { status: 404 });
    }
    return NextResponse.json({ submission: updated });
  } catch {
    return NextResponse.json({ error: "Eroare server." }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await deleteSubmission(params.id);
  return NextResponse.json({ ok: true });
}
