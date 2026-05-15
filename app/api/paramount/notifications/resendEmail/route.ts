import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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

    const body = await req.json();

    const res = await fetch(`${baseUrl}/v1/paramount/notifications/resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await res.json().catch(() => null);

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to resend notification" },
      { status: 500 },
    );
  }
}
