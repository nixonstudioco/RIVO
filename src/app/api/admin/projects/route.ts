import { NextResponse } from "next/server";
import { getProjects, createProject } from "@/lib/store";
import { normalizeProject } from "@/lib/normalize";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ projects: await getProjects() });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const project = normalizeProject(body);
    if (!project.slug) {
      return NextResponse.json({ error: "Slug invalid." }, { status: 400 });
    }
    const created = await createProject(project);
    return NextResponse.json({ project: created }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Eroare server." },
      { status: 400 }
    );
  }
}
