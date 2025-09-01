import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSanitize from "rehype-sanitize";
import { MDXComponents } from "./components";
import { mdxSanitizeSchema } from "./sanitize";

export async function MdxRenderer({ source }: { source: string }) {
  if (!source?.trim()) return null;

  const { content } = await compileMDX({
    source,
    components: MDXComponents as any,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [rehypeSanitize, mdxSanitizeSchema],
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            { behavior: "wrap", properties: { className: "hover:underline" } },
          ],
        ],
      },
    },
  });

  return <div className="mdx-content">{content}</div>;
}
