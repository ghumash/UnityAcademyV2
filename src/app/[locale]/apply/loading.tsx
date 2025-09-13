import { Container, Section } from "@/shared/ui/custom";
import { Skeleton } from "@/shared/ui";

export default function LoadingApply() {
  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      {/* Hero Title Section Skeleton */}
      <Container className="h-[200px] flex items-center justify-center">
        <Skeleton className="h-16 w-80" />
      </Container>

      {/* CallToAction with Form Section Skeleton */}
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto space-y-8">
            {/* CallToAction Header */}
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-96 mx-auto" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6 mx-auto" />
            </div>

            {/* Form Skeleton */}
            <div className="rounded-lg border p-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-32 w-full" />
              </div>

              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
