import { useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { useSearchParams } from "react-router";
import ErrorDisplay from "@/Components/Common/ErrorDisplay";
import SearchResultCard from "@/Components/AdvancedSearch/AdvancedSearchResultCard";
import PaginationControls from "@/Components/Common/PaginationControls";
import {
  fetchAdvancedSearchResults,
  setBookPerPage,
  setCurrentPage,
} from "@/store/slices/booksSearch.slice";
import AdvancedSearchResultSkeleton from "../Skeletons/SearchResultCardSkeleton";

const AdvancedSearchResults = () => {
  const { results, status, error, currentPage, bookPerPage } = useAppSelector(
    (state) => state.booksSearch.advancedSearch
  );
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPerPage = parseInt(e.target.value);
    dispatch(setBookPerPage(newPerPage));
    dispatch(setCurrentPage(1));

    const paramsObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });

    dispatch(
      fetchAdvancedSearchResults({
        filters: Object.fromEntries(searchParams.entries()),
      })
    );
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));

    const paramsObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });

    dispatch(
      fetchAdvancedSearchResults({
        filters: Object.fromEntries(searchParams.entries()),
      })
    );

    setTimeout(() => {
      const el = scrollTargetRef.current;
      if (el) {
        const navHeight = 90;
        const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <div className="mt-8 " ref={scrollTargetRef}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-base-content">
          Search results
        </h2>
        <div className="flex items-center">
          <label htmlFor="perPage" className="mr-2 text-sm">
            Results per page:
          </label>
          <select
            id="perPage"
            value={bookPerPage}
            onChange={handlePerPageChange}
            className="select select-sm select-bordered w-auto"
          >
            <option value={9}>9</option>
            <option value={18}>18</option>
            <option value={36}>36</option>
            <option value={72}>72</option>
          </select>
        </div>
      </div>

      {status === "loading" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: bookPerPage }).map((_, i) => (
            <AdvancedSearchResultSkeleton key={i} />
          ))}
        </div>
      )}

      {status === "failed" && <ErrorDisplay error={new Error(error || "")} />}

      {status === "succeeded" && results.length === 0 && (
        <p className="text-center mt-8">No results found.</p>
      )}

      {status === "succeeded" && results.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((book) => (
            <SearchResultCard key={book.key} book={book} />
          ))}
        </div>
      )}

      <PaginationControls
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isLoading={status === "loading"}
        isLastPage={results.length < bookPerPage}
      />
    </div>
  );
};

export default AdvancedSearchResults;
