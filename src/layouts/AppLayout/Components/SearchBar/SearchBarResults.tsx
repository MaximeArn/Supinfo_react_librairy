import { forwardRef, useImperativeHandle, useRef } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/store/store";

interface Props {
  query: string;
  className?: string;
  setQuery: (query: string) => void;
}

const SearchBarResults = forwardRef<HTMLDivElement, Props>(
  ({ query, className = "", setQuery }, ref) => {
    const { results, status } = useAppSelector(
      (state) => state.booksSearch.quickSearch
    );
    const navigate = useNavigate();
    const localRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => localRef.current!);

    if (query.length < 2) return null;

    const containerClasses = `bg-base-100 p-4 shadow-md border border-base-300 rounded-md z-50 ${className}`;

    if (status === "loading") {
      return (
        <div ref={localRef} className={containerClasses}>
          <p className="text-sm text-gray-500">Searching...</p>
        </div>
      );
    }

    if (status === "succeeded" && results.length === 0) {
      return (
        <div ref={localRef} className={containerClasses}>
          <p className="text-sm text-gray-500">No results found.</p>
        </div>
      );
    }

    if (status !== "succeeded" || results.length === 0) return null;

    return (
      <div
        ref={localRef}
        className={`bg-base-100 shadow-lg border border-base-300 rounded-md z-50 max-h-[50vh] overflow-y-auto ${className}`}
      >
        <ul className="divide-y divide-base-200">
          {results.slice(0, 5).map((book) => (
            <li
              key={book.key}
              className="px-4 py-2 hover:bg-base-200 cursor-pointer"
              onClick={() => {
                setQuery("");
                navigate(book.key);
              }}
            >
              <p className="font-medium">{book.title}</p>
              <p className="text-sm text-gray-500">
                {book.author_name?.join(", ")}
              </p>
            </li>
          ))}
        </ul>
        <div className="border-t border-base-300">
          <button
            onClick={() => {
              setQuery("");
              navigate(`/search?title=${encodeURIComponent(query.trim())}`);
            }}
            className="w-full text-center py-2 text-primary font-medium hover:bg-base-200"
          >
            See more
          </button>
        </div>
      </div>
    );
  }
);

export default SearchBarResults;
