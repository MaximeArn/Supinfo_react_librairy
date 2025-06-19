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
        description="Consult recent activity on the library"
      />

      <section className="bg-gray-50 rounded-xl px-4 py-4 mt-4 mb-6 text-sm sm:text-base text-gray-700 shadow-sm">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
          📚 Welcome to the Meth Library portal !
        </h2>
        <p className="mb-2">
          Here you’ll find the latest updates to our library’s digital
          collection. Whether we’ve added a new edition, edited an author’s
          profile, or reorganized our records — this feed helps you stay
          informed.
        </p>
        <p>
          Browse the most recent updates below, discover new works, and follow
          how our library grows over time.
        </p>
      </section>

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
