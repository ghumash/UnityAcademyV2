"use client";

import { createFeedbackSchema } from "@/features/feedback";
import { SmartForm } from "@/shared/ui/custom";
import type { FormsDict } from "@/shared/lib/i18n";

interface FeedbackFormProps {
  config: FormsDict;
}

export const FeedbackForm = ({ config }: FeedbackFormProps) => {
  const { feedbackForm, validation } = config;
  const schema = createFeedbackSchema(validation);
  return (
    <SmartForm
      schema={schema}
      action="/api/forms/feedback"
      buttonLabel={feedbackForm.buttonLabel}
      successText={feedbackForm.successText}
      errorText={feedbackForm.errorText}
      fields={[
        {
          name: "name",
          placeholder: feedbackForm.name,
          autoComplete: "given-name",
          col: "half",
          type: "text",
        },
        {
          name: "surname",
          placeholder: feedbackForm.surname,
          autoComplete: "family-name",
          col: "half",
          type: "text",
        },
        {
          name: "email",
          placeholder: feedbackForm.email,
          autoComplete: "email",
          type: "email",
        },
        {
          name: "message",
          placeholder: feedbackForm.message,
          type: "textarea",
        },
      ]}
      defaults={{
        name: "",
        surname: "",
        email: "",
        message: "",
      }}
      transform={(v: any) => ({
        name: v.name.trim(),
        surname: v.surname.trim(),
        email: v.email.trim(),
        message: v.message.trim(),
      })}
    />
  );
};
