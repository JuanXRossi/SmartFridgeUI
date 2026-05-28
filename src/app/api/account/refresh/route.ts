import { NextRequest, NextResponse } from "next/server";
import client from "@/api/client";
import { UserResponse } from "@/app/types/api/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const refreshResp = await client.post<UserResponse>("/account/refresh", {
      refreshtoken: body.refreshtoken,
    });

    const { token, refreshToken } = refreshResp.data;

    return NextResponse.json({ token, refreshToken }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
