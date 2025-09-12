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
  hideCourseSelect?: boolean;
}

export const ApplyForm = ({
  defaultCourse,
  hideCourseSelect = false,
}: ApplyFormProps) => {
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
          type: hideCourseSelect ? "invisible" : "select",
          ...(!hideCourseSelect && {
            options: [
              { value: "Վեբ ծրագրավորում", label: "Վեբ ծրագրավորում" },
              { value: "Գրաֆիկ դիզայն", label: "Գրաֆիկ դիզայն" },
              {
                value: "Երեխաների ծրագրավորում",
                label: "Երեխաների ծրագրավորում",
              },
              {
                value: "SMM և Digital Marketing",
                label: "SMM և Digital Marketing",
              },
              { value: "Python ծրագրավորում", label: "Python ծրագրավորում" },
              { value: "Android ծրագրավորում", label: "Android ծրագրավորում" },
              { value: "UI/UX դիզայն", label: "UI/UX դիզայն" },
              { value: "HR", label: "HR" },
              { value: "Soft Skills", label: "Soft Skills" },
            ],
          }),
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
