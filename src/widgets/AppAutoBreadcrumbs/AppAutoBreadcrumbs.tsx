"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui";
import { Fragment, memo, useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import { useI18n } from "@/shared/lib/i18n";
import { buildBreadcrumbsJsonLd } from "@/shared/lib/seo";
import { JsonLd } from "@/shared/lib/seo";

export interface AppAutoBreadcrumbProps {
  ariaLabel?: string;
  className?: string;
}

/**
 * Автоматический Breadcrumb:
 * - строит крошки из текущего URL
 * - подписи берёт из словаря (common.nav.*)
 * - в <head> добавляет JSON-LD для SEO
 */
export const AppAutoBreadcrumb = memo(({
  ariaLabel = "Breadcrumb",
  className,
}: AppAutoBreadcrumbProps) => {
  const pathname = usePathname();
  const { locale, t } = useI18n();

  const crumbs = useMemo(() => {
    if (!pathname) return [];

    const parts = pathname.split("/").filter(Boolean);

    const segments = parts.slice(1);

    // Базовые крошки из сегментов URL
    const base = [
      { name: t("common.navigation.home"), href: `/${locale}` },
      ...segments.map((seg, idx) => {
        const href = "/" + [locale, ...segments.slice(0, idx + 1)].join("/");
        const name = t(`common.navigation.${seg}`) || seg;
        return { name, href };
      }),
    ];

    // Универсальная обработка динамических страниц
    const updatePageTitle = (section: string, pathTemplate: string) => {
      if (segments[0] === section && segments.length >= 2) {
        const slug = segments[1];
        const directPath = pathTemplate.replace("{slug}", slug);
        const altPath = pathTemplate.replace("{slug}", slug.replace(/-/g, "_"));

        let title = t(directPath);
        if (title === directPath) {
          const alt = t(altPath);
          title = alt !== altPath ? alt : 
            slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
        }

        const detailHref = `/${locale}/${section}/${slug}`;
        const targetIndex = base.findIndex((c) => c.href === detailHref);
        if (targetIndex !== -1) {
          base[targetIndex] = { ...base[targetIndex], name: title };
        }
      }
    };

    updatePageTitle("courses", "courses.{slug}.title");
    updatePageTitle("events", "events.list.{slug}.eventHeroSection.title");

    return base;
  }, [pathname, locale, t]);

  return (
    <>
      <Breadcrumb aria-label={ariaLabel} className={cn(className)}>
        <BreadcrumbList>
          {crumbs.map((crumb, idx) => {
            const isLast = idx === crumbs.length - 1;
            return (
              <Fragment key={crumb.href}>
                <BreadcrumbItem>
                  {!isLast ? (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.name}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>

      {/* SEO JSON-LD */}
      <JsonLd id="breadcrumbs" data={buildBreadcrumbsJsonLd(crumbs)} />
    </>
  );
});
