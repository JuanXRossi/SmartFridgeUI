import { NextRequest, NextResponse } from "next/server";
import client from "@/api/client";
import { withAuth } from "../../account/helpers/withAuth";
import { UrgencyRequest, UrgencyResponse } from "@/app/types/urgencies/object";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: UrgencyRequest = await req.json();

    const { data, error } = await withAuth(req, (token) =>
      client.put<UrgencyResponse>(`/urgency/${id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    if (error) return error;

    return NextResponse.json({ success: true, data: data?.data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Error al actualizar urgencia" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await withAuth(req, (token) =>
      client.delete(`/urgency/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    if (error) return error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Error al eliminar urgencia" },
      { status: 500 }
    );
  }
}
