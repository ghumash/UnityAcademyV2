"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/shared/ui";
import { cn } from "@/shared/lib/utils";
import { Fragment, memo, useMemo } from "react";

type Crumb = Readonly<{
  label: string;
  href?: string;
}>;

export interface AppBreadcrumbProps {
  items: readonly Crumb[];
  ariaLabel?: string;
  className?: string;
}

export const AppBreadcrumb = memo(function AppBreadcrumb({
  items,
  ariaLabel = "Breadcrumb",
  className,
}: AppBreadcrumbProps) {
  const { locale } = useParams<{ locale: string }>();

  const crumbs = useMemo(() => items, [items, locale]);

  return (
    <Breadcrumb aria-label={ariaLabel} className={cn(className)}>
      <BreadcrumbList>
        {crumbs.map((crumb, idx) => {
          const isLast = idx === crumbs.length - 1;

          return (
            <Fragment key={`${crumb.label}-${idx}`}>
              <BreadcrumbItem>
                {crumb.href && !isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
});
