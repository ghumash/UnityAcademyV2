import type { Metadata } from "next";
import { createMetadata } from "@/shared/seo";
import { JsonLd, buildOrganizationJsonLd } from "@/shared/seo/jsonld";
import { Toaster } from "@/shared/ui";
import { getDictionary, Locale } from "@/shared/lib/i18n";
import { ThemeProvider } from "@/features/theme";
import { Footer, Header } from "@/widgets";

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
