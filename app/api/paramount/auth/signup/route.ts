/* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextRequest, NextResponse } from "next/server";

// export const dynamic = "force-dynamic";

// export async function POST(req: NextRequest) {
//   try {
//     const baseUrl = process.env.BACKEND_BASE_URL;
//     if (!baseUrl) {
//       return NextResponse.json(
//         { message: "BACKEND_BASE_URL is not set" },
//         { status: 500 },
//       );
//     }

//     const body = await req.json();

//     const backendUrl = new URL("/v1/paramount/auth/signup", baseUrl);

//     const res = await fetch(backendUrl.toString(), {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify(body),
//       cache: "no-store",
//     });

//     const text = await res.text();

//     if (!res.ok) {
//       // passthrough backend error
//       return NextResponse.json(
//         { message: "Backend error", status: res.status, body: safeJson(text) },
//         { status: res.status },
//       );
//     }

//     return new NextResponse(text, {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (e: any) {
//     return NextResponse.json(
//       { message: "Proxy failed", error: e?.message ?? String(e) },
//       { status: 500 },
//     );
//   }
// }

// function safeJson(text: string) {
//   try {
//     return JSON.parse(text);
//   } catch {
//     return text;
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const baseUrl = process.env.BACKEND_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json(
        { message: "BACKEND_BASE_URL is not set" },
        { status: 500 },
      );
    }

    const body = await req.json();

    const backendUrl = new URL("/v1/paramount/auth/signup", baseUrl);

    const res = await fetch(backendUrl.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMessage =
        json?.message || json?.body?.message || "Signup failed";
      return NextResponse.json(
        { message: errorMessage, body: json },
        { status: res.status },
      );
    }

    // ✅ Backend success returns: { accessToken: "..." }
    const accessToken = json?.accessToken;
    if (!accessToken) {
      return NextResponse.json(
        { message: "No accessToken returned from backend" },
        { status: 500 },
      );
    }

    // ✅ Set HttpOnly cookie
    const response = NextResponse.json({ json }, { status: 200 });

    response.cookies.set({
      name: "paramount_access_token",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (e: any) {
    return NextResponse.json(
      { message: "Proxy failed", error: e?.message ?? String(e) },
      { status: 500 },
    );
  }
}
