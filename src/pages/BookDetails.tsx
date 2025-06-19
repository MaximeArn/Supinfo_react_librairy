import { useParams } from "react-router";
import { useEffect, useState } from "react";
import PageHeader from "@/Components/Common/PageHeader";
import { getWorkDetails } from "@/services/books.service";
import type { IBookDetails } from "@/models/interfaces/SearchBooksResult.interface";
import BookAuthorInfos from "@/Components/BookDetails/BookAuthorInfos";
import {
  HiOutlineBookOpen,
  HiOutlineMapPin,
  HiOutlineClock,
} from "react-icons/hi2";
import { FaUser } from "react-icons/fa6";
import BookCoverCarousel from "../Components/BookDetails/BookCoverCarousel.tsx";

export default function BooksDetails() {
  const { bookId } = useParams<{ bookId: string }>();
  const [book, setBook] = useState<IBookDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookId) {
      setError("Missing book ID");
      setIsLoading(false);
      return;
    }

    async function fetchWork() {
      try {
        const data = await getWorkDetails(bookId!);
        setBook(data);
      } catch {
        setError("Failed to load work details");
      } finally {
        setIsLoading(false);
      }
    }

    fetchWork();
  }, [bookId]);

  return (
    <>
      <PageHeader
        title={book?.title || "Book Details"}
        description="Detailed information about a book"
      />

      {isLoading && <p className="text-center">Loading...</p>}
      {!isLoading && error && <p className="text-center text-error">{error}</p>}

      {!isLoading && book && (
        <div className="max-w-screen-xl mx-auto space-y-6">
          {/* Grid: Cover + Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {book.covers && book.covers.length > 0 && (
              <section className="bg-base-200 border border-base-300 shadow-md rounded-lg h-full flex flex-col">
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold mb-4 text-base-content flex items-center gap-2">
                    <HiOutlineBookOpen className="text-base-content" />
                    Covers
                  </h3>
                  <BookCoverCarousel covers={book.covers} />
                </div>
              </section>
            )}

            {book.description && (
              <section className="bg-base-200 border border-base-300 shadow-md rounded-lg h-full flex flex-col">
                <div className="p-6 sm:p-8 flex-1">
                  <h3 className="text-xl font-semibold mb-4 text-base-content flex items-center gap-2">
                    <HiOutlineBookOpen className="text-base-content" />
                    Description
                  </h3>
                  <p className="text-base-content text-base leading-relaxed">
                    {typeof book.description === "string"
                      ? book.description
                      : book.description.value}
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* Author */}
          {book.authors && book.authors.length > 0 && (
            <section className="bg-base-200 border border-base-300 shadow-md shadow-base-200/30 rounded-lg backdrop-blur-sm">
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold mb-3 text-base-content flex items-center gap-2">
                  <FaUser className="text-base-content" />
                  Author
                </h3>
                <BookAuthorInfos
                  authorId={book.authors[0].author.key.split("/").pop()!}
                />
              </div>
            </section>
          )}

          {/* Subject Places */}
          {book.subject_places && book.subject_places.length > 0 && (
            <section className="bg-base-200/80 border border-base-300 shadow-md shadow-base-200/30 rounded-lg backdrop-blur-sm">
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold mb-3 text-base-content flex items-center gap-2">
                  <HiOutlineMapPin className="text-green-600" />
                  Places
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {book.subject_places.map((p) => (
                    <li
                      key={p}
                      className="bg-green-100 text-green-800 px-3 py-1 text-sm rounded-full whitespace-nowrap"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Subject Times */}
          {book.subject_times && book.subject_times.length > 0 && (
            <section className="bg-base-200/80 border border-base-300 shadow-md shadow-base-200/30 rounded-lg backdrop-blur-sm">
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold mb-3 text-base-content flex items-center gap-2">
                  <HiOutlineClock className="text-purple-600" />
                  Periods
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {book.subject_times.map((t) => (
                    <li
                      key={t}
                      className="bg-purple-100 text-purple-800 px-3 py-1 text-sm rounded-full whitespace-nowrap"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}
