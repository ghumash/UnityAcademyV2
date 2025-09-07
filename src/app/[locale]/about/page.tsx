import type { Metadata } from "next";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, type Locale } from "@/shared/lib/i18n";
import { peopleMock } from "@/entities/person";
import { GlowingGrid, type GridItemData, TeamSection } from "@/widgets";
import {
  Rocket,
  Briefcase,
  FileText,
  BadgeCheck,
  Mic,
  Users,
  CalendarDays,
} from "lucide-react";
import { getPageBySlugLocale } from "@/shared/content/pages";
import { TextGenerateEffect, TextHoverEffect } from "@/shared/ui/lib";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "about");

  return createMetadata({
    title: page?.title ?? t("common.navigation.about"),
    canonical: absoluteUrl(`/${locale}/about`),
    alternatesPath: "/about",
    locale,
    description: page?.description ?? t("common.navigation.about"),
  });
}

const items: GridItemData[] = [
  {
    icon: (
      <Rocket
        className="h-4 w-4 text-black dark:text-neutral-400"
        aria-hidden="true"
      />
    ),
    title: "Ժամանակակից պահանջված ուղղություններ",
    description: (
      <>
        AI, Kids Coding, Mobile Development, Web Development, Graphic Design,
        UI/UX Design, SMM, HR, դասընթացների ընթացքում նաև կազմակերպում ենք
        էքսկուրսիաներ դեպր տարբեր կազմակերպություններ և ոչ միայն
      </>
    ),
  },
  {
    icon: (
      <Briefcase
        className="h-4 w-4 text-black dark:text-neutral-400"
        aria-hidden="true"
      />
    ),
    title: "Կարիերա",
    description:
      "Լավագույն ուսանողները կստանան աշխատանքի առաջարկ մեր և/կամ գործընկերների կողմից",
  },
  {
    icon: (
      <FileText
        className="h-4 w-4 text-black dark:text-neutral-400"
        aria-hidden="true"
      />
    ),
    title: "Պորտֆոլիո և ինքնակենսագրական",
    description:
      "Դասընթացի ավարտին դուք կունենաք պրոֆեսիոնալ աշատանքներ և կոգնենք ստեղծել գրագետ ինքնակենսագրական (CV) և այս ամենը կոգնի քեզ քո տեղը արագ գտնել աշխատաշուկայում",
  },
  {
    icon: (
      <BadgeCheck
        className="h-4 w-4 text-black dark:text-neutral-400"
        aria-hidden="true"
      />
    ),
    title: "Սերտիֆիկացում և թվային վավերացում",
    description:
      "Դասընթացի հաջող ավարտից հետո ստանում եք Unity Academy Armenia-ի անվանական սերտիֆիկատ՝ թվային վավերացումով (QR/հղում)։ Այն կարող եք ավելացնել LinkedIn-ում և կցել CV-ին։ Գնահատումը հիմնվում է ներկայության, տնայինների և եզրափակիչ նախագծի վրա։",
  },
  {
    icon: (
      <Mic
        className="h-4 w-4 text-black dark:text-neutral-400"
        aria-hidden="true"
      />
    ),
    title: "Սեմինարներ",
    description:
      "Մենք ունենում ենք հյուրեր հայտնի ընկերություններից, որոնք կիսվում են իրենց փորձով և պատասխանում ձեզ հետաքրքրող հարցերին, բարելավելով ձեր գիտելիքները ՏՏ ոլորտում և աշխատանքի հարցում",
  },
  {
    icon: (
      <Users
        className="h-4 w-4 text-black dark:text-neutral-400"
        aria-hidden="true"
      />
    ),
    title: "Համայնք",
    description:
      "Հզոր համայնք, որտեղ ուսանողները կրթվում են ստեղծում են նոր կապեր, միասին ուժերով ստեղծում նոր ստարտափեր և ոչ միայն",
  },

  {
    icon: (
      <CalendarDays
        className="h-4 w-4 text-black dark:text-neutral-400"
        aria-hidden="true"
      />
    ),
    title: "Dayoff",
    description: (
      <>
        <ul>
          <li>
            «Dayoff» հանդիպումներ — շաբաթական, անվճար և ոչ ֆորմալ
            community-հավաքներ։
          </li>
          <li>
            Համայնքային կապ — միավորում ենք բոլոր խմբերի մասնակիցներին՝
            ծանոթություններ, նեթվորքինգ, թիմային շփումներ։
          </li>
          <li>
            Ներքին ակտիվություններ — ժամանցային խաղեր, մտավոր ծրագրեր ու թիմային
            մրցույթներ՝ ջերմ ու հարմարավետ միջավայրում։
          </li>
          <li>
            Թեմատիկ քննարկումներ — ՏՏ ոլորտի արդիական թեմաներ, փորձի փոխանակում,
            գաղափարների ներկայացում։
          </li>
          <li>
            Արժեքներ և ինքնակրթություն — խոսում ենք մարդկային արժեքների մասին և
            ձևավորում արդյունավետ սովորելու ռազմավարություններ։
          </li>
          <li>
            Նոր նախաձեռնություններ — բրեյնսթորմինգ ու գաղափարների զարգացում
            նախագծերի շուրջ։
          </li>
          <li>
            Արտաքին ակտիվություններ — արշավներ, ճամբարներ և մասնակցություն
            ՏՏ-միջոցառումներին։
          </li>
        </ul>
      </>
    ),
  },
];

const title = "Ովքե՞ր ենք մենք";

const description = `Մենք տալիս ենք ավելին, քան պարզապես դասընթացներ.
Մենք համայնք ենք նրանց համար, ովքեր ձգտում են աճել մասնագիտապես,
անձնապես և ճիշտ արժեքներով, ովքեր ցանկանում են զարգացնել իրենց հմտությունները և գտնել կարիերայի հնարավորություններ:`;

const description_2 = `Սա այն վայրն է, որտեղ գիտելիքը վերածվում է մասնագիտության,
 պրակտիկան դառնում է հաջողության հիմք, իսկ ամուր համայնքը աջակցում է քեզ ամեն քայլափոխի:`;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);
  const page = await getPageBySlugLocale(locale, "about");

  return (
    <main id="main" className="sm:mt-20 md:mt-29">
      <JsonLd
        id="breadcrumbs-about"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          {
            name: t("common.navigation.about"),
            href: `/${locale}/about`,
          },
        ])}
      />
      <div className="flex items-center justify-center h-[300px] bg-neutral-100 dark:bg-neutral-900">
        <TextHoverEffect text="Մեր մասին" />
      </div>
      <TextGenerateEffect as="h2" duration={2} filter={false} words={title} />
      <TextGenerateEffect
        as="h2"
        duration={2}
        filter={false}
        words={description}
      />
      <TextGenerateEffect
        as="h2"
        duration={2}
        filter={false}
        words={description_2}
      />
      <GlowingGrid
        items={items}
        glow={{ proximity: 64, spread: 80, borderWidth: 3, glow: true }}
      />
      <TeamSection people={peopleMock} />
    </main>
  );
}
