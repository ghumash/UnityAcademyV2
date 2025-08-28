import Link from "next/link";
import { Button } from "@/shared/ui";

export default function CoursesEmptyState() {
  return (
    <div className="rounded-lg border bg-card p-8 text-center text-card-foreground">
      <h2 className="text-lg font-semibold">
        Каталог курсов скоро будет доступен
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Мы готовим программы и расписание. Можешь оставить заявку — мы свяжемся.
      </p>
      <div className="mt-6">
        <Button asChild>
          <Link href="/apply">Подать заявку</Link>
        </Button>
      </div>
    </div>
  );
}
