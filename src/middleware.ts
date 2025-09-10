import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { locales, defaultLocale, type Locale } from "@/shared/lib/i18n";

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
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];
  return locales.includes(firstSegment as Locale)
    ? (firstSegment as Locale)
    : null;
}

function detectPreferredLocale(req: NextRequest): Locale {
  // 1) Cookie-based preference
  const cookieLocale =
    req.cookies.get("locale")?.value || req.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  // 2) Accept-Language header
  const header = req.headers.get("accept-language");
  if (header) {
    // Parse languages like: "en-US,en;q=0.9,ru;q=0.8"
    const codes = header
      .split(",")
      .map((part) => part.split(";")[0]?.trim())
      .filter(Boolean) as string[];
    for (const code of codes) {
      const base = code.toLowerCase().split("-")[0];
      const match = locales.find((l) => l === base);
      if (match) return match as Locale;
    }
  }

  // 3) Fallback to default
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // важно: никогда не локализуем API и Next-внутренности
  if (pathname.startsWith("/api") || pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

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
    const preferred = detectPreferredLocale(req);
    url.pathname = `/${preferred}${pathname}`;
    return NextResponse.redirect(url);
  }

  const res = NextResponse.next();
  // Persist current locale preference for future visits without locale prefix
  if (locale) {
    res.cookies.set("NEXT_LOCALE", locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
    });
  }
  const cspDev = process.env.CSP_RO ?? CSP_RO;
  if (process.env.NODE_ENV !== "production") {
    res.headers.set("Content-Security-Policy-Report-Only", cspDev);
  }
  return res;
}

export const config = {
  matcher: [
    // всё, кроме API, Next-внутренностей и файлов с расширением
    "/((?!api|_next|.*\\..*|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
