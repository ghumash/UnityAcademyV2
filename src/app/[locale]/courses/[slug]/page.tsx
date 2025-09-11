import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { getCoursesConfig, getCourseHeroConfig } from "@/shared/config/courses";
import { IntroHero } from "@/entities/course";
import { ContentSection, GlowingGrid, type GridItemData } from "@/widgets";
import { Rocket, Wrench } from "lucide-react";

const items: GridItemData[] = [
  {
    icon: (
      <Rocket
        className="h-4 w-4 text-black dark:text-neutral-400"
        aria-hidden="true"
      />
    ),
    title: (
      <>
        Անվճար <strong>HR թրեյնինգ</strong>
      </>
    ),
    description: (
      <>
        Թրեյնինգը շրջանավարտներին հնարավորություն կտա ծանոթանալ CV ստեղծելու
        կարևոր կանոններին, հասկանալ՝ ինչպես ճիշտ պատրաստվել և ներկայանալ
        հարցազրույցի և իմանալ բոլոր հուզող հարցերի պատասխանները:
      </>
    ),
  },
  {
    icon: (
      <Rocket
        className="h-4 w-4 text-black dark:text-neutral-400"
        aria-hidden="true"
      />
    ),
    title: (
      <>
        Անգլերեն դասընթաց <strong>հատուկ պայմաններով</strong>
      </>
    ),
    description:
      "Լավագույն ուսանողները կստանան աշխատանքի առաջարկ մեր և/կամ գործընկերների կողմից",
  },
  {
    icon: (
      <Rocket
        className="h-4 w-4 text-black dark:text-neutral-400"
        aria-hidden="true"
      />
    ),
    title: "Պորտֆոլիո և ինքնակենսագրական",
    description:
      "Դասընթացի ավարտին դուք կունենաք պրոֆեսիոնալ աշխատանքներ և կօգնենք ստեղծել գրագետ ինքնակենսագրական (CV)՝ արագ մուտք գործելու համար աշխատաշուկա",
  },
];

const defaultContent = [
  {
    items: [
      {
        icon: <Wrench className="size-5" />,
        title: "Լինել",
        description: "Ուժեղ և ոգեշնչող համայնքի մաս",
      },
    ],
  },
  {
    items: [
      {
        icon: <Wrench className="size-5" />,
        title: "Լինել",
        description: "Ուժեղ և ոգեշնչող համայնքի մաս",
      },
    ],
  },
  {
    items: [
      {
        icon: <Wrench className="size-5" />,
        title: "Լինել",
        description: "Ուժեղ և ոգեշնչող համայնքի մաս",
      },
    ],
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getT(locale);

  return createMetadata({
    title: t(`courses.list.${slug}.title`),
    canonical: absoluteUrl(`/${locale}/courses/${slug}`),
    alternatesPath: `/courses/${slug}`,
    locale,
    description: t(`courses.list.${slug}.description`),
  });
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getT(locale);
  const courseHeroConfig = await getCourseHeroConfig(locale, slug);
  const courses = await getCoursesConfig(locale);

  const courseExists = courses.list.some((course) => course.id === slug);
  if (!courseExists) {
    notFound();
  }

  return (
    <main id="main" className="sm:mt-36 md:mt-40">
      <JsonLd
        id="breadcrumbs-course"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.home"), href: `/${locale}` },
          { name: t("common.navigation.courses"), href: `/${locale}/courses` },
          {
            name: t(`courses.list.${slug}.title`),
            href: `/${locale}/courses/${slug}`,
          },
        ])}
      />

      <IntroHero config={courseHeroConfig} />

      <ContentSection
        blocks={defaultContent}
        gridCols={{ sm: 1, lg: 3 }}
        itemsGridCols={{ sm: 1, lg: 1 }}
        title={{ label: "Դասընթացի պայմանները", className: "text-center" }}
      />

      <GlowingGrid
        title={{
          label: (
            <>
              Սովորելով Unity Academy-ում՝
              <br /> դու կստանաս հետևյալ առավելությունները
            </>
          ),
          className: "text-center",
        }}
        items={items}
        glow={{ proximity: 64, spread: 80, borderWidth: 3, glow: true }}
      />
    </main>
  );
}
