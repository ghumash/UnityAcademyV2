import GithubSlugger from "github-slugger";

// Быстрый TOC парсер: игнорируем fenced code, берём строки, начинающиеся с #/##/###
export type TocItem = { id: string; title: string; level: 1 | 2 | 3 };

export async function getMdxToc(source: string): Promise<TocItem[]> {
  const lines = source.split(/\r?\n/);
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  let inFence = false;
  for (const raw of lines) {
    const line = raw.trim();

    // fenced ``` / ~~~
    if (/^(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const m = /^(#{1,3})\s+(.*)$/.exec(line);
    if (!m) continue;

    const level = m[1].length as 1 | 2 | 3;
    const title = m[2].replace(/\s+#*$/, "").trim();
    const id = slugger.slug(title);

    items.push({ id, title, level });
  }
  return items;
}
