// src/shared/mdx/image.tsx
import NextImage, { type ImageProps } from "next/image";
import { cn } from "../lib";

type Base = {
  alt: string;
  className?: string;
  priority?: boolean;
  quality?: number;
};

type Fixed = Base &
  Omit<ImageProps, "alt" | "fill" | "sizes"> & {
    width: number;
    height: number;
    fill?: false;
  };

type Fluid = Base &
  Omit<ImageProps, "alt" | "width" | "height" | "sizes"> & {
    fill: true;
    sizes?: string;
  };

type Props = Fixed | Fluid;

export function MdxImage(props: Props) {
  const wrapper = "relative mt-6 overflow-hidden rounded-lg border";

  if ("fill" in props && props.fill) {
    const { className, alt, sizes, style, fill: _fill, ...rest } = props;
    return (
      <div className={cn(wrapper, className)}>
        <NextImage
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          style={{ objectFit: "cover", ...(style ?? {}) }}
          {...rest}
        />
      </div>
    );
  }

  const { className, alt, width, height, ...rest } = props;
  return (
    <div className={cn(wrapper, className)}>
      <NextImage alt={alt} width={width} height={height} {...rest} />
    </div>
  );
}
