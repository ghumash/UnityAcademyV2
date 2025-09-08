import type { Metadata } from "next";
import {
  JsonLd,
  buildBreadcrumbsJsonLd,
  buildOrganizationJsonLd,
  createMetadata,
} from "@/shared/seo";
import { absoluteUrl } from "@/shared/config";
import { getT, type Locale } from "@/shared/lib/i18n";
import { peopleMock } from "@/entities/person";
import { CtaBanner } from "@/widgets";
import {
  GlowingGrid,
  type GridItemData,
  TeamSection,
  MissionVisionValuesSection,
} from "@/widgets";
import {
  Rocket,
  Briefcase,
  FileText,
  BadgeCheck,
  Mic,
  Users,
  CalendarDays,
} from "lucide-react";
import { TextGenerateEffect, TextHoverEffect } from "@/shared/ui/lib";
import { getCtaBannerConfig } from "@/shared/config/home";
import { Container, Section } from "@/shared/ui/custom";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const { locale } = params;
  const t = await getT(locale);
  const page = await (
    await import("@/shared/content/pages")
  ).getPageBySlugLocale(locale, "about");

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
        էքսկուրսիաներ դեպի տարբեր կազմակերպություններ և ոչ միայն
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
      "Դասընթացի ավարտին դուք կունենաք պրոֆեսիոնալ աշխատանքներ և կօգնենք ստեղծել գրագետ ինքնակենսագրական (CV)՝ արագ մուտք գործելու համար աշխատաշուկա",
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
      "Մենք ունենում ենք հյուրեր հայտնի ընկերություններից, որոնք կիսվում են իրենց փորձով և պատասխանում ձեր հարցերին՝ բարելավելով ձեր գիտելիքները ՏՏ ոլորտում ու կարիերայի հարցերում",
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
      "Հզոր համայնք, որտեղ ուսանողները կրթվում են, ստեղծում նոր կապեր, միասին ուժերով ստեղծում ստարտափեր և ոչ միայն",
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
      <ul className="list-disc space-y-1 pl-4">
        <li>
          «Dayoff» հանդիպումներ — շաբաթական, անվճար և ոչ ֆորմալ
          community-հավաքներ։
        </li>
        <li>
          Համայնքային կապ — բոլոր խմբերի մասնակիցների միավորում՝
          ծանոթություններ, նեթվորքինգ, թիմային շփումներ։
        </li>
        <li>
          Ներքին ակտիվություններ — խաղեր, մտավոր ծրագրեր, թիմային մրցույթներ՝
          ջերմ միջավայրում։
        </li>
        <li>
          Թեմատիկ քննարկումներ — արդիական թեմաներ, փորձի փոխանակում, գաղափարների
          ներկայացում։
        </li>
        <li>
          Արժեքներ և ինքնակրթություն — խոսում ենք արժեքների մասին և ձևավորում
          սովորելու ռազմավարություններ։
        </li>
        <li>
          Նոր նախաձեռնություններ — բրեյնսթորմինգ ու գաղափարների զարգացում
          նախագծերի շուրջ։
        </li>
        <li>
          Արտաքին ակտիվություններ — արշավներ, ճամբարներ, ՏՏ-միջոցառումներ։
        </li>
      </ul>
    ),
  },
];

const title = "Ովքե՞ր ենք մենք";

const description = `Մենք տալիս ենք ավելին, քան պարզապես դասընթացներ.
Մենք համայնք ենք նրանց համար, ովքեր ձգտում են աճել մասնագիտապես,
անձնապես և ճիշտ արժեքներով, ովքեր ցանկանում են զարգացնել իրենց հմտությունները և գտնել կարիերայի հնարավորություններ:`;

const description_2 = `Սա այն վայրն է, որտեղ գիտելիքը վերափոխվում է մասնագիտության,
պրակտիկան դառնում է հաջողության հիմք, իսկ ամուր համայնքը աջակցում է քեզ ամեն քայլափոխի:`;

export default async function AboutPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = await params;
  const t = await getT(locale);

  const ctaBanner = await getCtaBannerConfig(locale);

  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      {/* a11y: реальный h1 + визуальный эффект отдельно */}
      <JsonLd
        id="breadcrumbs-about"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          { name: t("common.navigation.about"), href: `/${locale}/about` },
        ])}
      />
      <JsonLd id="org-jsonld" data={buildOrganizationJsonLd()} />

      <div className="h-[200px] max-w-[735px] mx-auto">
        <TextHoverEffect text="Մեր մասին" as="h1" />
      </div>

      <Section>
        <Container className="space-y-4">
          <TextGenerateEffect
            as="h2"
            duration={2}
            filter={false}
            words={title}
          />
          <TextGenerateEffect
            as="p"
            startDelay={1}
            duration={2}
            filter={false}
            words={description}
            className="text-muted-foreground"
          />
          <TextGenerateEffect
            as="p"
            startDelay={5}
            duration={2}
            filter={false}
            words={description_2}
            className="text-muted-foreground"
          />
        </Container>
      </Section>
      <MissionVisionValuesSection />
      <GlowingGrid
        items={items}
        glow={{ proximity: 64, spread: 80, borderWidth: 3, glow: true }}
      />
      <TeamSection people={peopleMock} />
      <CtaBanner heading={ctaBanner.heading} buttons={ctaBanner.buttons} />
    </main>
  );
}
