/* eslint-disable @typescript-eslint/no-explicit-any */
import client from "@/api/client";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "../helpers/withAuth";
import { UpdateAccountRequest, UserResponse } from "@/app/types/api/auth";
import { AUTH_COOKIE_MAX_AGE_S, REFRESH_COOKIE_MAX_AGE_S } from "@/app/constants/values";

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as UpdateAccountRequest;

    const missing = ["name", "email", "username"].filter(
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

    const { data, error } = await withAuth(req, (token) =>
      client.put<UserResponse>("/account/update", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    if (error) return error;

    const { userName, email, roles, token, refreshToken } = data.data;

    const response = NextResponse.json({ success: true, user: { username: userName, email: email, roles: roles[0] } }, { status: 200 });

    response.cookies.set("auth_token", token, {
      ...COOKIE_OPTS,
      maxAge: AUTH_COOKIE_MAX_AGE_S,
    });
    response.cookies.set("refresh_token", refreshToken, {
      ...COOKIE_OPTS,
      maxAge: REFRESH_COOKIE_MAX_AGE_S,
    });

    return response;
  } catch(err: unknown) {
    const error = err as any;

    if (error?.response?.data) {
        const data = error.response.data;
        const fieldErrors = data?.fieldErrors ?? data?.errors ?? undefined;

        return NextResponse.json({ success: false, message: data.message ?? "El inicio de sesión falló", fieldErrors }, { status: error.response.status ?? 500 })
    }

    return NextResponse.json({ success: false, message: "Error inesperado en el servidor" }, { status: 500 });
  }
}
