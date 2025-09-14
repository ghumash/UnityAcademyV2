"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";

export interface FAQItem {
  id: number | string;
  question: string;
  answer: React.ReactNode;
  icon?: string;
  iconPosition?: "left" | "right";
}

export interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  title?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
  allowMultiple?: boolean;
  showTimestamp?: boolean;
}

interface AccordionItemProps {
  item: FAQItem;
  itemId: string;
  isOpen: boolean;
  questionClassName?: string;
  answerClassName?: string;
  shouldReduceMotion: boolean | null;
}

const AccordionItemComponent: React.FC<AccordionItemProps> = ({
  item,
  itemId,
  isOpen,
  questionClassName,
  answerClassName,
  shouldReduceMotion,
}) => (
  <Accordion.Item value={itemId} key={item.id} className="mb-2">
    <Accordion.Header>
      <Accordion.Trigger className="flex w-full items-center justify-between gap-x-4">
        <div
          className={cn(
            "relative flex items-center space-x-2 rounded-xl p-2 transition-colors",
            isOpen
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

        <span className={cn("text-muted-foreground", isOpen && "text-primary")}>
          {isOpen ? (
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
        animate={isOpen ? "open" : "collapsed"}
        variants={
          shouldReduceMotion
            ? {
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }
            : {
                open: {
                  opacity: 1,
                  height: "auto",
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                },
                collapsed: {
                  opacity: 0,
                  height: 0,
                  transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
                },
              }
        }
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
);

const FaqAccordionComponent = function FaqAccordion({
  data,
  className,
  title,
  timestamp,
  questionClassName,
  answerClassName,
  allowMultiple = false,
  showTimestamp = false,
}: FaqAccordionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const isItemOpen = (itemId: string) => openItems.includes(itemId);

  return (
    <div className={cn("w-full", className)}>
      {title && <h2 className="text-2xl font-semibold mb-6">{title}</h2>}

      {showTimestamp && timestamp && (
        <div className="mb-4 text-sm text-muted-foreground">{timestamp}</div>
      )}

      {allowMultiple ? (
        <Accordion.Root
          type="multiple"
          value={openItems}
          onValueChange={setOpenItems}
        >
          {data.map((item) => {
            const itemId = item.id.toString();
            const isOpen = isItemOpen(itemId);

            return (
              <AccordionItemComponent
                key={item.id}
                item={item}
                itemId={itemId}
                isOpen={isOpen}
                questionClassName={questionClassName}
                answerClassName={answerClassName}
                shouldReduceMotion={shouldReduceMotion}
              />
            );
          })}
        </Accordion.Root>
      ) : (
        <Accordion.Root
          type="single"
          collapsible
          value={openItems[0] || ""}
          onValueChange={(value: string) => setOpenItems(value ? [value] : [])}
        >
          {data.map((item) => {
            const itemId = item.id.toString();
            const isOpen = isItemOpen(itemId);

            return (
              <AccordionItemComponent
                key={item.id}
                item={item}
                itemId={itemId}
                isOpen={isOpen}
                questionClassName={questionClassName}
                answerClassName={answerClassName}
                shouldReduceMotion={shouldReduceMotion}
              />
            );
          })}
        </Accordion.Root>
      )}
    </div>
  );
}

// Экспортируем обычную версию для внутреннего использования
export { FaqAccordionComponent };

// Lazy export для ленивой загрузки
export const FaqAccordion = React.lazy(() => 
  Promise.resolve({ default: FaqAccordionComponent })
);
