import { Link } from "react-router";
import { useState } from "react";

interface Props {
  book: {
    key: string;
    title?: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
  };
}

const AdvancedSearchResultCard = ({ book }: Props) => {
  const [imageError, setImageError] = useState(false);

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : null;

  return (
    <div className="card card-side bg-base-200 shadow-md min-h-[220px]">
      <figure className="w-32 h-[220px] flex-shrink-0 bg-gray-100 flex items-center justify-center overflow-hidden">
        {imageError || !coverUrl ? (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-xs text-gray-500 px-2 text-center">
            No cover available
          </div>
        ) : (
          <img
            src={coverUrl}
            onError={() => setImageError(true)}
            alt=""
            className="h-full w-full object-cover"
          />
        )}
      </figure>

      <div className="card-body p-4 flex flex-col justify-between">
        <div>
          <h2 className="card-title text-lg font-semibold leading-snug line-clamp-2">
            {book.title || "No title available"}
          </h2>
          <p className="text-sm text-gray-600 line-clamp-1">
            {book.author_name?.[0] || "Unknown author"}
          </p>
          {book.first_publish_year && (
            <p className="text-sm text-gray-500">
              Published: {book.first_publish_year}
            </p>
          )}
        </div>
        <div className="pt-2">
          <Link to={book.key} className="btn btn-sm btn-primary w-full">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchResultCard;
