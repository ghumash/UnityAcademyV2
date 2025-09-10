"use client";

import { FeedbackSchema } from "@/features/feedback";
import { SmartForm } from "@/widgets";

export const FeedbackForm = () => {
  return (
    <SmartForm
      schema={FeedbackSchema}
      action="/api/forms/feedback"
      buttonLabel="Send Message"
      fields={[
        {
          name: "name",
          label: "First Name",
          placeholder: "First Name",
          autoComplete: "given-name",
          col: "half",
        },
        {
          name: "surname",
          label: "Last Name",
          placeholder: "Last Name",
          autoComplete: "family-name",
          col: "half",
        },
        {
          name: "email",
          label: "Email",
          placeholder: "Email",
          autoComplete: "email",
          type: "email",
        },
        {
          name: "message",
          label: "Message",
          placeholder: "Type your message here.",
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
      successText="Thank you! Your message has been sent."
      errorText="Something went wrong. Please try again."
    />
  );
};
