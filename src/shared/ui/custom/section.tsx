import type { ReactNode } from "react";

type TagName = "section" | "div" | "main" | "header" | "footer" | "aside";

type Props = {
  children: ReactNode;
  className?: string;
  as?: TagName;
  id?: string;
};

export default function Section({
  children,
  className,
  as = "section",
  id,
}: Props) {
  const Tag = as;
  return (
    <Tag id={id} className={`py-10 md:py-14 ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
