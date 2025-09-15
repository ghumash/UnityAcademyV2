import type { Metadata } from "next";
import { JsonLd, buildOrganizationJsonLd, createMetadata } from "@/shared/seo";
import type { Locale } from "@/shared/lib/i18n";
import { Footer, NavBar } from "@/widgets";
import { HtmlLang } from "@/features/i18n";
import { ThemeProvider } from "@/features/theme";
import { getNavigationConfig, getFooterConfig, siteConfig, absoluteUrl } from "@/shared/config/common";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { getT } = await import("@/shared/lib/i18n");
  const t = await getT(locale);
  
  return createMetadata({
    title: t("common.seo.home.title"),
    alternatesPath: siteConfig.routes.home,
    canonical: absoluteUrl(`/${locale}`),
    locale,
    description: t("common.seo.home.description"),
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
        defaultTheme={siteConfig.defaultTheme}
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
