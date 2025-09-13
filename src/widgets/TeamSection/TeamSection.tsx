"use client";

import { PersonCard } from "@/entities/person";
import { Section, Container } from "@/shared/ui/custom";
import type { TeamMember } from "@/shared/lib/i18n/directories/about/types";

export type TeamSectionConfig = {
  title: string;
  emptyState: string;
  members: readonly TeamMember[];
};

export type TeamSectionProps = {
  config: TeamSectionConfig;
};

export function TeamSection({ config }: TeamSectionProps) {
  const { title, emptyState, members } = config;

  return (
    <Section>
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight">
          {title}
        </h2>

        {members.length === 0 ? (
          <div className="mt-6 rounded-lg border bg-card p-6 text-card-foreground">
            <p className="text-sm text-muted-foreground">
              {emptyState}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <PersonCard key={`${member.name}-${index}`} {...member} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
