import { Container, Section } from "@/shared/ui/custom";
import { Skeleton } from "@/shared/ui";

export default function LoadingAbout() {
  return (
    <main id="main" className="sm:mt-20 md:mt-28">
      {/* IntroWithDesc Section Skeleton */}
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <Skeleton className="h-16 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-4/5" />
              <div className="space-y-3 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
            <div className="relative">
              <Skeleton className="aspect-[4/3] w-full rounded-lg" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ContentSection Skeleton */}
      <Section>
        <Container>
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-72 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* GlowingGrid Section Skeleton */}
      <Section>
        <Container>
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-80 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-lg border p-6 space-y-4">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* TeamSection Skeleton */}
      <Section>
        <Container>
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-64 mx-auto" />
              <Skeleton className="h-6 w-80 mx-auto" />
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="text-center space-y-4">
                  <Skeleton className="h-32 w-32 rounded-full mx-auto" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-32 mx-auto" />
                    <Skeleton className="h-4 w-24 mx-auto" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* CtaBanner Section Skeleton */}
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
