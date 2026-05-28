/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

interface WithAuthResult<T> {
  data?: T;
  error?: NextResponse;
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
    return {
      error: NextResponse.json(
        { success: false, message: err.response?.data?.message ?? "Error inesperado" },
        { status: err.response?.status ?? 500 }
      ),
    };
  }
}
