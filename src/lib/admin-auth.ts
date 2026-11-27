import { createHmac, timingSafeEqual } from "crypto";
import type { NextRequest } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export function normalizeAdminEmail(email: string) {
  return email.trim().toLowerCase();
}

const COOKIE_TOKEN = "pc_admin";
const COOKIE_EMAIL = "pc_admin_email";

function sessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.ADMIN_PASSWORD ||
    ""
  );
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  };
}

export function adminCookieName() {
  return COOKIE_TOKEN;
}

export function adminEmailCookieName() {
  return COOKIE_EMAIL;
}

export function makeAdminToken(email: string) {
  const secret = sessionSecret();
  const normalized = normalizeAdminEmail(email);
  if (!secret || !normalized) return null;
  return createHmac("sha256", secret).update(`pune-cabz-admin:${normalized}`).digest("hex");
}

export function adminConfigured() {
  return isSupabaseConfigured() && Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export function isAdminRequest(request: NextRequest) {
  const email = request.cookies.get(COOKIE_EMAIL)?.value;
  const got = request.cookies.get(COOKIE_TOKEN)?.value;
  if (!email || !got) return false;

  const expected = makeAdminToken(email);
  if (!expected) return false;
  return safeEqual(got, expected);
}
