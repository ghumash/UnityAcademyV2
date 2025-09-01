import * as React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { MDXComponents } from "./components";

export async function MdxRenderer({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "wrap", properties: { className: "no-underline" } },
          ],
        ],
      },
    },
    components: MDXComponents,
  });

  return (
    <div className="prose prose-neutral dark:prose-invert max-w-none">
      {content}
    </div>
  );
}
