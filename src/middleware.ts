import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "@/shared/lib/i18n/config";

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

function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  return locales.includes(firstSegment as Locale) ? (firstSegment as Locale) : null;
}

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // If path looks like a static asset (contains a dot in the last segment),
  // handle specially to avoid locale prefixing breaking URLs from /public
  const isStaticFile = /\.[^/]+$/.test(pathname);

  // If the path starts with a locale and targets a static file, rewrite to strip the locale
  const localeInPath = getLocaleFromPathname(pathname);
  if (localeInPath && isStaticFile) {
    const stripped = pathname.replace(`/${localeInPath}`, "") || "/";
    const url = nextUrl.clone();
    url.pathname = stripped;
    return NextResponse.rewrite(url);
  }

  // If it's any other static file request, let it pass without locale redirects
  if (isStaticFile) {
    return NextResponse.next();
  }

  // Редирект с корня на дефолтную локаль
  if (pathname === "/") {
    const url = nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  // Проверяем, есть ли локаль в пути
  const locale = getLocaleFromPathname(pathname);
  
  // Если пути нет локали, редиректим на путь с дефолтной локалью
  if (!locale) {
    const url = nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();
  const cspDev = process.env.CSP_RO ?? CSP_RO;
  if (process.env.NODE_ENV !== "production") {
    res.headers.set("Content-Security-Policy-Report-Only", cspDev);
  }
  return res;
}

export const config = {
  matcher: [
    // Include everything except Next internals and root files; static files will be
    // handled in code (rewrite/skip) instead of excluding by matcher.
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
