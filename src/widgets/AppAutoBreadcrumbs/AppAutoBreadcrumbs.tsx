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
import { Fragment, useMemo } from "react";
import { cn } from "@/shared/lib/utils";
import { useI18n } from "@/shared/lib/i18n";
import { buildBreadcrumbsJsonLd } from "@/shared/seo";
import { JsonLd } from "@/shared/seo";

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
export function AppAutoBreadcrumb({
  ariaLabel = "Breadcrumb",
  className,
}: AppAutoBreadcrumbProps) {
  const pathname = usePathname();
  const { locale, t } = useI18n();

  const crumbs = useMemo(() => {
    if (!pathname) return [];

    const parts = pathname.split("/").filter(Boolean);

    const segments = parts.slice(1);

    return [
      { name: t("common.navigation.home"), href: `/${locale}` },
      ...segments.map((seg, idx) => {
        const href = "/" + [locale, ...segments.slice(0, idx + 1)].join("/");
        const name = t(`common.navigation.${seg}`) || seg;
        return { name, href };
      }),
    ];
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
}
