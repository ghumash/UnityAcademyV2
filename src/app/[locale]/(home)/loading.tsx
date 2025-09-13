import { Container, Section } from "@/shared/ui/custom";
import { Skeleton } from "@/shared/ui";

export default function LoadingHome() {
  return (
    <main className="sm:mt-20 md:mt-22">
      {/* Hero Section Skeleton */}
      <Section className="relative overflow-hidden">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <Skeleton className="h-16 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <div className="flex gap-4">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
            <div className="relative">
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Carousel Section Skeleton */}
      <Section>
        <Container>
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-64 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="min-w-[300px] space-y-4">
                  <Skeleton className="aspect-[16/9] w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Section Skeleton */}
      <Section>
        <Container>
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-72 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4 text-center">
                  <Skeleton className="h-16 w-16 mx-auto rounded-lg" />
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Video Cards Carousel Skeleton */}
      <Section>
        <Container>
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-80 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="flex gap-6 overflow-hidden">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="min-w-[400px] space-y-4">
                  <Skeleton className="aspect-video w-full rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Logo Carousel Section Skeleton */}
      <Section>
        <Container>
          <div className="space-y-8">
            <div className="text-center">
              <Skeleton className="h-8 w-64 mx-auto" />
            </div>
            <div className="flex gap-8 justify-center items-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-24" />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Courses Section Skeleton */}
      <Section>
        <Container>
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-72 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border p-0">
                  <Skeleton className="aspect-[16/9] w-full" />
                  <div className="p-4 space-y-3">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <div className="flex justify-between items-center pt-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Banner Skeleton */}
      <Section>
        <Container>
          <div className="rounded-lg border p-8 text-center space-y-6">
            <Skeleton className="h-12 w-96 mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-12 w-40 mx-auto" />
          </div>
        </Container>
      </Section>
    </main>
  );
}
