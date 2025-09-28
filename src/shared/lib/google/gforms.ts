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
  },
  apply: {
    formId: process.env.NEXT_PUBLIC_GFORM_APPLY_ID, // "1FAIpQLS_replace_me"
    entries: {
      fullname: "entry.2005620554",
      birthday: "entry.462508876",
      phone: "entry.1166974658",
      telegram: "entry.571806996",
      course: "entry.839337160",
    },
  },
  eventRegister: {
    formId: process.env.NEXT_PUBLIC_GFORM_EVENT_REGISTER_ID, // "1FAIpQLS_replace_me"
    entries: {
      fullname: "entry.2005620554",
      birthday: "entry.462508876",
      phone: "entry.1166974658",
      event: "entry.839337160",
    },
  },
} as const;

export type FeedbackEntries = typeof gforms.feedback.entries;
export type ApplyEntries = typeof gforms.apply.entries;
