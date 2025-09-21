import { getDictionary, type Locale } from "@/shared/lib/i18n";
import { siteConfig } from "@/shared/config/common";
import type { FAQItem } from "@/shared/ui/custom";

export async function getFaqConfig(locale: Locale) {
  const dict = await getDictionary(locale);
  const faqData = dict.faq;

  // Генерируем ID автоматически на основе индекса и подставляем email из siteConfig
  const faqItems: FAQItem[] = faqData.items.map((item, index) => ({
    id: `faq-${index + 1}`,
    question: item.question,
    answer: item.answer.replace('{{email}}', siteConfig.contacts.email),
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
