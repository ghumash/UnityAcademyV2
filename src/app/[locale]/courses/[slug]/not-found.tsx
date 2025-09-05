"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Section, Container } from "@/shared/ui/custom";
import { Button } from "@/shared/ui";
import type { Locale } from "@/shared/lib/i18n";
import { getDictionarySync } from "@/shared/lib/i18n";

export default function CourseNotFound() {
  const { locale } = useParams<{ locale: Locale }>();
  const dict = getDictionarySync(locale);

  return (
    <main>
      <Section>
        <Container>
          <h1 className="text-2xl font-semibold tracking-tight">
            {dict.common.header.nav.courses}
          </h1>
          <div className="mt-6 rounded-lg border bg-card p-6 text-card-foreground">
            <p className="text-sm text-muted-foreground">
              Курс не найден или ещё не опубликован.
            </p>
            <div className="mt-4">
              {/* относительный путь → /[locale]/courses */}
              <Button asChild>
                <Link href="../">← {dict.common.header.nav.courses}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
