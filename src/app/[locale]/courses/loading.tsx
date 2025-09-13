import { Skeleton } from "@/shared/ui";
import { Container, Section } from "@/shared/ui/custom";

export default function LoadingCourses() {
  return (
    <>
      {/* Breadcrumbs skeleton */}
      <Section className="pt-6 pb-0">
        <Container>
          <div className="flex items-center gap-2 text-sm">
            <Skeleton className="h-4 w-12" />
            <span className="text-white/40">/</span>
            <Skeleton className="h-4 w-16" />
          </div>
        </Container>
      </Section>

      {/* Main courses section */}
      <Section>
        <Container>
          <div className="relative">
            {/* Title skeleton */}
            <Skeleton className="h-8 sm:h-10 w-48 sm:w-64 mb-8 sm:mb-10" />

            {/* Course cards grid */}
            <div className="grid gap-6 sm:gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="group relative w-full rounded-2xl border-2 border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl p-5 sm:p-6 shadow-2xl overflow-hidden"
                >
                  {/* Content */}
                  <div className="relative z-10 flex items-start gap-4">
                    {/* Icon bubble skeleton */}
                    <div className="shrink-0 p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                      <Skeleton className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Title skeleton */}
                      <Skeleton className="h-6 sm:h-7 w-3/4 mb-2" />
                      
                      {/* Description skeleton - 3 lines */}
                      <div className="mt-1 space-y-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/5" />
                      </div>

                      {/* Meta badges skeleton */}
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 bg-white/5 ring-1 ring-white/10 backdrop-blur">
                          <Skeleton className="w-4 h-4" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 bg-white/5 ring-1 ring-white/10 backdrop-blur">
                          <Skeleton className="w-4 h-4" />
                          <Skeleton className="h-3 w-12" />
                        </div>
                        <div className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 bg-white/5 ring-1 ring-white/10 backdrop-blur">
                          <Skeleton className="w-4 h-4" />
                          <Skeleton className="h-3 w-14" />
                        </div>
                      </div>
                    </div>

                    {/* Arrow skeleton */}
                    <div className="ml-auto self-center">
                      <Skeleton className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
