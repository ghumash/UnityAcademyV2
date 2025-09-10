import { handleForm, gforms } from "@/shared/lib/google";
import { FeedbackSchema } from "@/features/feedback";

export async function POST(req: Request) {
  return handleForm(req, {
    schema: FeedbackSchema,
    formId: gforms.feedback.formId,
    entries: gforms.feedback.entries,
  });
}
