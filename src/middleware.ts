import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/"];
const AUTH_ROUTES = ["/api/account/login", "/api/account/register", "/api/account/refresh"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes and auth API routes through
  if (PUBLIC_ROUTES.includes(pathname) || AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};