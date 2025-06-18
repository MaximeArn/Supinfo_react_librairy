import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/store/store";
import { fetchSearchResults } from "@/store/slices/booksSearch.slice";
import SearchBarResults from "./SearchBarResults";

interface Props {
  query: string;
  setQuery: (value: string) => void;
}

export default function SearchBar({ query, setQuery }: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 1) {
        dispatch(fetchSearchResults(query));
      }
    }, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form className="flex-1 max-w-md w-full" onSubmit={handleSubmit}>
      <div className="form-control w-full relative">
        <input
          type="text"
          placeholder="Search books..."
          className="input input-bordered input-sm w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <SearchBarResults
          query={query}
          className="hidden md:block absolute top-full w-full"
        />
      </div>
    </form>
  );
}
