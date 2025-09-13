import { getT } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";

export async function getFormConfig(locale: Locale) {
  const t = await getT(locale);

  return {
    applyForm: {
      buttonLabel: t("common.forms.applyForm.buttonLabel"),
      successText: t("common.forms.applyForm.successText"),
      errorText: t("common.forms.applyForm.errorText"),
      fullname: t("common.forms.applyForm.fullname"),
      email: t("common.forms.applyForm.email"),
      phone: t("common.forms.applyForm.phone"),
      course: {
        label: t("common.forms.applyForm.course.label"),
        list: {
          web_development: {
            value: "Վեբ ծրագրավորում",
            label: t("common.forms.applyForm.course.list.web_development"),
          },
          graphic_design: {
            value: "Գրաֆիկ դիզայն",
            label: t("common.forms.applyForm.course.list.graphic_design"),
          },
          scratch: {
            value: "Երեխաների ծրագրավորում",
            label: t("common.forms.applyForm.course.list.scratch"),
          },
          smm: {
            value: "SMM և Digital Marketing",
            label: t("common.forms.applyForm.course.list.smm"),
          },
          python: {
            value: "Python ծրագրավորում",
            label: t("common.forms.applyForm.course.list.python"),
          },
          android: {
            value: "Android ծրագրավորում",
            label: t("common.forms.applyForm.course.list.android"),
          },
          ui_ux: {
            value: "UI/UX դիզայն",
            label: t("common.forms.applyForm.course.list.ui_ux"),
          },
          hr: {
            value: "HR",
            label: t("common.forms.applyForm.course.list.hr"),
          },
          soft_skills: {
            value: "Soft Skills",
            label: t("common.forms.applyForm.course.list.soft_skills"),
          },
        },
      },
    },
    feedbackForm: {
      name: t("common.forms.feedbackForm.name"),
      surname: t("common.forms.feedbackForm.surname"),
      email: t("common.forms.feedbackForm.email"),
      message: t("common.forms.feedbackForm.message"),
      button: {
        label: t("common.forms.feedbackForm.button.label"),
      },
    },
  } as const;
}
