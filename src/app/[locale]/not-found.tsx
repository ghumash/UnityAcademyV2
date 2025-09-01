"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Container, Section } from "@/shared/ui/custom";
import { Button } from "@/shared/ui";

const D = {
  ru: {
    code: "404",
    title: "Страница не найдена",
    desc: "Такой страницы нет или она была перемещена.",
    home: "На главную",
    courses: "К курсам",
  },
  en: {
    code: "404",
    title: "Page not found",
    desc: "The page doesn't exist or was moved.",
    home: "Go home",
    courses: "Browse courses",
  },
  hy: {
    code: "404",
    title: "Էջը չի գտնվել",
    desc: "Էջը գոյություն չունի կամ տեղափոխվել է։",
    home: "Գլխավոր",
    courses: "Դասընթացներ",
  },
} as const;

export default function NotFound() {
  const params = useParams();
  const locale = (params?.locale as keyof typeof D) ?? "ru";
  const t = D[locale] ?? D.ru;

  return (
    <main>
      <Section>
        <Container className="py-16 text-center">
          <p className="text-sm text-muted-foreground">{t.code}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="mt-2 text-muted-foreground">{t.desc}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild>
              <Link href={`/${locale}`}>{t.home}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/${locale}/courses`}>{t.courses}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
