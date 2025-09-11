import type { Metadata } from "next";
import {
  JsonLd,
  buildBreadcrumbsJsonLd,
  buildOrganizationJsonLd,
  createMetadata,
} from "@/shared/seo";
import { absoluteUrl } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { peopleMock } from "@/entities/person";
import { CtaBanner } from "@/widgets";
import {
  GlowingGrid,
  type GridItemData,
  TeamSection,
  ContentSection,
} from "@/widgets";
import {
  HeartHandshake,
  Sparkles,
  Users,
  ShieldCheck,
  GraduationCap,
  LifeBuoy,
  Search,
  TrendingUp,
  Wrench,
  Target,
  Eye,
  Rocket,
  Briefcase,
  FileText,
  BadgeCheck,
  Mic,
  CalendarDays,
} from "lucide-react";
import { TextGenerateEffect, TextHoverEffect } from "@/shared/ui/lib";
import { getCtaBannerConfig } from "@/shared/config/home";
import { Container, Section } from "@/shared/ui/custom";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  return createMetadata({
    title: t("common.navigation.about"),
    canonical: absoluteUrl(`/${locale}/about`),
    alternatesPath: "/about",
    locale,
    description: t("common.navigation.about"),
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

const defaultContent = [
  {
    title: "Մեր առաքելությունը",
    headerIcon: <Target className="size-4" />,
    items: [
      {
        description: (
          <>
            Ստեղծում ենք համայնք, որտեղ երիտասարդները սովորում են ոչ միայն
            տեխնոլոգիաներ, այլև <strong>ապրել ճիշտ արժեքներով։</strong>
          </>
        ),
      },
      {
        description: (
          <>
            Օգնում ենք դեռահասներին ու երիտասարդներին{" "}
            <strong>բացել իրենց ներուժը՝</strong> ՏՏ կրթության, պրակտիկայի և
            մենթորինգի միջոցով։
          </>
        ),
      },
      {
        description: (
          <>
            Ուղեկցում ենք ուսանողներին, որպեսզի դառնան{" "}
            <strong>վստահ մասնագետներ</strong> ու
            <strong>ուժեղ անձնավորություններ</strong>։
          </>
        ),
      },
    ],
  },
  {
    title: "Մեր տեսլականը",
    headerIcon: <Eye className="size-4" />,
    items: [
      {
        description: (
          <>
            Մենք տեսնում ենք ապագա, որտեղ յուրաքանչյուր երիտասարդը Հայաստանում
            ու դրա սահմաններից դուրս կարող է՝
          </>
        ),
      },
      {
        icon: <GraduationCap className="size-5" />,
        title: "Սովորել",
        description: "Արդիական տեխնոլոգիաներ",
      },
      {
        icon: <LifeBuoy className="size-5" />,
        title: "Ստանալ",
        description: "Աջակցություն կարիերայի ճանապարհին",
      },
      {
        icon: <Users className="size-5" />,
        title: "Համայնք",
        description: "Մենք միասին ենք, և դա մեր ուժն է",
      },
      {
        icon: <Search className="size-5" />,
        title: "Գտնել",
        description: "Համախոհներ ու ընկերներ",
      },
      {
        icon: <Sparkles className="size-5" />,
        title: "Լինել",
        description: "Ուժեղ և ոգեշնչող համայնքի մաս",
      },
      {
        description: (
          <>
            Մենք նպատակ ունենք դառնալ ՏՏ մուտքի կետ և անձնային աճի հարթակ, որը
            միավորում է գիտելիքը, ճիշտ արժեքները և պրակտիկան։
          </>
        ),
      },
    ],
  },
  {
    title: "Մեր արժեքները",
    headerIcon: <HeartHandshake className="size-4" />,
    items: [
      {
        icon: <HeartHandshake className="size-5" />,
        title: "Մարդկայնություն",
        description:
          "Ջերմություն, հարգանք ու աջակցություն՝ յուրաքանչյուր շփման մեջ",
      },
      {
        icon: <Wrench className="size-5" />,
        title: "Պրակտիկա",
        description:
          "Սովորեցնում ենք այն, ինչը իրականում աշխատում է և այսօր պահանջված է",
      },
      {
        icon: <TrendingUp className="size-5" />,
        title: "Զարգացում",
        description: "Քայլ առ քայլ՝ դեպի պրոֆեսիոնալիզմ ու հասունություն",
      },
      {
        icon: <Users className="size-5" />,
        title: "Համայնք",
        description: "Մենք միասին ենք, և դա մեր ուժն է",
      },
      {
        icon: <ShieldCheck className="size-5" />,
        title: "Ճիշտ արժեքներ",
        description: "Ներսի ուղենիշներ, որոնք օգնում են մնալ ամբողջական",
      },
    ],
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

      <Container className="h-[200px]">
        <TextHoverEffect text="Մեր մասին" as="h1" />
      </Container>

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
      <ContentSection
        blocks={defaultContent}
        gridCols={{ sm: 1, lg: 3 }}
        badge={{
          icon: <Sparkles className="size-3" />,
          text: "Նպատակաուղղված կրթություն",
        }}
      />
      <GlowingGrid
        items={items}
        glow={{ proximity: 64, spread: 80, borderWidth: 3, glow: true }}
      />
      <TeamSection people={peopleMock} />
      <CtaBanner heading={ctaBanner.heading} buttons={ctaBanner.buttons} />
    </main>
  );
}
