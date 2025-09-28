"use client";

import { createEventRegisterSchema, type EventValue } from "../model/schema";
import { SmartForm } from "@/widgets";
import type { FormsDict } from "@/shared/lib/i18n";

interface EventRegisterFormProps {
  defaultEvent?: EventValue;
  config: FormsDict;
}

export const EventRegisterForm = ({
  defaultEvent,
  config,
}: EventRegisterFormProps) => {
  const { eventRegisterForm, validation } = config;
  const schema = createEventRegisterSchema(validation);

  return (
    <SmartForm
      action="/api/forms/event-register"
      schema={schema}
      buttonLabel={eventRegisterForm.buttonLabel}
      successText={eventRegisterForm.successText}
      errorText={eventRegisterForm.errorText}
      fields={[
        {
          name: "fullname",
          placeholder: eventRegisterForm.fullname,
          autoComplete: "name",
          type: "text",
        },
        {
          name: "birthday",
          placeholder: eventRegisterForm.birthday,
          autoComplete: "bday",
          type: "date",
        },
        {
          name: "phone",
          placeholder: eventRegisterForm.phone,
          autoComplete: "tel",
          type: "text",
        },
        {
          name: "event",
          type: "invisible",
        },
      ]}
      defaults={{
        fullname: "",
        birthday: "",
        phone: "",
        event: defaultEvent || "",
      }}
      transform={(v: any) => ({
        fullname: v.fullname.trim(),
        birthday: v.birthday.trim(),
        phone: v.phone.trim(),
        event: v.event.trim(),
      })}
    />
  );
};
