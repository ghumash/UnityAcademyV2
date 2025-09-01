export function paginate(total: number, page: number, perPage: number) {
  const pages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), pages);
  const offset = (safePage - 1) * perPage;
  const prev = safePage > 1 ? safePage - 1 : undefined;
  const next = safePage < pages ? safePage + 1 : undefined;
  return { total, page: safePage, perPage, pages, offset, prev, next };
}
