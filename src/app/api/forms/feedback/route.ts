import { handleForm, gforms } from "@/shared/lib/google";
import { createFeedbackSchema } from "@/features/feedback";
import { getDictionarySync, resolveLocaleFromPath } from "@/shared/lib/i18n/helpers";

export async function POST(req: Request) {
  // Определяем локаль из заголовков или URL
  const referer = req.headers.get("referer") || "";
  const locale = resolveLocaleFromPath(new URL(referer).pathname);
  
  // Получаем словарь для текущей локали
  const dict = getDictionarySync(locale);
  const schema = createFeedbackSchema(dict.common.forms.validation);

  return handleForm(req, {
    schema,
    formId: gforms.feedback.formId,
    entries: gforms.feedback.entries,
  });
}
