import type { RootState } from "@/store/store";

export const selectPaginatedRecentChanges = (state: RootState) => {
  const { allItems, currentPage, limitPerPage } = state.recentChanges;
  const start = (currentPage - 1) * limitPerPage;
  return allItems.slice(start, start + limitPerPage);
};
