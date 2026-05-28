import { NextRequest, NextResponse } from "next/server";
import client from "@/api/client";
import { withAuth } from "../helpers/withAuth";
import { AuthUser } from "@/app/types/api/auth";

export async function GET(req: NextRequest) {
  const { data, error } = await withAuth(req, (token) =>
    client.get<AuthUser>("/account/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  if (error) return error;

  return NextResponse.json({ success: true, data: data?.data }, { status: 200 });
}
