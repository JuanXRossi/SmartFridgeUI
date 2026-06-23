import { NextRequest, NextResponse } from "next/server";
import { getInternalApiUrl } from "./api/internalClient";
import { AUTH_COOKIE_MAX_AGE_S, REFRESH_COOKIE_MAX_AGE_S, REFRESH_THRESHOLD_S } from "./app/constants/values";

const PUBLIC_ROUTES = ["/"];
const AUTH_ROUTES = ["/api/account/login", "/api/account/register", "/api/account/refresh"];

function decodeJWT(token: string): { exp?: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf-8")
    );

    return decoded;
  } catch {
    return null;
  }
}

async function refreshTokens(
  req: NextRequest,
  res: NextResponse
): Promise<boolean> {
  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return false;
  }

  try {
    const refreshResp = await fetch(getInternalApiUrl("/api/account/refresh"),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshtoken: refreshToken }),
      }
    );

    if (!refreshResp.ok) {
      return false;
    }

    const data = await refreshResp.json();
    const { token: newToken, refreshToken: newRefreshToken } = data;

    res.cookies.set("auth_token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: AUTH_COOKIE_MAX_AGE_S,
    });

    res.cookies.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: REFRESH_COOKIE_MAX_AGE_S,
    });

    return true;
  } catch {
    return false;
  }
}

function redirectToLandingPage(url: string): NextResponse {
  const redirect = NextResponse.redirect(new URL("/", url));
  redirect.cookies.set("auth_token", "", { maxAge: 0, path: "/" });
  redirect.cookies.set("refresh_token", "", { maxAge: 0, path: "/" });
  return redirect;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname) || AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("auth_token")?.value;
  const decoded = token ? decodeJWT(token) : null;

  if (!token || !decoded?.exp) {
    return redirectToLandingPage(req.url);
  }

  const expiresAt = decoded.exp * 1000;
  const now = Date.now();
  const shouldRefresh = expiresAt <= now + REFRESH_THRESHOLD_S * 1000;

  if (shouldRefresh) {
    const res = NextResponse.next();
    const refreshSuccess = await refreshTokens(req, res);
    return refreshSuccess ? res : redirectToLandingPage(req.url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
