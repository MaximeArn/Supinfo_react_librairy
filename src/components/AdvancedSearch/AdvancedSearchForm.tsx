import { useSearchParams } from "react-router";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import {
  clearAdvancedSearchResults,
  fetchAdvancedSearchResults,
} from "@/store/slices/booksSearch.slice";
import { FiSearch, FiXCircle } from "react-icons/fi";

const languageOptions = [
  { label: "English", value: "eng" },
  { label: "French", value: "fre" },
  { label: "Spanish", value: "spa" },
  { label: "German", value: "ger" },
  { label: "Italian", value: "ita" },
];

const AdvancedSearchForm = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [author, setAuthor] = useState(searchParams.get("author") || "");
  const [subject, setSubject] = useState(searchParams.get("subject") || "");
  const [publisher, setPublisher] = useState(
    searchParams.get("publisher") || ""
  );
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [language, setLanguage] = useState("");
  const [isbn, setIsbn] = useState("");

  useEffect(() => {
    setTitle(searchParams.get("title") || "");
    setAuthor(searchParams.get("author") || "");
    setSubject(searchParams.get("subject") || "");
    setPublisher(searchParams.get("publisher") || "");
    setIsbn(searchParams.get("isbn") || "");
    setLanguage(searchParams.get("language") || "");
  }, [searchParams]);

  useEffect(() => {
    const hasParams = Array.from(searchParams.entries()).length > 0;
    if (hasParams) {
      const paramsObj: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        paramsObj[key] = value;
      });
      dispatch(fetchAdvancedSearchResults({ filters: paramsObj }));
    }
  }, [searchParams, dispatch]);

  const handleSearch = () => {
    const newParams: Record<string, string> = {};
    if (title) newParams.title = title;
    if (author) newParams.author = author;
    if (subject) newParams.subject = subject;
    if (publisher) newParams.publisher = publisher;
    if (isbn) newParams.isbn = isbn;
    if (language) newParams.language = language;
    if (minYear || maxYear) {
      newParams.q = `publish_year:[${minYear || "*"} TO ${maxYear || "*"}]`;
    }

    setSearchParams(newParams);
    dispatch(fetchAdvancedSearchResults({ filters: newParams }));
  };

  const handleReset = () => {
    setTitle("");
    setAuthor("");
    setSubject("");
    setPublisher("");
    setIsbn("");
    setLanguage("");
    setMinYear("");
    setMaxYear("");
    setSearchParams({});
    dispatch(clearAdvancedSearchResults());
  };

  return (
    <div className="card border border-base-300 bg-base-200 shadow-sm mb-6">
      <div className="card-body">
        <h2 className="card-title">Advanced Search Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            placeholder="Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Author"
            className="input input-bordered w-full"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            placeholder="Subject"
            className="input input-bordered w-full"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <input
            placeholder="Publisher"
            className="input input-bordered w-full"
            value={publisher}
            onChange={(e) => setPublisher(e.target.value)}
          />
          <input
            placeholder="ISBN"
            className="input input-bordered w-full"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
          <select
            className="select select-bordered w-full"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Select Language</option>
            {languageOptions.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
          <input
            placeholder="Min Year"
            className="input input-bordered w-full"
            value={minYear}
            onChange={(e) => setMinYear(e.target.value)}
          />
          <input
            placeholder="Max Year"
            className="input input-bordered w-full"
            value={maxYear}
            onChange={(e) => setMaxYear(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-6">
          <button
            onClick={handleSearch}
            className="btn btn-primary flex-1 py-2"
          >
            <FiSearch className="mr-2 text-lg" /> Search
          </button>
          <button onClick={handleReset} className="btn btn-error flex-1 py-2">
            <FiXCircle className="mr-2 text-lg" /> Clear filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchForm;
