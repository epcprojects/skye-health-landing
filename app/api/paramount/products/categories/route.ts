import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const baseUrl = process.env.BACKEND_BASE_URL;
    const authHeader = req.headers.get("authorization");

    const res = await fetch(`${baseUrl}/v1/paramount/products/categories`, {
      headers: {
        Accept: "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    const data = await res.json();
    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
