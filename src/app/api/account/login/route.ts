/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import client from "@/api/client";
import type { LoginRequest, LoginResponse } from "@/app/types/api/auth";

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

    const resp = await client.post<LoginResponse>("/account/login", {
        username: body.username,
        password: body.password,
    });

    return NextResponse.json({ success: true, data: resp.data }, { status: 200 });
  } catch (err: unknown) {
    const error = err as any;

    if (error?.response?.data) {
        const data = error.rsponse.data;
        const fieldErrors = data?.fieldErrors ?? data?.errors ?? undefined;

        return NextResponse.json({ success: false, message: data.message ?? "El inicio de sesión falló", fieldErrors }, { status: error.response.status ?? 500 })
    }

    return NextResponse.json({ success: false, message: "Error inesperado en el servidor" }, { status: 500 });
  }
}
