"use client";

import { type Person, PersonCard } from "@/entities/person";
import { Section, Container } from "@/shared/ui/custom";
import { useI18n } from "@/shared/lib/i18n";

export function TeamSection({ people }: { people: Person[] }) {
  const { t } = useI18n();

  return (
    <Section>
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight">
          {t("about.teamSection.title")}
        </h2>

        {people.length === 0 ? (
          <div className="mt-6 rounded-lg border bg-card p-6 text-card-foreground">
            <p className="text-sm text-muted-foreground">
              {t("about.teamSection.emptyState")}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((p) => (
              <PersonCard key={p.slug} {...p} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
