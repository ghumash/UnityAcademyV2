"use client";

import { ApplySchema } from "@/features/apply";
import { SmartForm } from "@/widgets";

export const ApplyForm = () => {
  return (
    <SmartForm
      schema={ApplySchema}
      action="/api/forms/apply"
      buttonLabel="Գրանցվել"
      fields={[
        {
          name: "fullname",
          placeholder: "Անուն Ազգանուն",
          autoComplete: "given-name",
          type: "text",
        },
        {
          name: "email",
          placeholder: "Էլ. հասցե",
          autoComplete: "email",
          type: "email",
        },
        {
          name: "phone",
          placeholder: "Հեռախոսահամար",
          autoComplete: "tel",
          type: "text",
        },
        {
          name: "course",
          placeholder: "Դասընթաց",
          type: "select",
          options: [
            { value: "Վեբ ծրագրավորում", label: "Վեբ ծրագրավորում" },
            { value: "Գրաֆիկ դիզայն", label: "Գրաֆիկ դիզայն" },
            {
              value: "SMM / Թվային մարքեթինգ",
              label: "SMM / Թվային մարքեթինգ",
            },
            {
              value: "Արհեստական բանականություն",
              label: "Արհեստական բանականություն",
            },
            { value: "UI/UX Դիզայն", label: "UI/UX Դիզայն" },
            {
              value: "Java / Android Ծրագրավորում",
              label: "Java / Android Ծրագրավորում",
            },
            { value: "Soft Skills / Կարիերա", label: "Soft Skills / Կարիերա" },
          ],
        },
      ]}
      defaults={{
        fullname: "",
        email: "",
        phone: "",
        course: "",
      }}
      transform={(v) => ({
        fullname: v.fullname.trim(),
        email: v.email.trim(),
        phone: v.phone.trim(),
        course: v.course.trim(),
      })}
      successText="Շնորհակալություն! Հաղորդագրությունը ուղարկվել է."
      errorText="Ինչ-որ բան սխալ գնաց. Խնդրում ենք փորձել կրկին."
    />
  );
};
