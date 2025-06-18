import { useRef, useEffect, useState } from "react";
import { NavLink } from "react-router";
import ThemeToggler from "./ThemeToggler";
import SearchBar from "./SearchBar/SearchBar";
import SearchBarResults from "./SearchBar/SearchBarResults";

export default function Appbar() {
  const [query, setQuery] = useState("");

  const searchBarRef = useRef<HTMLDivElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      const clickedOutsideSearchBar =
        searchBarRef.current && !searchBarRef.current.contains(target);
      const clickedOutsideResults =
        searchResultsRef.current && !searchResultsRef.current.contains(target);

      if (clickedOutsideSearchBar && clickedOutsideResults) {
        setQuery("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 navbar bg-base-100 border-b px-4 py-2 flex flex-wrap items-center justify-between gap-4 shadow-sm border-base-300 dark:border-base-content/20">
      <div className="shrink-0">
        <span className="text-xl font-black tracking-tight text-primary">
          <span className="text-base-content">Lib</span>
          <span className="text-primary">rary</span>
        </span>
      </div>

      <SearchBar ref={searchBarRef} query={query} setQuery={setQuery} />
      <SearchBarResults
        ref={searchResultsRef}
        query={query}
        setQuery={setQuery}
        className="md:hidden absolute top-full w-screen left-0"
      />

      <div className="flex items-center shrink-0 gap-10">
        <nav className="hidden md:flex gap-4 text-sm font-medium ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-base-content hover:text-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/subjects"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-base-content hover:text-primary"
            }
          >
            Subjects
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-base-content hover:text-primary"
            }
          >
            Search
          </NavLink>
        </nav>
        <ThemeToggler />
      </div>
    </header>
  );
}
