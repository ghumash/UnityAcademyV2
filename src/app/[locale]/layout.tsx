import type { Metadata } from "next";
import { JsonLd, buildOrganizationJsonLd, createMetadata } from "@/shared/seo";
import type { Locale } from "@/shared/lib/i18n";
import { Footer, NavBar } from "@/widgets";
import { HtmlLang } from "@/features/i18n";
import { ThemeProvider } from "@/features/theme";
import { getNavigationConfig, getFooterConfig } from "@/shared/config/common";

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const navigation = await getNavigationConfig(locale as Locale);
  const footer = await getFooterConfig(locale as Locale);

  return (
    <>
      {/* меняем lang атрибут на клиенте согласно locale */}
      <HtmlLang locale={locale as Locale} />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <NavBar
          items={navigation.navItems}
          locale={locale as Locale}
          applyButtonLabel={navigation.applyButton.label}
        />
        <Footer
          sections={footer.sections}
          copyright={footer.copyright}
          description={footer.description}
        />
      </ThemeProvider>
    </>
  );
}
