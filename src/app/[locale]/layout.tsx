import type { Metadata } from "next";
import { JsonLd, buildOrganizationJsonLd, createMetadata } from "@/shared/seo";
import { getDictionary, Locale } from "@/shared/lib/i18n";
import { Footer, Header, NavBar } from "@/widgets";
import { HtmlLang } from "@/features/i18n";
import { ThemeProvider } from "@/features/theme";
import { Briefcase, FileText, Home, User } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata({
    title: "Unity Academy",
    alternatesPath: "/",
    canonical: `https://unityacademy.am/${locale}`,
    locale,
    description:
      "Стартовый каркас Unity Academy. Веб, AI, Android, контент и карьера.",
  });
}

const navItems = [
  { name: "Home", url: "/", icon: <Home size={18} strokeWidth={2.5} /> },
  { name: "About", url: "/about", icon: <User size={18} strokeWidth={2.5} /> },
  {
    name: "Courses",
    url: "/courses",
    icon: <Briefcase size={18} strokeWidth={2.5} />,
  },
];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      {/* меняем lang атрибут на клиенте согласно locale */}
      <HtmlLang locale={locale} />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <NavBar items={navItems} locale={locale} dict={dict.header} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
