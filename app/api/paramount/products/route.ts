/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // prevents caching if you want fresh data

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // read query params
    const page = searchParams.get("page") ?? "1";
    const limit = searchParams.get("limit") ?? "20";
    const filter = searchParams.get("filter") ?? "";

    // basic validation
    const pageNum = Number(page);
    const limitNum = Number(limit);

    if (!Number.isFinite(pageNum) || pageNum <= 0) {
      return NextResponse.json({ message: "Invalid page" }, { status: 400 });
    }
    if (!Number.isFinite(limitNum) || limitNum <= 0 || limitNum > 200) {
      return NextResponse.json({ message: "Invalid limit" }, { status: 400 });
    }

    const baseUrl = process.env.BACKEND_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json(
        { message: "BACKEND_BASE_URL is not set" },
        { status: 500 },
      );
    }

    // build backend URL
    const backendUrl = new URL("/v1/paramount/products", baseUrl);
    backendUrl.searchParams.set("page", String(pageNum));
    backendUrl.searchParams.set("limit", String(limitNum));
    backendUrl.searchParams.set("filter", String(filter));

    // forward auth if you use bearer token from client -> next -> backend
    const authHeader = req.headers.get("authorization");

    const res = await fetch(backendUrl.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      cache: "no-store",
    });

    const text = await res.text();

    // pass through backend errors
    if (!res.ok) {
      return NextResponse.json(
        { message: "Backend error", status: res.status, body: safeJson(text) },
        { status: res.status },
      );
    }

    // return backend JSON as-is
    return new NextResponse(text, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return NextResponse.json(
      { message: "Proxy failed", error: e?.message ?? String(e) },
      { status: 500 },
    );
  }
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
