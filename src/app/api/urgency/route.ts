import { NextRequest, NextResponse } from "next/server";
import client from "@/api/client";
import { withAuth } from "../account/helpers/withAuth";
import { UrgencyRequest, UrgencyResponse } from "@/app/types/urgencies/object";

export async function GET(req: NextRequest) {
  const { data, error } = await withAuth(req, (token) =>
    client.get<UrgencyResponse>("/urgency", {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  if (error) return error;

  return NextResponse.json({ success: true, data: data?.data }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body: UrgencyRequest = await req.json();

    const { data, error } = await withAuth(req, (token) =>
      client.post<UrgencyResponse>("/urgency", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    if (error) return error;

    return NextResponse.json(
      { success: true, data: data?.data },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { success: false, message: "Error al crear urgencia" },
      { status: 500 }
    );
  }
}
