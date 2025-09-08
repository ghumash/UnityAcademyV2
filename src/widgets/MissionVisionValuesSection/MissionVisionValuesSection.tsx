"use client";

import {
  HeartHandshake,
  Sparkles,
  Target,
  Eye,
  Users,
  ShieldCheck,
  GraduationCap,
  LifeBuoy,
  Search,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { Container, Section } from "@/shared/ui/custom";
import type { ReactNode } from "react";

type Item = {
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title?: string;
  description?: ReactNode;
};

interface BlockData {
  title: string;
  items: Item[];
}

interface MissionVisionValuesProps {
  className?: string;
  mission?: BlockData;
  vision?: BlockData;
  values?: BlockData;
}

const defaultContent: Required<Omit<MissionVisionValuesProps, "className">> = {
  mission: {
    title: "Մեր առաքելությունը",
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
  vision: {
    title: "Մեր տեսլականը",
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
        icon: GraduationCap,
        title: "Սովորել",
        description: "Արդիական տեխնոլոգիաներ",
      },
      {
        icon: LifeBuoy,
        title: "Ստանալ",
        description: "Աջակցություն կարիերայի ճանապարհին",
      },
      {
        icon: Users,
        title: "Համայնք",
        description: "Մենք միասին ենք, և դա մեր ուժն է",
      },
      {
        icon: Search,
        title: "Գտնել",
        description: "Համախոհներ ու ընկերներ",
      },
      {
        icon: Sparkles,
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
  values: {
    title: "Մեր արժեքները",
    items: [
      {
        icon: HeartHandshake,
        title: "Մարդկայնություն",
        description:
          "Ջերմություն, հարգանք ու աջակցություն՝ յուրաքանչյուր շփման մեջ",
      },
      {
        icon: Wrench,
        title: "Պրակտիկա",
        description:
          "Սովորեցնում ենք այն, ինչը իրականում աշխատում է և այսօր պահանջված է",
      },
      {
        icon: TrendingUp,
        title: "Զարգացում",
        description: "Քայլ առ քայլ՝ դեպի պրոֆեսիոնալիզմ ու հասունություն",
      },
      {
        icon: Users,
        title: "Համայնք",
        description: "Մենք միասին ենք, և դա մեր ուժն է",
      },
      {
        icon: ShieldCheck,
        title: "Ճիշտ արժեքներ",
        description: "Ներսի ուղենիշներ, որոնք օգնում են մնալ ամբողջական",
      },
    ],
  },
};

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <li
            key={i}
            className="
              group relative flex  items-start
              overflow-hidden rounded-2xl border border-white/10
              p-3 shadow-2xl backdrop-blur-xl transition
              hover:border-white/25 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]
              flex-col items-center
            "
          >
            <div className="absolute inset-0 z-0 overflow-hidden">
              <div className="absolute inset-0 from-white/5 to-white/10 opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-3xl opacity-30 group-hover:opacity-50 transform group-hover:scale-110 transition-all duration-700" />
              <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-white/5 blur-xl opacity-0 group-hover:opacity-60 group-hover:scale-125 transition duration-700 ease-out" />
              <div className="absolute bottom-16 right-16 w-12 h-12 rounded-full bg-white/5 blur-lg opacity-0 group-hover:opacity-50 group-hover:scale-125 transition duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000 ease-out" />
            </div>

            <div className="flex items-center gap-2">
              {Icon && (
                <div className="transform group-hover:rotate-180 transition-transform duration-700">
                  <Icon
                    className="mt-0.5 size-5 text-primary"
                    aria-hidden="true"
                  />
                </div>
              )}
              {item.title && (
                <p className="text-md font-medium">{item.title}</p>
              )}
            </div>
            <div>
              {item.description && (
                <p className="text-sm leading-6 text-foreground/80">
                  {item.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export const MissionVisionValuesSection = ({
  className,
  mission,
  vision,
  values,
}: MissionVisionValuesProps) => {
  const data = {
    mission: { ...defaultContent.mission, ...mission },
    vision: { ...defaultContent.vision, ...vision },
    values: { ...defaultContent.values, ...values },
  };

  return (
    <Section
      as="section"
      aria-label="Mission, Vision & Values"
      className={className}
    >
      <Container>
        {/* карточка */}
        <div className="relative z-10 rounded-2xl border bg-background/80 shadow-md backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {/* бейдж по центру */}
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 rounded-md border bg-card px-2.5 py-1 text-[10px] text-card-foreground shadow-sm sm:text-xs">
            <div className="flex items-center gap-1.5">
              <Sparkles className="size-3" aria-hidden="true" />
              <span>Նպատակաուղղված կրթություն</span>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-3 lg:gap-10">
            {/* Mission */}
            <article
              aria-labelledby="mvv-mission"
              className="space-y-3 sm:col-span-2 lg:col-span-1"
            >
              <header className="flex items-center gap-2">
                <Target className="size-4 text-primary" aria-hidden="true" />
                <h2 id="mvv-mission" className="text-base font-semibold">
                  {data.mission.title}
                </h2>
              </header>
              <ItemList items={data.mission.items} />
            </article>

            {/* Vision */}
            <article
              aria-labelledby="mvv-vision"
              className="space-y-3 sm:col-span-2 lg:col-span-1"
            >
              <header className="flex items-center gap-2">
                <Eye className="size-4 text-primary" aria-hidden="true" />
                <h2 id="mvv-vision" className="text-base font-semibold">
                  {data.vision.title}
                </h2>
              </header>
              <ItemList items={data.vision.items} />
            </article>

            {/* Values */}
            <article
              aria-labelledby="mvv-values"
              className="space-y-3 sm:col-span-2 lg:col-span-1"
            >
              <header className="flex items-center gap-2">
                <HeartHandshake
                  className="size-4 text-primary"
                  aria-hidden="true"
                />
                <h2 id="mvv-values" className="text-base font-semibold">
                  {data.values.title}
                </h2>
              </header>
              <ItemList items={data.values.items} />
            </article>
          </div>
        </div>
      </Container>
    </Section>
  );
};
