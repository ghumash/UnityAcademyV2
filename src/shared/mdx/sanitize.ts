import type { Schema } from "hast-util-sanitize";
import { defaultSchema } from "hast-util-sanitize";

// базовый schema с расширениями под наш MDX
const attributes = {
  // глобально разрешаем className и id
  "*": ["className", "id"],
  a: ["href", "title", "rel", "target"],
  img: ["src", "alt", "title", "width", "height", "loading", "decoding"],
  code: ["className"], // подсветка синтаксиса
  pre: ["className"],
};

export const mdxSanitizeSchema: Schema = {
  ...defaultSchema,
  // разрешаем некоторые элементы, если вдруг не были включены
  tagNames: Array.from(
    new Set([
      ...(defaultSchema.tagNames || []),
      "img",
      "code",
      "pre",
      "blockquote",
      "hr",
    ])
  ),
  attributes: {
    ...(defaultSchema.attributes || {}),
    ...attributes,
  },
};
