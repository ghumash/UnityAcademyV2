import type { Metadata } from "next";
import { Header, Footer } from "@/widgets";
import { createMetadata, JsonLd, buildOrganizationJsonLd } from "@/shared/seo";
import { getDictionary, Locale } from "@/shared/lib/i18n";
import { Toaster } from "@/shared/ui";
import { HtmlLang } from "@/entities/i18n";
import { ThemeProvider } from "@/entities/theme";

export const metadata: Metadata = createMetadata();

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
      <HtmlLang locale={locale} />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header locale={locale} dict={dict.header} />
        {children}
        <Footer locale={locale} dict={dict.header} />
      </ThemeProvider>
      <Toaster richColors closeButton duration={4000} />
    </>
  );
}
