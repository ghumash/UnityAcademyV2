import { Section, Container } from "@/shared/ui/custom";
import { Skeleton } from "@/shared/ui";

export default function LoadingCourse() {
  return (
    <main>
      <Section>
        <Container>
          <Skeleton className="h-5 w-64" />
          <Skeleton className="mt-4 h-9 w-2/3" />
          <Skeleton className="mt-3 h-4 w-full max-w-prose" />
          <Skeleton className="mt-2 h-4 w-5/6 max-w-prose" />
          <div className="mt-8 rounded-lg border p-6">
            <Skeleton className="h-28 w-full" />
          </div>
        </Container>
      </Section>
    </main>
  );
}
