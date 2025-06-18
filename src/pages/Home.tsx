import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import {
  loadRecentChangesIfNeeded,
  setPage,
} from "@/store/slices/recentChanges.slice";

import PageHeader from "@/Components/Common/PageHeader";
import ErrorDisplay from "@/Components/Common/ErrorDisplay";
import RecentChangesList from "@/Components/RecentChanges/RecentChangesList";
import PaginationControls from "@/Components/Common/PaginationControls";
import RecentChange from "@/models/RecentChange.model";
import { selectPaginatedRecentChanges } from "@/store/selectors/recentChangesSelectors";
import RecentChangesListSkeleton from "@/Components/Skeletons/RecentChangesListSkeleton";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading,
    error,
    currentPage,
    limitPerPage: limit,
  } = useSelector((state: RootState) => state.recentChanges);

  const paginatedItems = useSelector(selectPaginatedRecentChanges);
  const recentChangeInstances = paginatedItems.map(
    (item) => new RecentChange(item)
  );

  useEffect(() => {
    dispatch(loadRecentChangesIfNeeded({ page: currentPage, limit }));
  }, [dispatch, currentPage, limit]);

  const handlePageChange = (page: number) => {
    if (page >= 1) {
      dispatch(setPage(page));
    }
  };

  return (
    <>
      <PageHeader
        title="Recent changes"
        description="Explore authors by theme, period, or literary movement."
      />

      {error && <ErrorDisplay error={new Error(error)} />}
      {loading && <RecentChangesListSkeleton count={limit} />}

      {!loading && !error && (
        <RecentChangesList changes={recentChangeInstances} />
      )}
      <PaginationControls
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isLoading={loading}
      />
    </>
  );
}
