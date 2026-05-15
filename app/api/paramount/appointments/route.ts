/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Get token from cookies (server-side)
    // Change cookie name to your real one:
    const token = (await cookies()).get("paramount_access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized", body: { message: "Missing token" } },
        { status: 401 },
      );
    }

    const baseUrl = process.env.BACKEND_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json(
        {
          message: "Server misconfigured",
          body: { message: "Missing API base URL" },
        },
        { status: 500 },
      );
    }

    // ✅ Forward request to your backend
    const upstream = await fetch(`${baseUrl}/v1/paramount/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await upstream.json().catch(() => null);

    return NextResponse.json(data ?? { message: "No response body" }, {
      status: upstream.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        message: "Proxy error",
        body: { message: err?.message || "Unknown error" },
      },
      { status: 500 },
    );
  }
}
