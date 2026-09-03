import { NextRequest, NextResponse } from "next/server";
import client from "@/api/client";
import { withAuth } from "../account/helpers/withAuth";
import { ProductRequest, ProductResponse } from "@/app/types/products/object";

export async function GET(req: NextRequest) {
  const { data, error } = await withAuth(req, (token) =>
    client.get<ProductResponse>("/product", {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  if (error) return error;

  return NextResponse.json({ success: true, data: data?.data }, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const body: ProductRequest = await req.json();

    const { data, error } = await withAuth(req, (token) =>
      client.post<ProductResponse>("/product", body, {
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
      { success: false, message: "Error al crear producto" },
      { status: 500 }
    );
  }
}
