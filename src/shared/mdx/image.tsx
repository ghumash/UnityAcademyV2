import NextImage, { type ImageProps } from "next/image";

type Props = Omit<ImageProps, "alt"> & { alt: string };

export function MdxImage({ alt, className, ...rest }: Props) {
  return (
    <div
      className={`relative mt-6 overflow-hidden rounded-lg border ${className ?? ""}`}
    >
      <NextImage alt={alt} {...rest} />
    </div>
  );
}
