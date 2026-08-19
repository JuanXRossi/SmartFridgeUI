import { NextRequest, NextResponse } from "next/server";
import client from "@/api/client";
import { withAuth } from "../account/helpers/withAuth";
import { ProductResponse } from "@/app/types/product/object";

export async function GET(req: NextRequest) {
  const { data, error } = await withAuth(req, (token) =>
    client.get<ProductResponse>("/product", {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  if (error) return error;

  return NextResponse.json({ success: true, data: data?.data }, { status: 200 });
}
