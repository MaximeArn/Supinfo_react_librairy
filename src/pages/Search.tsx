import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  fetchAdvancedSearchResults,
  clearAdvancedSearchResults,
} from "@/store/slices/booksSearch.slice";
import { useAppDispatch, useAppSelector } from "../store/store";

const AdvancedSearchPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get("q") || "";

  const [title, setTitle] = useState(initialQuery);
  const [author, setAuthor] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

  const { results, status, error } = useAppSelector(
    (state) => state.booksSearch.advancedSearch
  );

  const handleSearch = () => {
    const queryParts = [
      title && `q=${encodeURIComponent(title)}`,
      author && `author=${encodeURIComponent(author)}`,
      subject && `subject=${encodeURIComponent(subject)}`,
      year && `first_publish_year=${encodeURIComponent(year)}`,
    ];

    const fullQuery = queryParts.filter(Boolean).join("&");

    if (fullQuery) {
      dispatch(fetchAdvancedSearchResults(fullQuery));
    }
  };

  useEffect(() => {
    if (initialQuery) {
      dispatch(
        fetchAdvancedSearchResults(`q=${encodeURIComponent(initialQuery)}`)
      );
    }

    return () => {
      dispatch(clearAdvancedSearchResults());
    };
  }, [dispatch, initialQuery]);

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Advanced Search</h1>

      <div className="grid gap-4 mb-6">
        <input
          type="text"
          placeholder="Title or Keywords"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="input input-bordered w-full"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          className="input input-bordered w-full"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Publish Year"
          className="input input-bordered w-full"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button onClick={handleSearch} className="btn btn-primary w-full">
          Search
        </button>
      </div>

      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "failed" && (
        <p className="text-center text-error">Error: {error}</p>
      )}
      {status === "succeeded" && results.length === 0 && (
        <p className="text-center">No results found.</p>
      )}

      <div className="grid gap-4">
        {results.map((book) => (
          <p key={book.cover_edition_key}>{book.title}</p>
        ))}
      </div>
    </div>
  );
};

export default AdvancedSearchPage;
