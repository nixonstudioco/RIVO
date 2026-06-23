import { NextResponse } from "next/server";
import {
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "@/lib/store";
import { normalizeProject } from "@/lib/normalize";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return NextResponse.json({ error: "Proiect inexistent." }, { status: 404 });
  }
  return NextResponse.json({ project });
}

export async function PUT(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await req.json();
    const project = normalizeProject(body);
    const updated = await updateProject(params.slug, project);
    return NextResponse.json({ project: updated });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Eroare server." },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { slug: string } }
) {
  await deleteProject(params.slug);
  return NextResponse.json({ ok: true });
}
