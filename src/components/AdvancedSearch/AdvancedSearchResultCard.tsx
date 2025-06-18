import { Link } from "react-router";

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
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

  return (
    <div className="card card-side bg-base-100 shadow-md">
      <figure className="w-32 flex-shrink-0">
        <img
          src={coverUrl}
          alt={book.title || "Book cover"}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-semibold">
          {book.title || "No title available"}
        </h2>
        <p className="text-sm text-gray-600">
          {book.author_name?.[0] || "Unknown author"}
        </p>
        {book.first_publish_year && (
          <p className="text-sm text-gray-500">
            Published: {book.first_publish_year}
          </p>
        )}
        <div className="mt-auto">
          <Link to={book.key} className="btn btn-sm btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchResultCard;
