"use client";

import { FeedbackSchema } from "@/features/feedback";
import { SmartForm } from "@/widgets";

export const FeedbackForm = () => {
  return (
    <SmartForm
      schema={FeedbackSchema}
      action="/api/forms/feedback"
      buttonLabel="Ուղարկել"
      fields={[
        {
          name: "name",
          placeholder: "Անուն",
          autoComplete: "given-name",
          col: "half",
          type: "text",
        },
        {
          name: "surname",
          placeholder: "Ազգանուն",
          autoComplete: "family-name",
          col: "half",
          type: "text",
        },
        {
          name: "email",
          placeholder: "Էլ. հասցե",
          autoComplete: "email",
          type: "email",
        },
        {
          name: "message",
          placeholder: "Հաղորդագրություն",
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
      successText="Շնորհակալություն! Հաղորդագրությունը ուղարկվել է."
      errorText="Ինչ-որ բան սխալ գնաց. Խնդրում ենք փորձել կրկին."
    />
  );
};
