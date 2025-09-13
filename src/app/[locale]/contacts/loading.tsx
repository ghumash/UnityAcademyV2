import { Container, Section } from "@/shared/ui/custom";
import { Skeleton } from "@/shared/ui";

export default function LoadingContacts() {
  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      {/* Hero Title Section Skeleton */}
      <div className="h-[200px] max-w-[400px] mx-auto flex items-center justify-center">
        <Skeleton className="h-16 w-80" />
      </div>

      {/* ContactTilesSection Skeleton */}
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Regular contact tiles */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border p-6 space-y-4">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
            
            {/* Long contact tiles */}
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={`long-${i}`} className="md:col-span-2 lg:col-span-3 rounded-lg border p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Form and Maps Section Skeleton */}
      <Section>
        <Container className="flex flex-col lg:flex-row gap-6">
          {/* FeedbackForm Skeleton */}
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
            </div>
            
            <div className="rounded-lg border p-6 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-32 w-full" />
              </div>

              <Skeleton className="h-12 w-full" />
            </div>
          </div>

          {/* Maps Skeleton */}
          <div className="flex-1">
            <Skeleton className="aspect-[4/3] w-full rounded-lg" />
          </div>
        </Container>
      </Section>
    </main>
  );
}
