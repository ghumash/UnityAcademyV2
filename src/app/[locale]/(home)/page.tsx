import type { Metadata } from "next";
import type { Locale } from "@/shared/lib/i18n";
import { Section, Container } from "@/shared/ui/custom";
import { TeamSection } from "@/widgets";
import { peopleMock } from "@/entities/person";
import { createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return createMetadata({
    title: "Unity Academy",
    canonical: absoluteUrl(`/${locale}`),
    alternatesPath: "/",
    locale,
    description:
      "Стартовый каркас Unity Academy. Веб, AI, Android, контент и карьера.",
  });
}

export default async function HomePage() {
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

      <TeamSection people={peopleMock} />
    </main>
  );
}
