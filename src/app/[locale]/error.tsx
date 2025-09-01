"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Container, Section } from "@/shared/ui/custom";
import { Button } from "@/shared/ui";

const D = {
  ru: {
    code: "500",
    title: "Что-то пошло не так",
    desc: "Мы уже разбираемся. Попробуйте обновить страницу.",
    reload: "Обновить",
    home: "На главную",
  },
  en: {
    code: "500",
    title: "Something went wrong",
    desc: "We’re looking into it. Try reloading the page.",
    reload: "Reload",
    home: "Go home",
  },
  hy: {
    code: "500",
    title: "Ինչ-որ բան սխալ գնաց",
    desc: "Արդեն ուսումնասիրում ենք։ Փորձեք թարմացնել էջը։",
    reload: "Թարմացնել",
    home: "Գլխավոր",
  },
} as const;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  const locale = (params?.locale as keyof typeof D) ?? "ru";
  const t = D[locale] ?? D.ru;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main">
      <Section>
        <Container className="py-16 text-center">
          <p className="text-sm text-muted-foreground">
            {t.code}
            {error?.digest ? ` · ${error.digest}` : ""}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">{t.title}</h1>
          <p className="mt-2 text-muted-foreground">{t.desc}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={reset}>{t.reload}</Button>
            <Button asChild variant="outline">
              <Link href={`/${locale}`}>{t.home}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
