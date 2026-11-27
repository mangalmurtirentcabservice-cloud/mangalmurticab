import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  adminCookieName,
  adminCookieOptions,
  adminEmailCookieName,
  makeAdminToken,
} from "@/lib/admin-auth";
import { normalizeAdminEmail } from "@/lib/admin-auth";

function sameSecret(a: string, b: string) {
  const left = createHmac("sha256", "admin-login").update(a).digest();
  const right = createHmac("sha256", "admin-login").update(b).digest();
  return timingSafeEqual(left, right);
}

export async function POST(request: NextRequest) {
  let email = "";
  let password = "";
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    email = normalizeAdminEmail(String(body.email ?? ""));
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const envEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "";
  const envPassword = process.env.ADMIN_PASSWORD ?? "";
  if (!envEmail || !envPassword) {
    return NextResponse.json({ error: "Admin login is not configured." }, { status: 503 });
  }

  if (!sameSecret(email, envEmail) || !sameSecret(password, envPassword)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const token = makeAdminToken(email);
  if (!token) {
    return NextResponse.json({ error: "Admin session is not configured." }, { status: 503 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookieName(), token, adminCookieOptions());
  res.cookies.set(adminEmailCookieName(), email, adminCookieOptions());
  return res;
}
