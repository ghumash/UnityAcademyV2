import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { getCoursesConfig, getCourseHeroConfig } from "@/shared/config/courses";
import { IntroHero } from "@/entities/course";
import {
  CallToAction,
  ContentSection,
  CourseTopics,
  CtaBanner,
  FaqAccordion,
  GlowingGrid,
  UserCard,
  type FAQItem,
  type GridItemData,
  type UserCardData,
} from "@/widgets";
import { Rocket, Wrench } from "lucide-react";
import { Container, Section } from "@/shared/ui/custom";
import { cn } from "@/shared/lib";
import { ApplyForm } from "@/features/apply";

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

const mockUserData: UserCardData = {
  name: "Анна Петрова",
  role: "Senior Frontend Developer",
  avatarUrl:
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  bio: "Опытный фронтенд-разработчик с 5+ годами опыта в создании современных веб-приложений. Специализируюсь на React, TypeScript и производительности.",
  experience: [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      period: "2022 - настоящее время",
      summary:
        "Руководство командой из 4 разработчиков, архитектура и разработка крупномасштабных React приложений, внедрение лучших практик и code review.",
    },
    {
      title: "Frontend Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      summary:
        "Разработка пользовательских интерфейсов для SaaS платформы, оптимизация производительности, интеграция с REST API и GraphQL.",
    },
    {
      title: "Junior Frontend Developer",
      company: "WebStudio",
      period: "2019 - 2020",
      summary:
        "Создание адаптивных веб-сайтов, изучение современных фреймворков, участие в командной разработке и code review процессах.",
    },
  ],
  socials: {
    github: "https://github.com/annapetrov",
    linkedin: "https://linkedin.com/in/annapetrov",
    x: "https://x.com/annapetrov",
    website: "https://annapetrov.dev",
  },
};

const webDevelopmentData = {
  title: "Full Stack Web Development",
  topics: [
    "HTML5 semantic markup",
    "CSS3 advanced styling",
    "JavaScript ES6+ features",
    "React component architecture",
    "TypeScript fundamentals",
    "Node.js backend development",
    "Express.js API creation",
    "MongoDB database design",
    "Authentication & authorization",
    "Deployment strategies",
    "Testing methodologies",
    "Performance optimization",
  ],
};

const ctaBanner = {
  heading: "Քեզ անհանգստացնող հարցերի պաստախանները",
  buttons: {
    primary: {
      text: "Անցնել հղումով",
      url: "/faq",
    },
  },
};

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

      <Section>
        <Container className="flex flex-row gap-8">
          <CourseTopics
            title="Դասընթացի թեմաները"
            topics={webDevelopmentData.topics}
          />
          <UserCard data={mockUserData} />
        </Container>
      </Section>

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
      <Section id="graphic-design-form">
        <Container>
          <CallToAction
            title="Գրաֆիկ դիզայն: Գրանցման հայտ"
            subtitle="Միացիր ապագա ստեղծագործների խմբին"
            activeTagId="graphic"
          >
            <ApplyForm defaultCourse="Գրաֆիկ դիզայն" />
          </CallToAction>
        </Container>
      </Section>
      <CtaBanner heading={ctaBanner.heading} buttons={ctaBanner.buttons} />
    </main>
  );
}
