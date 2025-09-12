"use client";

import { ApplySchema } from "@/features/apply";
import { SmartForm } from "@/widgets";

// Типы курсов на основе существующих значений
type CourseValue =
  | "Վեբ ծրագրավորում"
  | "Գրաֆիկ դիզայն"
  | "Երեխաների ծրագրավորում"
  | "SMM և Digital Marketing"
  | "Python ծրագրավորում"
  | "Android ծրագրավորում"
  | "UI/UX դիզայն"
  | "HR"
  | "Soft Skills";

interface ApplyFormProps {
  defaultCourse?: CourseValue;
}

export const ApplyForm = ({ defaultCourse }: ApplyFormProps) => {
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
          type: "invisible",
        },
      ]}
      defaults={{
        fullname: "",
        email: "",
        phone: "",
        course: defaultCourse || "",
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
