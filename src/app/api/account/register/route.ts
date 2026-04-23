import { NextResponse } from "next/server";
import client from "@/api/client";
import type { RegisterRequest, RegisterResponse } from "@/app/types/api/auth";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegisterRequest;

    // Basic server-side validation
    const missing = ["username", "email", "password", "name", "termsAccepted"].filter(
      (k) => !(body as any)[k]
    );
    if (missing.length) {
      const fieldErrors = missing.reduce((acc: Record<string, string>, k: string) => {
        acc[k] = "Required";
        return acc;
      }, {});
      return NextResponse.json(
        { success: false, message: "Missing required fields", fieldErrors },
        { status: 400 }
      );
    }

    if (body.termsAccepted !== true) {
      return NextResponse.json({ success: false, message: "You must accept the Terms & Privacy Policy" }, { status: 400 });
    }

    const resp = await client.post<RegisterResponse>("/account/register", {
      username: body.username,
      email: body.email,
      password: body.password,
      name: body.name,
    });

    return NextResponse.json({ success: true, data: resp.data }, { status: 201 });
  } catch (err: unknown) {
    const error = err as any;
    if (error?.response?.data) {
      const data = error.response.data;
      const fieldErrors = data?.fieldErrors ?? data?.errors ?? undefined;
      return NextResponse.json({ success: false, message: data.message ?? "Registration failed", fieldErrors }, { status: error.response.status ?? 500 });
    }
    return NextResponse.json({ success: false, message: "Unexpected server error" }, { status: 500 });
  }
}
