import { useAppSelector, useAppDispatch } from "@/store/store";
import { useSearchParams } from "react-router";
import { useRef, useEffect } from "react";
import ErrorDisplay from "@/Components/Common/ErrorDisplay";
import SearchResultCard from "@/Components/AdvancedSearch/AdvancedSearchResultCard";
import PaginationControls from "@/Components/Common/PaginationControls";
import { fetchAdvancedSearchResults } from "@/store/slices/booksSearch.slice";
import AdvancedSearchResultSkeleton from "../Skeletons/SearchResultCardSkeleton";

const AdvancedSearchResults = () => {
  const { results, status, error } = useAppSelector(
    (state) => state.booksSearch.advancedSearch
  );
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentPage = parseInt(searchParams.get("page") || "1");

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    setSearchParams(searchParams);
    const paramsObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });
    dispatch(fetchAdvancedSearchResults(paramsObj));
  };

  if (status === "loading") {
    return (
      <div className="mt-8" ref={containerRef}>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Search results
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <AdvancedSearchResultSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (status === "failed")
    return <ErrorDisplay error={new Error(error || "")} />;

  if (status === "succeeded" && results.length === 0)
    return <p className="text-center mt-8">No results found.</p>;

  return (
    <div className="mt-8" ref={containerRef}>
      <h2 className="text-xl font-semibold mb-1 text-gray-800">
        Search results
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        {Array.from(searchParams.entries())
          .filter(([key]) => key !== "page")
          .map(([key, value]) => `${key}: ${value}`)
          .join(" · ")}
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((book) => (
          <SearchResultCard key={book.key} book={book} />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        onPageChange={handlePageChange}
        isLoading={status === "loading"}
      />
    </div>
  );
};

export default AdvancedSearchResults;
