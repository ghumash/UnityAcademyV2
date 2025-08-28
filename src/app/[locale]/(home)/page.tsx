import type { Metadata } from "next";
import { Section, Container } from "@/shared/ui/custom";
import { createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { Locale } from "@/shared/lib/i18n";

export function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Metadata {
  return createMetadata({
    title: "Unity Academy",
    canonical: absoluteUrl(`/${params.locale}`),
    alternatesPath: "/",
    locale: params.locale,
    description:
      "Стартовый каркас Unity Academy. Веб, AI, Android, контент и карьера.",
  });
}

export default function HomePage() {
  return (
    <main>
      <Section>
        <Container>
          <h1 className="text-3xl font-bold tracking-tight">Unity Academy</h1>
          <p className="mt-3 text-muted-foreground">
            Стартовый каркас готов. Двигаемся по шагам.
          </p>
        </Container>
      </Section>
    </main>
  );
}
