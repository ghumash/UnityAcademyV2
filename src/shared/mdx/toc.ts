import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import GithubSlugger from "github-slugger";

export type TocItem = { id: string; title: string; level: 2 | 3 };

export async function getMdxToc(source: string): Promise<TocItem[]> {
  if (!source?.trim()) return [];
  const tree = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMdx)
    .parse(source);
  const items: TocItem[] = [];
  const slugger = new GithubSlugger();

  visit(tree, "heading", (node: any) => {
    const depth: number = node.depth;
    if (depth !== 2 && depth !== 3) return;
    const text = toString(node).trim();
    if (!text) return;
    const id = slugger.slug(text);
    items.push({ id, title: text, level: depth as 2 | 3 });
  });

  return items;
}
