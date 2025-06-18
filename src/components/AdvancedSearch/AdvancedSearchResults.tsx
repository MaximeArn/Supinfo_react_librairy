import { useAppSelector } from "@/store/store";
import ErrorDisplay from "@/Components/Common/ErrorDisplay";
import SearchResultCard from "@/Components/AdvancedSearch/AdvancedSearchResultCard";

const AdvancedSearchResults = () => {
  const { results, status, error } = useAppSelector(
    (state) => state.booksSearch.advancedSearch
  );

  if (status === "loading") return <p className="text-center">Loading…</p>;
  if (status === "failed")
    return <ErrorDisplay error={new Error(error || "")} />;
  if (status === "succeeded" && results.length === 0)
    return <p className="text-center">No results found.</p>;

  return (
    <div className="grid gap-4">
      {results.map((book) => (
        <SearchResultCard key={book.key} book={book} />
      ))}
    </div>
  );
};

export default AdvancedSearchResults;
