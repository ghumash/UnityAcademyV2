import { getDictionary, type Locale } from "@/shared/lib/i18n";
import type { FAQItem } from "@/widgets";

export async function getFaqConfig(locale: Locale) {
  const dict = await getDictionary(locale);
  const faqData = dict.faq;

  // Генерируем ID автоматически на основе индекса
  const faqItems: FAQItem[] = faqData.items.map((item, index) => ({
    id: `faq-${index + 1}`,
    question: item.question,
    answer: item.answer,
    icon: item.icon,
    iconPosition: item.iconPosition,
  }));

  return {
    page: {
      title: faqData.page.title,
      description: faqData.page.description,
    },
    items: faqItems,
  };
}
