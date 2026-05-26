import { withAuth } from "../helpers/withAuth";
import client from "@/api/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { error } = await withAuth(req, (token) => 
      client.post("/account/logout", {}, { 
        headers: { Authorization: `Bearer ${token}` } 
      })
    );

    if (error) return error;

    const response = NextResponse.json({ success: true, status: 200 });

    response.cookies.set("auth_token", "", { maxAge: 0, path: "/" });
    response.cookies.set("refresh_token", "", { maxAge: 0, path: "/" });

    return response;
}