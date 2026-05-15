import { NextResponse } from "next/server";

export const runtime = "nodejs"; // important if you use headers/env freely

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json(
        { error: "Missing query param: q" },
        { status: 400 },
      );
    }

    // Your real API base (server-side only)
    const base = process.env.BACKEND_BASE_URL; // e.g. https://api.yourdomain.com
    if (!base) {
      return NextResponse.json(
        { error: "Missing BACKEND_BASE_URL" },
        { status: 500 },
      );
    }

    // Build upstream URL
    const upstreamUrl = new URL("/v1/paramount/products/search", base);
    upstreamUrl.searchParams.set("q", q);

    // Optional: forward auth token/cookies if needed
    // const auth = req.headers.get("authorization");

    const upstreamRes = await fetch(upstreamUrl.toString(), {
      method: "GET",
      headers: {
        accept: "application/json",
        // ...(auth ? { authorization: auth } : {}),
      },
      cache: "no-store",
    });

    const data = await upstreamRes.json().catch(() => null);

    return NextResponse.json(data, { status: upstreamRes.status });
  } catch (err) {
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
