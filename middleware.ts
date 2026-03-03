import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "@/lib/supabase/proxy";
import { type NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

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
