// Общая конфигурация для нескольких форм Google.
// Замените FORM_ID и entry.* на ваши реальные значения
// (см. инструкции ниже).

export const gforms = {
  feedback: {
    formId: process.env.NEXT_PUBLIC_GFORM_FEEDBACK_ID, // "1FAIpQLS_replace_me"
    entries: {
      name: "entry.2005620554",
      surname: "entry.945174924",
      email: "entry.741495044",
      message: "entry.839337160",
    },
    // Необязательно: URL страницы "Спасибо" (если хотите сверять редирект)
    thanksUrl: process.env.NEXT_PUBLIC_GFORM_FEEDBACK_THANKS_URL || undefined,
  },
} as const;

export type FeedbackEntries = typeof gforms.feedback.entries;
