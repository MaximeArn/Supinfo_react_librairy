import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";

export const selectPaginatedRecentChanges = createSelector(
  [
    (state: RootState) => state.recentChanges.allItems,
    (state: RootState) => state.recentChanges.currentPage,
    (state: RootState) => state.recentChanges.limitPerPage,
  ],
  (allItems, currentPage, limitPerPage) => {
    const start = (currentPage - 1) * limitPerPage;
    return allItems.slice(start, start + limitPerPage);
  }
);
