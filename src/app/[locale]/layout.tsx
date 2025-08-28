import type { Metadata } from "next";
import { Header, Footer } from "@/widgets";
import { ThemeProvider } from "@/features/theme";
import { createMetadata, JsonLd, buildOrganizationJsonLd } from "@/shared/seo";
import { getDictionary, Locale } from "@/shared/lib/i18n";
import { Toaster } from "@/shared/ui";
import { HtmlLang } from "@/features/i18n";

export const metadata: Metadata = createMetadata();

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dict = await getDictionary(params.locale);

  return (
    <>
      <HtmlLang locale={params.locale} />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header locale={params.locale} dict={dict.header} />
        {children}
        <Footer locale={params.locale} dict={dict.header} />
      </ThemeProvider>
      <Toaster richColors closeButton duration={4000} />
    </>
  );
}
