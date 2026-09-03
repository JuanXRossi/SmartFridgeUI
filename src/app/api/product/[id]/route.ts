import { NextRequest, NextResponse } from "next/server";
import client from "@/api/client";
import { withAuth } from "../../account/helpers/withAuth";
import { ProductRequest, ProductResponse } from "@/app/types/products/object";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body: ProductRequest = await req.json();

    const { data, error } = await withAuth(req, (token) =>
      client.put<ProductResponse>(`/product/${id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    if (error) return error;

    return NextResponse.json({ success: true, data: data?.data }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Error al actualizar producto" },
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
      client.delete(`/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    if (error) return error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { success: false, message: "Error al eliminar producto" },
      { status: 500 }
    );
  }
}
