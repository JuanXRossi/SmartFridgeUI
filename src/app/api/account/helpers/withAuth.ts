/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import client from "@/api/client";
import { UserResponse } from "@/app/types/api/auth";

interface WithAuthResult<T> {
  data?: T;
  error?: NextResponse;
  newCookies?: string;
}

export async function withAuth<T>(
  req: NextRequest,
  call: (token: string) => Promise<T>,
): Promise<WithAuthResult<T>> {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return {
      error: NextResponse.json(
        { success: false, message: "No autenticado" },
        { status: 401 }
      ),
    };
  }

  try {
    const data = await call(token);
    return { data };
  } catch (err: any) {
    if (err.response?.status !== 401) {
      return {
        error: NextResponse.json(
          { success: false, message: err.response?.data?.message ?? "Error inesperado" },
          { status: err.response?.status ?? 500 }
        ),
      };
    }
  }

  const refreshToken = req.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return {
      error: NextResponse.json(
        { success: false, message: "Sesión expirada", expired: true },
        { status: 401 }
      ),
    };
  }

  let newToken: string;
  let newCookies: string;

  try {
    const refreshResp = await client.post<UserResponse>("/account/refresh", {
        refreshtoken: refreshToken
    });

    const { token: refreshedToken, refreshToken: newRefreshToken } = refreshResp.data;

    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
    const cookieOpts = `HttpOnly${secure}; SameSite=Strict; Path=/`;
    newToken = refreshedToken;
    newCookies = [
      `auth_token=${refreshedToken}; Max-Age=${60 * 20}; ${cookieOpts}`,
      `refresh_token=${newRefreshToken}; Max-Age=${60 * 60 * 24 * 7}; ${cookieOpts}`,
    ].join(", ");
  } catch {
    const response = NextResponse.json(
      { success: false, message: "Sesión expirada", expired: true },
      { status: 401 }
    );

    response.cookies.set("auth_token", "", { maxAge: 0, path: "/" });
    response.cookies.set("refresh_token", "", { maxAge: 0, path: "/" });

    return { error: response };
  }

  try {
    const data = await call(newToken);
    return { data, newCookies };
  } catch (err: any) {
    return {
      error: NextResponse.json(
        { success: false, message: err.response?.data?.message ?? "Error inesperado" },
        { status: err.response?.status ?? 500 }
      ),
    };
  }
}