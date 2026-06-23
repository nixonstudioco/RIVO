import { NextResponse } from "next/server";
import {
  AUTH_COOKIE,
  SESSION_TOKEN,
  verifyCredentials,
} from "@/lib/auth";

export async function POST(req: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  const { username = "", password = "" } = body;

  if (!verifyCredentials(username, password)) {
    return NextResponse.json(
      { error: "Utilizator sau parolă greșite." },
      { status: 401 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(AUTH_COOKIE, SESSION_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 zile
  });
  return res;
}
