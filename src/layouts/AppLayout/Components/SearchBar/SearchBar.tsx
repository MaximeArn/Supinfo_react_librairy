import {
  useEffect,
  useImperativeHandle,
  useRef,
  forwardRef,
  type ForwardedRef,
} from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/store/store";
import { fetchQuickSearchResults } from "@/store/slices/booksSearch.slice";
import SearchBarResults from "./SearchBarResults";

interface Props {
  query: string;
  setQuery: (value: string) => void;
}

const SearchBar = forwardRef(function SearchBar(
  { query, setQuery }: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => localRef.current!);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length >= 1) {
        dispatch(fetchQuickSearchResults(query));
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
      <div className="form-control w-full relative" ref={localRef}>
        <input
          type="text"
          placeholder="Search books..."
          className="input input-bordered input-sm w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <SearchBarResults
          query={query}
          setQuery={setQuery}
          className="hidden md:block absolute top-full w-full"
        />
      </div>
    </form>
  );
});

export default SearchBar;
