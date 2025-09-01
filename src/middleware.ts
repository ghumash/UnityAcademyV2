import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CSP_RO = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vitals.vercel-insights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https: https://i.ytimg.com https://img.youtube.com",
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com",
  "frame-src 'self' https://docs.google.com https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export function middleware(_req: NextRequest) {
  const res = NextResponse.next();
  if (process.env.NODE_ENV !== "production") {
    res.headers.set("Content-Security-Policy-Report-Only", CSP_RO);
  }
  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets/).*)",
  ],
};
