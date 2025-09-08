"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Section, Container } from "@/shared/ui/custom";

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

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: string;
  iconPosition?: "left" | "right";
}

interface FaqAccordionProps {
  data?: FAQItem[];
  className?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export function FaqAccordion({
  data = defaultData,
  className,
  timestamp = "Ամեն օր, 10:01",
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  return (
    <Section as="div">
      <Container className="flex items-center justify-center">
        <div>
          {timestamp && (
            <div className="mb-4 text-sm text-muted-foreground">
              {timestamp}
            </div>
          )}

          <Accordion.Root
            type="single"
            collapsible
            value={openItem || ""}
            onValueChange={(value) => setOpenItem(value)}
          >
            {data.map((item) => (
              <Accordion.Item
                value={item.id.toString()}
                key={item.id}
                className="mb-2"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="flex w-full items-center justify-between gap-x-4">
                    <div
                      className={cn(
                        "relative flex items-center space-x-2 rounded-xl p-2 transition-colors",
                        openItem === item.id.toString()
                          ? "bg-primary/20 text-primary"
                          : "bg-muted hover:bg-primary/10",
                        questionClassName
                      )}
                    >
                      {item.icon && (
                        <span
                          className={cn(
                            "absolute bottom-6",
                            item.iconPosition === "right" ? "right-0" : "left-0"
                          )}
                          style={{
                            transform:
                              item.iconPosition === "right"
                                ? "rotate(7deg)"
                                : "rotate(-4deg)",
                          }}
                        >
                          {item.icon}
                        </span>
                      )}
                      <span className="font-medium text-left">{item.question}</span>
                    </div>

                    <span
                      className={cn(
                        "text-muted-foreground",
                        openItem === item.id.toString() && "text-primary"
                      )}
                    >
                      {openItem === item.id.toString() ? (
                        <Minus className="h-5 w-5" />
                      ) : (
                        <Plus className="h-5 w-5" />
                      )}
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content asChild forceMount>
                  <motion.div
                    initial="collapsed"
                    animate={
                      openItem === item.id.toString() ? "open" : "collapsed"
                    }
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-7 mt-1 md:ml-16">
                      <div
                        className={cn(
                          "relative max-w-xl rounded-2xl bg-primary px-4 py-2 text-primary-foreground",
                          answerClassName
                        )}
                      >
                        {item.answer}
                      </div>
                    </div>
                  </motion.div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </Container>
    </Section>
  );
}
