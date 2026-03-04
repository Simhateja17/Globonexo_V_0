import { NextRequest, NextResponse } from "next/server";

// Cookie name used to mark an authenticated visitor
export const SITE_AUTH_COOKIE = "site_auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  const sitePassword = process.env.SITE_PASSWORD;

  if (!sitePassword) {
    // If no password is configured, deny by default
    return NextResponse.json(
      { error: "Site password is not configured." },
      { status: 500 }
    );
  }

  if (password !== sitePassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });

  // HttpOnly cookie so JS cannot read it; SameSite=Lax is safe for navigation
  response.cookies.set(SITE_AUTH_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    // Expire after 7 days; set to a session cookie by omitting maxAge if preferred
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
