/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import client from "@/api/client";
import type { LoginRequest, UserResponse } from "@/app/types/api/auth";
import { AUTH_COOKIE_MAX_AGE_S, REFRESH_COOKIE_MAX_AGE_S } from "@/app/constants/values";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginRequest;

    const missing = ["username", "password"].filter(
      (k) => !(body as any)[k]
    );

    if (missing.length) {
      const fieldErrors = missing.reduce((acc: Record<string, string>, k: string) => {
        acc[k] = "Requerido";
        return acc;
      }, {});

      return NextResponse.json(
        { success: false, message: "Faltan campos requeridos", fieldErrors},
        {status: 400}
      );
    }

    const resp = await client.post<UserResponse>("/account/login", {
        username: body.username,
        password: body.password,
    });

    const { userName, email, token, refreshToken } = resp.data;

    const response = NextResponse.json({ success: true, user: { userName, email } }, { status: 200 });

    response.cookies.set("auth_token", token, {
      ...COOKIE_OPTS,
      maxAge: AUTH_COOKIE_MAX_AGE_S,
    });
    response.cookies.set("refresh_token", refreshToken, {
      ...COOKIE_OPTS,
      maxAge: REFRESH_COOKIE_MAX_AGE_S,
    });

    return response;
  } catch (err: unknown) {
    const error = err as any;

    if (error?.response?.data) {
        const data = error.response.data;
        const fieldErrors = data?.fieldErrors ?? data?.errors ?? undefined;

        return NextResponse.json({ success: false, message: data.message ?? "El inicio de sesión falló", fieldErrors }, { status: error.response.status ?? 500 })
    }

    return NextResponse.json({ success: false, message: "Error inesperado en el servidor" }, { status: 500 });
  }
}
