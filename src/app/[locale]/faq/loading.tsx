import { Container, Section } from "@/shared/ui/custom";
import { Skeleton } from "@/shared/ui";

export default function LoadingFaq() {
  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      {/* Hero Title Section Skeleton */}
      <Container className="text-center py-12">
        <Skeleton className="h-16 w-80 mx-auto" />
      </Container>

      {/* FAQ Accordion Section Skeleton */}
      <Section>
        <Container className="max-w-2xl">
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-lg border">
                <div className="p-4 flex items-center justify-between">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-4" />
                </div>
                {/* Simulate some expanded items */}
                {i % 3 === 0 && (
                  <div className="px-4 pb-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
