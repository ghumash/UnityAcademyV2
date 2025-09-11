import type { Metadata } from "next";
import { Container, Section } from "@/shared/ui/custom";
import { JsonLd, buildBreadcrumbsJsonLd, createMetadata } from "@/shared/seo";
import { absoluteUrl } from "@/shared/config/common";
import { getT, type Locale } from "@/shared/lib/i18n";
import { FaqAccordion, type FAQItem } from "@/widgets";
import { TextHoverEffect } from "@/shared/ui/lib";
import { cn } from "@/shared/lib";

const defaultData: FAQItem[] = [
  {
    question: "Դասընթացները օֆլայ՞ն են, թե օնլայն՞",
    answer:
      "Հիմնական ձևաչափը՝ օֆլայն Վանաձորում։ Օնլայն խմբերը քննարկում ենք անհատապես՝ ըստ հարցման",
    icon: "❤️",
    iconPosition: "right",
    id: 1,
  },
  {
    question: "Որտե՞ղ են անցկացվում դասերը",
    answer:
      "Մեր ուսումնական տարածքում Վանաձորում։ Ճշգրիտ հասցեն ու քարտեզը կգտնես մեր Կապ էջում",
    id: 2,
  },
  {
    question: "Ինչպե՞ս է կազմվում գրաֆիկը",
    answer:
      "Գրաֆիկը ձևավորում ենք այնպես, որ հարմար լինի ուսման/աշխատանքի հետ համադրելն ու հարմար լինի բոլոր ուսանողներին",
    id: 3,
  },
  {
    question: "Քանի՞ հոգի է խմբում",
    answer:
      "Հավաքում ենք փոքր խմբեր, որպեսզի բոլորն ունենան բավարար ուշադրություն և պրակտիկա",
    icon: "⭐",
    iconPosition: "left",
    id: 4,
  },
  {
    question: "Պարտադի՞ր է ունենալ սեփական նոութբուք",
    answer:
      "Պարտադիր չէ, մեր ակադեմիան տրամադրում է ուսման համար անհրաժեշտ սարքավորումները, բայց ցանկության դեպքում կարող ես սովորել քո նոութբուքով",
    id: 5,
  },
  {
    question: "Կա՞ն փորձնական դասեր",
    answer:
      "Այո, ժամանակ առ ժամանակ կազմակերպում ենք բաց դասեր/օրեր և հանդիպումներ։ Հետևիր հայտարարություններին կամ գրիր մեզ՝ կասենք մոտակա ամսաթվերը",
    id: 6,
  },
  {
    question: "Կա՞ տնային հանձնարարություն",
    answer:
      "Այո, Տնայինը օգնում է ամրացնել նյութը։ Տալիս ենք հստակ չափորոշիչներ և հետադարձ կապ",
    id: 7,
  },
  {
    question: "Եթե բաց թողնեմ դասը, ի՞նչ կլինի",
    answer:
      "Կստանաս նյութեր, առաջադրանքներ և խորհուրդներ։ Հնարավորության դեպքում կառաջարկենք այլ հավելյալ դասընթացի ժամ",
    id: 8,
  },
  {
    question: "Նյութերը հասանելի՞ են դասընթացից հետո",
    answer:
      "Այո, հիմնական նյութերը մնում են ուսանողին։ Լրացուցիչ կկիսվենք օգտակար ռեսուրսներով ու ուղեցույցներով",
    id: 9,
  },
  {
    question: "Անգլերենի իմացությունը պարտադի՞ր է",
    answer:
      "Հիմքային անգլերենը օգտակար է, բայց մեկնարկին պարտադիր չէ։ Ժամանակի ընթացքում կօգնենք զարգացնել Tech English-ը",
    id: 10,
  },
  {
    question: "Կլինե՞ն սերտիֆիկատներ",
    answer:
      "Այո, Դասընթացի ավարտին տալիս ենք սերտիֆիկատ, նախատեսված է նաև թվային վերիֆիկացիա",
    id: 11,
  },
  {
    question: "Օգնում ե՞ք աշխատանք գտնելու հարցում",
    answer:
      "Այո, Ուղեկցում ենք մինչև աշխատանքի ընդունվելը՝ օգնում ենք պորտֆոլիոյով, անցկացնում ենք կարիերային սեսիաներ, իսկ լավագույններին խորհուրդ ենք տալիս գործընկեր ընկերություններին կամ ընդունում ենք մեզ մոտ",
    id: 12,
  },
  {
    question: "Կարո՞ղ եմ միանալ, եթե 30-ից մեծ եմ",
    answer:
      "Հիմնական ուշադրությունը 9–30 տարիքայինն է, բայց երբեմն բացում ենք առանձին խմբեր մեծահասակների համար։ Գրիր մեզ՝ կասենք հասանելի տարբերակները։",
    id: 13,
  },
  {
    question: "Լուսանկար/վիդեո նկարո՞ւմ եք դասերի ընթացքում",
    answer:
      "Երբեմն՝ սոցիալական ցանցերի և հաշվետվությունների համար։ Միշտ հարգում ենք գաղտնիությունը և հաշվի ենք առնում ուսանողների/ծնողների ցանկությունները",
    id: 14,
  },
  {
    question: "Հնարավո՞ր է վերադարձ կամ «սառեցում»",
    answer:
      "Հարգելի պատճառների դեպքում քննարկում ենք ուսման սառեցումը։ Պայմանները՝ քննարկվում են անհատապես։",
    id: 15,
  },
  {
    question: "Ինչպե՞ս դառնալ դասախոս կամ մենթոր",
    answer:
      "Բաց ենք համագործակցության համար։ Ուղարկիր ռեզյումեն ու պորտֆոլիոն unityacademyarmenia@gmail.com հասցեին",
    id: 16,
  },
  {
    question: "Սա կրոնակա՞ն ակադեմիա է",
    answer:
      "Ուսուցումը կառուցում ենք մարդկայնության, հարգանքի և ճիշտ արժեքների վրա։ Բաց ենք բոլորի համար, համոզմունքներ չենք պարտադրում",
    id: 17,
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getT(locale);
  return createMetadata({
    title: t("common.navigation.faq"),
    canonical: absoluteUrl(`/${locale}/faq`),
    alternatesPath: "/faq",
    locale,
    description: t("common.navigation.faq"),
  });
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getT(locale);

  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      <JsonLd
        id="breadcrumbs-contacts"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.home"), href: `/${locale}` },
          {
            name: t("common.navigation.faq"),
            href: `/${locale}/faq`,
          },
        ])}
      />
      <Container>
        <TextHoverEffect text="Հաճախ տրվող հարցեր" as="h1" />
      </Container>
      <Section>
        <Container className="max-w-2xl">
          <FaqAccordion data={defaultData} />
        </Container>
      </Section>
    </main>
  );
}
