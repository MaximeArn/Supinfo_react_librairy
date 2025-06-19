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
import BookDetailsSection from "@/Components/BookDetails/BookDetailsSection";
import BookCoverCarousel from "@/Components/BookDetails/BookCoverCarousel.tsx";
import BookDetailsSkeleton from "@/Components/Skeletons/BookDetailsContentSkeleton";
import BookWikipediaSection from "../Components/BookDetails/BookWikipediSection";

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

      {isLoading && <BookDetailsSkeleton />}
      {!isLoading && error && <p className="text-center text-error">{error}</p>}

      {!isLoading && book && (
        <div className="max-w-screen-xl mx-auto space-y-6">
          {/* Grid: Cover + Description */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {book.covers && book.covers.length > 0 && (
              <BookDetailsSection
                icon={<HiOutlineBookOpen className="text-base-content" />}
                title="Covers"
              >
                <BookCoverCarousel covers={book.covers} />
              </BookDetailsSection>
            )}

            {book.description && (
              <BookDetailsSection
                icon={<HiOutlineBookOpen className="text-base-content" />}
                title="Description"
              >
                <p className="text-base-content text-base leading-relaxed">
                  {typeof book.description === "string"
                    ? book.description
                    : book.description.value}
                </p>
              </BookDetailsSection>
            )}
          </div>

          {/* Author */}
          {book.authors && book.authors.length > 0 && (
            <BookDetailsSection
              icon={<FaUser className="text-base-content" />}
              title="Author"
            >
              <BookAuthorInfos
                authorId={book.authors[0].author.key.split("/").pop()!}
              />
            </BookDetailsSection>
          )}

          <BookWikipediaSection bookTitle={book.title} />
          {/* Subject Places */}
          {book.subject_places && book.subject_places.length > 0 && (
            <BookDetailsSection
              icon={<HiOutlineMapPin className="text-green-600" />}
              title="Places"
            >
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
            </BookDetailsSection>
          )}

          {/* Subject Times */}
          {book.subject_times && book.subject_times.length > 0 && (
            <BookDetailsSection
              icon={<HiOutlineClock className="text-purple-600" />}
              title="Periods"
            >
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
            </BookDetailsSection>
          )}
        </div>
      )}
    </>
  );
}
