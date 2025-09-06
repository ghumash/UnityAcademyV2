import Link from "next/link";
import { Button } from "@/shared/ui";
import { getT, type Locale } from "@/shared/lib/i18n";

export default async function NotFound({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);

  return (
    <main className="grid min-h-dvh place-items-center p-6">
      <div className="w-full max-w-md rounded-lg border bg-card p-6 text-card-foreground">
        <h1 className="text-2xl font-bold tracking-tight">
          {t("common.errors.notFound.title")}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("common.errors.notFound.description")}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild>
            <Link href={`/${locale}`}>{t("common.errors.notFound.goHome")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/${locale}/courses`}>{t("common.errors.notFound.courses")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/${locale}/apply`}>{t("common.errors.notFound.apply")}</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
