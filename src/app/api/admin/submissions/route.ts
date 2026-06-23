import { NextResponse } from "next/server";
import { getSubmissions } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ submissions: await getSubmissions() });
}
