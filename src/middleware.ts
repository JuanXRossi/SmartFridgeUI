import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/"];
const AUTH_ROUTES = ["/api/account/login", "/api/account/register", "/api/account/refresh"];

const REFRESH_THRESHOLD_MS = 5 * 60 * 1000; // 5 minutes

function getInternalApiUrl(): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
}

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
    const refreshResp = await fetch(
      `${getInternalApiUrl()}/api/account/refresh`,
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
      maxAge: 60 * 20,
    });

    res.cookies.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return true;
  } catch {
    return false;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname) || AUTH_ROUTES.some((r) => pathname.startsWith(r))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const decoded = decodeJWT(token);

  if (!decoded?.exp) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const expiresAt = decoded.exp * 1000;
  const now = Date.now();
  const shouldRefresh = expiresAt <= now + REFRESH_THRESHOLD_MS;

  if (shouldRefresh) {
    const res = NextResponse.next();
    const refreshSuccess = await refreshTokens(req, res);

    if (!refreshSuccess) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
