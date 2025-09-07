"use client";

import Link from "next/link";
import { Section, Container } from "@/shared/ui/custom";
import { Button } from "@/shared/ui";
import { useDictionary } from "@/shared/lib/i18n";

export default function CourseNotFound() {
  const { dict } = useDictionary();

  return (
    <main>
      <Section>
        <Container>
          <h1 className="text-2xl font-semibold tracking-tight">
            {dict.common.navigation.courses}
          </h1>
          <div className="mt-6 rounded-lg border bg-card p-6 text-card-foreground">
            <p className="text-sm text-muted-foreground">
              {dict.common.errors.courseNotFound.description}
            </p>
            <div className="mt-4">
              <Button asChild>
                <Link href="/">
                  ← {dict.common.errors.courseNotFound.backToCourses}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
