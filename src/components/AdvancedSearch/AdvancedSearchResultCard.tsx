import type { ISearchBookResult } from "@/models/interfaces/SearchBooksResult.interface";

interface Props {
  book: ISearchBookResult;
}

const SearchResultCard = ({ book }: Props) => {
  return (
    <div className="border rounded p-4 bg-base-100 shadow-sm">
      <h2 className="text-lg font-semibold">{book.title}</h2>
      <p className="text-sm text-gray-500">
        {book.author_name?.join(", ") || "Unknown author"}
        {book.first_publish_year && ` • ${book.first_publish_year}`}
      </p>
    </div>
  );
};

export default SearchResultCard;
