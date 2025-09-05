import type { Metadata } from "next";
import Link from "next/link";
import { Section, Container } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, Locale } from "@/shared/lib/i18n";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  Button,
  Input,
  Badge,
} from "@/shared/ui";
import {
  getAllTagsForLocale,
  searchFilterCourses,
  type CourseLite,
} from "@/shared/content/courses";
import { paginate } from "@/shared/lib/pagination";

const PER_PAGE = 9;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ q?: string; tag?: string; page?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { q, tag, page } = await searchParams;
  const t = await getT(locale);

  const base = `/${locale}/courses`;
  const query = new URLSearchParams();
  if (q) query.set("q", q);
  if (tag) query.set("tag", tag);
  if (page && page !== "1") query.set("page", page);
  const canonicalPath = query.toString() ? `${base}?${query.toString()}` : base;

  const meta = createMetadata({
    title: t("header.nav.courses"),
    canonical: absoluteUrl(canonicalPath),
    alternatesPath: "/courses",
    locale,
    description:
      "Курсы Unity Academy: веб-разработка, искусственный интеллект, создание контента, Android, SMM и soft skills.",
  });

  return {
    ...meta,
    robots: {
      index: !(q || tag), // search/filters → noindex
      follow: true,
    },
  };
}

export default async function CoursesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ q?: string; tag?: string; page?: string }>;
}) {
  const { locale } = await params;
  const { q, tag, page } = await searchParams;
  const t = await getT(locale);

  const all = await searchFilterCourses(locale, { q, tag });
  const pager = paginate(all.length, Number(page ?? "1"), PER_PAGE);
  const items: CourseLite[] = all.slice(
    pager.offset,
    pager.offset + pager.perPage
  );
  const tags = await getAllTagsForLocale(locale);

  const href = (next: Partial<{ q?: string; tag?: string; page?: number }>) => {
    const sp = new URLSearchParams();
    const qv = next.q ?? q ?? "";
    const tv = next.tag ?? tag ?? "";
    const pv = String(next.page ?? pager.page);
    if (qv) sp.set("q", qv);
    if (tv) sp.set("tag", tv);
    if (pv !== "1") sp.set("page", pv);
    const qs = sp.toString();
    return qs ? `/${locale}/courses?${qs}` : `/${locale}/courses`;
  };

  return (
    <main id="main">
      {/* Breadcrumbs JSON-LD c учётом query */}
      <JsonLd
        id="breadcrumbs-courses"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.home"), href: `/${locale}` },
          { name: t("header.nav.courses"), href: href({}) },
        ])}
      />

      {/* ItemList JSON-LD для списка курсов на странице */}
      <JsonLd
        id="courses-itemlist"
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: items.map((c, i) => ({
            "@type": "ListItem",
            position: pager.offset + i + 1,
            url: absoluteUrl(`/${locale}/courses/${c.slug}`),
            name: c.title,
          })),
        }}
      />

      <Section>
        <Container>
          <Breadcrumb aria-label="Breadcrumb">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${locale}`}>{t("common.home")}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t("header.nav.courses")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="mt-4 text-3xl font-bold tracking-tight">
            {t("header.nav.courses")}
          </h1>

          {/* Панель фильтров */}
          <div className="mt-6 grid gap-3">
            <form
              action={`/${locale}/courses`}
              className="flex items-center gap-2"
            >
              <Input
                name="q"
                defaultValue={q ?? ""}
                placeholder="Поиск по курсам..."
                className="w-full sm:max-w-[420px]"
              />
              {tag ? <input type="hidden" name="tag" value={tag} /> : null}
              <Button type="submit">Найти</Button>
              {(q || tag) && (
                <Button asChild variant="outline">
                  <Link href={`/${locale}/courses`}>Сбросить</Link>
                </Button>
              )}
            </form>

            {tags.length > 0 && (
              <div
                className="flex flex-wrap items-center gap-2 pt-1"
                aria-label="Фильтр по тегам"
              >
                {tags.map((tg) => {
                  const selected =
                    tg.toLowerCase() === (tag ?? "").toLowerCase();
                  return (
                    <Link
                      key={tg}
                      href={href({ tag: selected ? "" : tg, page: 1 })}
                      className="inline-flex"
                    >
                      <Badge variant={selected ? "default" : "secondary"}>
                        {tg}
                      </Badge>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Список курсов */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => (
              <article
                key={c.slug}
                className="rounded-lg border p-5 transition hover:shadow-sm"
              >
                <h2 className="text-lg font-semibold tracking-tight">
                  <Link
                    href={`/${locale}/courses/${c.slug}`}
                    className="hover:underline"
                  >
                    {c.title}
                  </Link>
                </h2>
                {c.excerpt ? (
                  <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                    {c.excerpt}
                  </p>
                ) : null}
                {c.tags && c.tags.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {c.tags.slice(0, 4).map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : null}
                <div className="mt-4">
                  <Button asChild size="sm">
                    <Link href={`/${locale}/courses/${c.slug}`}>Подробнее</Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* Empty state */}
          {items.length === 0 && (
            <div className="mt-12 rounded-lg border p-8 text-center text-sm text-muted-foreground">
              Нет курсов по заданным параметрам.
            </div>
          )}

          {/* Пагинация */}
          {pager.pages > 1 && (
            <nav
              className="mt-8 flex items-center justify-center gap-2"
              aria-label="Пагинация"
            >
              <Button
                asChild
                variant="outline"
                size="sm"
                disabled={!pager.prev}
              >
                <Link
                  href={href({ page: pager.prev ?? 1 })}
                  aria-disabled={!pager.prev}
                >
                  Назад
                </Link>
              </Button>
              <span className="text-sm text-muted-foreground">
                Стр. {pager.page} / {pager.pages}
              </span>
              <Button
                asChild
                variant="outline"
                size="sm"
                disabled={!pager.next}
              >
                <Link
                  href={href({ page: pager.next ?? pager.page })}
                  aria-disabled={!pager.next}
                >
                  Вперёд
                </Link>
              </Button>
            </nav>
          )}
        </Container>
      </Section>
    </main>
  );
}
