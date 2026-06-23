import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE, SESSION_TOKEN } from "@/lib/auth";

/**
 * Protejează zona /admin și API-urile /api/admin.
 * Excepții: pagina de login și endpoint-ul de login.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";
  const authed = req.cookies.get(AUTH_COOKIE)?.value === SESSION_TOKEN;

  // API admin (fără login): 401 dacă nu e autentificat.
  if (pathname.startsWith("/api/admin") && !isLoginApi) {
    if (!authed) {
      return NextResponse.json({ error: "Neautorizat" }, { status: 401 });
    }
    return NextResponse.next();
  }

  // Pagini admin (fără pagina de login): redirect către login.
  if (pathname.startsWith("/admin") && !isLoginPage) {
    if (!authed) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Dacă e deja autentificat și accesează login, du-l în dashboard.
  if (isLoginPage && authed) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
