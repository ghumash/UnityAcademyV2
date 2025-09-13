"use client";

import { FeedbackSchema } from "@/features/feedback";
import { SmartForm } from "@/widgets";

interface FeedbackFormProps {
  config?: any;
}

export const FeedbackForm = ({ config }: FeedbackFormProps) => {
  const {
    name,
    surname,
    email,
    message,
    buttonLabel,
    successText,
    errorText,
  } = config.feedbackForm;
  return (
    <SmartForm
      schema={FeedbackSchema}
      action="/api/forms/feedback"
      buttonLabel={buttonLabel}
      successText={successText}
      errorText={errorText}
      fields={[
        {
          name: "name",
          placeholder: name,
          autoComplete: "given-name",
          col: "half",
          type: "text",
        },
        {
          name: "surname",
          placeholder: surname,
          autoComplete: "family-name",
          col: "half",
          type: "text",
        },
        {
          name: "email",
          placeholder: email,
          autoComplete: "email",
          type: "email",
        },
        {
          name: "message",
          placeholder: message,
          type: "textarea",
        },
      ]}
      defaults={{
        name: "",
        surname: "",
        email: "",
        message: "",
      }}
      transform={(v) => ({
        name: v.name.trim(),
        surname: v.surname.trim(),
        email: v.email.trim(),
        message: v.message.trim(),
      })}
    />
  );
};
