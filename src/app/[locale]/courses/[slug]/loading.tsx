import { Container, Section } from "@/shared/ui/custom";
import { Skeleton } from "@/shared/ui";

export default function LoadingCourse() {
  return (
    <main id="main" className="sm:mt-36 md:mt-40">
      {/* IntroHero Section Skeleton */}
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-16 w-full" />
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

      {/* CourseTopics and InstructorCard Section Skeleton */}
      <Section>
        <Container className="flex flex-row gap-8">
          {/* CourseTopics Skeleton */}
          <div className="flex-1 space-y-6">
            <Skeleton className="h-8 w-64" />
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-5 w-3/4" />
                </div>
              ))}
            </div>
          </div>

          {/* InstructorCard Skeleton */}
          <div className="w-80 rounded-lg border p-6 space-y-4">
            <div className="text-center space-y-4">
              <Skeleton className="h-24 w-24 rounded-full mx-auto" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32 mx-auto" />
                <Skeleton className="h-4 w-24 mx-auto" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
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
            <div className="space-y-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
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

      {/* CallToAction with Form Section Skeleton */}
      <Section id="form">
        <Container>
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <Skeleton className="h-10 w-96 mx-auto" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6 mx-auto" />
            </div>

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

              <Skeleton className="h-12 w-full" />
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
