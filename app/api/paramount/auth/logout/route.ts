import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });

  // change names to your real cookie names
  const cookieNames = ["paramount_access_token"];

  for (const name of cookieNames) {
    res.cookies.set({
      name,
      value: "",
      path: "/",
      maxAge: 0,
    });
  }

  return res;
}
