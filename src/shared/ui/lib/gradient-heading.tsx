import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/shared/lib";

export const headingVariants = cva(
  "tracking-tight pb-3 bg-clip-text text-transparent leading-tight",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-t from-neutral-700 to-neutral-800 dark:from-stone-200 dark:to-neutral-200",
        pink: "bg-gradient-to-t from-accent to-accent/90 dark:from-stone-200 dark:to-neutral-200",
        light: "bg-gradient-to-t from-neutral-200 to-neutral-300",
        secondary:
          "bg-gradient-to-t from-neutral-500 to-neutral-600 dark:from-stone-200 dark:to-neutral-200",
      },
      size: {
        default: "text-2xl sm:text-3xl lg:text-4xl",
        xxs: "text-base sm:text-lg",
        xs: "text-lg sm:text-xl lg:text-2xl",
        sm: "text-xl sm:text-2xl lg:text-3xl",
        md: "text-2xl sm:text-3xl lg:text-4xl",
        lg: "text-3xl sm:text-4xl lg:text-5xl",
        xl: "text-4xl sm:text-5xl lg:text-6xl",
        xxl: "text-5xl sm:text-6xl lg:text-[6rem]",
        xxxl: "text-5xl sm:text-6xl lg:text-[8rem]",
      },
      weight: {
        default: "font-bold",
        thin: "font-thin",
        base: "font-normal",
        normal: "font-normal",
        semi: "font-semibold",
        bold: "font-bold",
        black: "font-black",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "default",
    },
  }
);

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/** Include native heading attributes so `id`, `aria-*`, etc. are allowed */
export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: HeadingTag;
  asChild?: boolean;
}

const BaseHeading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { asChild, as, variant, weight, size, className, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : (as ?? "h3");
    return (
      <Comp
        ref={ref}
        {...props}
        className={cn(headingVariants({ variant, size, weight }), className)}
      >
        {children}
      </Comp>
    );
  }
);
BaseHeading.displayName = "GradientHeading";

export const GradientHeading = React.memo(BaseHeading);

export type Variant = "default" | "pink" | "light" | "secondary";
export type Size =
  | "default"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "xxxl";
export type Weight =
  | "default"
  | "thin"
  | "base"
  | "normal"
  | "semi"
  | "bold"
  | "black";
