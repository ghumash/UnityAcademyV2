import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/shared/ui";
import { createMetadata } from "@/shared/lib/seo";
import "./globals.css";
import { getT, type Locale } from "@/shared/lib/i18n";
import { absoluteUrl, siteConfig } from "@/shared/config/common";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  return createMetadata({
    title: siteConfig.name,
    canonical: absoluteUrl(`/${locale}`),
    alternatesPath: siteConfig.routes.home,
    locale,
    description: t("home.hero.subtitle"),
  });
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* preconnect/dns-prefetch глобально (без завязки на locale) */}
        <link rel="dns-prefetch" href="https://docs.google.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://docs.google.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="" />
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="" />
        <link
          rel="preconnect"
          href="https://www.youtube-nocookie.com"
          crossOrigin=""
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-dvh`}>
        {children}
        <Toaster richColors closeButton duration={4000} />
        <Analytics />
      </body>
    </html>
  );
}
