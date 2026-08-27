/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import client from "@/api/client";

export async function POST(req: Request) {
  try {
    const { userId, token, newPassword } = await req.json();

    if (!userId || !token || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Faltan parámetros requeridos" },
        { status: 400 }
      );
    }

    const resp = await client.post("/account/reset-password", {
      userId,
      token,
      newPassword,
    });

    return NextResponse.json({
      success: true,
      message: resp.data.message ?? "Contraseña actualizada correctamente",
    });
  } catch (err: unknown) {
    const error = err as any;
    if (error?.response?.data) {
      const data = error.response.data;
      return NextResponse.json(
        { success: false, message: data.message ?? "No pudimos restablecer la contraseña" },
        { status: error.response.status ?? 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Error inesperado del servidor" },
      { status: 500 }
    );
  }
}
