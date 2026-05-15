/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const baseUrl = process.env.BACKEND_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json(
        { message: "BACKEND_BASE_URL is not set" },
        { status: 500 },
      );
    }

    // ✅ Read token from HttpOnly cookie
    const token = req.cookies.get("paramount_access_token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const backendUrl = new URL("/v1/paramount/users/me", baseUrl);

    const res = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const msg = json?.message || "Failed to fetch user profile";
      return NextResponse.json(
        { message: msg, body: json },
        { status: res.status },
      );
    }

    return NextResponse.json(json, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { message: "Proxy failed", error: e?.message ?? String(e) },
      { status: 500 },
    );
  }
}
