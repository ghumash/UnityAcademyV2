import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/shared/ui";
import { createMetadata } from "@/shared/seo";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = createMetadata({
  title: "Unity Academy",
  alternatesPath: "/",
  canonical: "https://unityacademy.am/",
  locale: "ru",
  description:
    "Стартовый каркас Unity Academy. Веб, AI, Android, контент и карьера.",
});

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
        <div className="sm:mt-20 md:mt-22">{children}</div>
        <Toaster richColors closeButton duration={4000} />
        <Analytics />
      </body>
    </html>
  );
}
