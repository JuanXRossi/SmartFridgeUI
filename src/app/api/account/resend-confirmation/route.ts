/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import client from "@/api/client";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "El correo electrónico es requerido" },
        { status: 400 }
      );
    }

    const resp = await client.post("/account/resend-confirmation", { email });

    return NextResponse.json({
      success: true,
      message: resp.data.message ?? "Si el correo existe, te enviamos un nuevo enlace",
    });
  } catch (err: unknown) {
    const error = err as any;
    if (error?.response?.data) {
      const data = error.response.data;
      return NextResponse.json(
        { success: false, message: data.message ?? "No pudimos reenviar el correo" },
        { status: error.response.status ?? 500 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Error inesperado del servidor" },
      { status: 500 }
    );
  }
}
