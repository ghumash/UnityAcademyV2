"use client";

import { Container, Section } from "@/shared/ui/custom";
import { GradientHeading } from "@/shared/ui/lib";
import { LogoCarousel } from "@/shared/ui/lib/logo-carousel";
import React, { type SVGProps } from "react";

function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="209"
      height="256"
      viewBox="0 0 814 1000"
      {...props}
    >
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
    </svg>
  );
}

function LowesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={91.239998}
      height={42.970001}
      {...props}
    >
      <defs>
        <clipPath>
          <path d="M22.8 704.934h119.143V768.6H22.8v-63.666z" />
        </clipPath>
      </defs>
      <g fillOpacity={1} fillRule="nonzero" stroke="none">
        <path
          d="M155.876 378.285l-23.048 9.873h-14.376v4.027h-7.201v27.07h89.24v-27.07h-7.198v-4.027h-14.37l-23.047-9.873z"
          fill="#004990"
          transform="translate(-110.251 -377.285)"
        />
        <path
          d="M177.157 395.357v4.377l2.83.005.59-4.38-3.42-.001zM192.465 399.15c.183 0 .348-.014.348-.237 0-.175-.163-.207-.313-.207h-.295v.443h.26zm-.26.802h-.216v-1.43h.545c.336 0 .504.125.504.407 0 .257-.159.368-.369.394l.406.629h-.242l-.378-.62h-.25v.62zm.263.32c.561 0 1.004-.439 1.004-1.038 0-.587-.443-1.03-1.004-1.03-.569 0-1.011.443-1.011 1.03 0 .599.442 1.038 1.011 1.038m-1.261-1.038c0-.712.577-1.237 1.261-1.237.676 0 1.255.525 1.255 1.237 0 .718-.579 1.245-1.255 1.245-.684 0-1.261-.527-1.261-1.245M125.486 410.27v-14.913h-4.079v18.465h10.39v-3.551h-6.31zM166.547 413.822h9.709v-3.556h-5.61v-2.317h5.61v-3.424h-5.61v-2.33h5.61v-3.571h-9.71V413.822zM141.12 402.195h-3.588v8.057h3.588v-8.057zm4.086 9.687a1.942 1.942 0 01-1.941 1.94h-7.879c-1.071 0-1.94-.87-1.94-1.94v-11.317a1.94 1.94 0 011.94-1.941h7.879a1.94 1.94 0 011.941 1.941v11.317zM160.128 398.624v11.647h-2.463v-11.647h-3.587v11.647h-2.463v-11.647h-4.086v13.257c0 1.072.869 1.942 1.941 1.942h4.83c.814 0 1.572-.562 1.572-1.376 0 .814.757 1.376 1.571 1.376h4.831c1.071 0 1.94-.87 1.94-1.942v-13.257h-4.086zM190.578 408.08h.001l-.025-.052-.048-.097-.025-.05c-.647-1.296-2.094-2.378-4.424-3.31l-.083-.032c-.46-.181-1.865-.73-2.02-1.623-.043-.25.058-.642.337-.88.293-.3.743-.453 1.337-.453.95 0 2.03.388 2.59.62 1.179.488 2.213.925 2.223.93l.102.043v-3.317l-.034-.021c-.022-.015-2.25-1.42-4.502-1.743a8.82 8.82 0 00-.761-.032c-2.073 0-3.643.752-4.665 2.237-.86 1.22-.954 3.151-.224 4.593.939 1.628 2.444 2.308 3.9 2.967.6.27 1.221.553 1.802.898l.006.004c.658.395.993.998.854 1.535-.144.556-.78.93-1.584.93-.11 0-.22-.006-.33-.022l-.038-.005c-1.547-.215-4.682-1.382-4.713-1.395l-.1-.037v3.637l.051.018c.03.01 3.064 1.015 5.758 1.015 1.47 0 2.58-.296 3.298-.879.018-.012 1.664-1.336 1.737-3.587.02-.623-.122-1.26-.42-1.893"
          fill="#fff"
          transform="translate(-110.251 -377.285)"
        />
      </g>
    </svg>
  );
}

function VercelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 222"
      width="256"
      height="222"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      {...props}
    >
      <path fill="#000" d="m128 0 128 221.705H0z" />
    </svg>
  );
}

function SupabaseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 109 113"
      width="109"
      height="113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347Z"
        fill="url(#a)"
      />
      <path
        d="M63.708 110.284c-2.86 3.601-8.658 1.628-8.727-2.97l-1.007-67.251h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347Z"
        fill="url(#b)"
        fillOpacity=".2"
      />
      <path
        d="M45.317 2.071c2.86-3.601 8.657-1.628 8.726 2.97l.442 67.251H9.83c-8.19 0-12.759-9.46-7.665-15.875L45.317 2.072Z"
        fill="#3ECF8E"
      />
      <defs>
        <linearGradient
          id="a"
          x1="53.974"
          y1="54.974"
          x2="94.163"
          y2="71.829"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
        <linearGradient
          id="b"
          x1="36.156"
          y1="30.578"
          x2="54.484"
          y2="65.081"
          gradientUnits="userSpaceOnUse"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// Массив с логотипами
type LogoItem = { id: number; name: string; img: any };

const allLogos: LogoItem[] = [
  { name: "Apple", id: 1, img: AppleIcon },
  { name: "Supabase", id: 2, img: SupabaseIcon },
  { name: "Vercel", id: 3, img: VercelIcon },
];

export function LogoCarouselSection() {
  return (
    <Section id="logo-carousel" aria-labelledby="logo-carousel-title">
      <Container>
        <div className="flex flex-col items-center gap-8 md:pb-20 pb-10">
          <div className="text-center">
            <GradientHeading variant="secondary" id="logo-carousel-title">
              The best are already here
            </GradientHeading>
            <GradientHeading size="xxl">Join New Cult</GradientHeading>
          </div>

          <div role="region" aria-label="Partner and technology logos">
            <LogoCarousel columnCount={3} logos={allLogos} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
