import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "@/lib/supabase/proxy";
import { type NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

/** Cookie set by /api/auth/password when the visitor enters the correct password. */
const SITE_AUTH_COOKIE = "site_auth";

// Locale prefixes supported by next-intl
const LOCALES = ["en", "de"];

/**
 * Strip a locale prefix from a pathname so that /en/password and
 * /password are treated identically.
 */
function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || "/";
    }
  }
  return pathname;
}

/**
 * Paths that must remain accessible without the site password so the
 * password entry flow itself can work.
 */
function isBypassPath(pathname: string): boolean {
  const bare = stripLocale(pathname);
  return (
    bare.startsWith("/password") ||
    bare.startsWith("/api/auth/password") ||
    bare.startsWith("/auth") ||
    bare.startsWith("/admin") ||
    bare.startsWith("/api") ||
    bare.startsWith("/protected")
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Site-wide password gate ---
  // If SITE_PASSWORD is configured and the visitor does not have the auth
  // cookie, redirect them to the password page (except for bypass paths).
  const sitePassword = process.env.SITE_PASSWORD;
  if (sitePassword && !isBypassPath(pathname)) {
    const siteAuth = request.cookies.get(SITE_AUTH_COOKIE);
    if (!siteAuth || siteAuth.value !== "1") {
      const url = request.nextUrl.clone();
      url.pathname = "/en/password";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Skip i18n for admin, auth, api, and static routes
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/protected")
  ) {
    // For admin routes, run auth session check
    return await updateSession(request);
  }

  // For public routes, run i18n middleware (locale detection + prefix)
  const intlResponse = intlMiddleware(request);

  // Also refresh Supabase session on locale routes
  // We need to merge both middlewares' cookie handling
  const sessionResponse = await updateSession(request);

  // Copy Supabase session cookies to the intl response
  if (intlResponse && sessionResponse) {
    const cookies = sessionResponse.cookies.getAll();
    for (const cookie of cookies) {
      intlResponse.cookies.set(cookie.name, cookie.value);
    }
  }

  return intlResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
