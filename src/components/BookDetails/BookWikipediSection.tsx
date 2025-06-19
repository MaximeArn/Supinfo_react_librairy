import { useEffect, useState } from "react";
import {
  getWikipediaSummary,
  type WikipediaSummary,
} from "@/services/wikipedia.service";
import BookDetailsSection from "./BookDetailsSection";
import { HiOutlineBookOpen } from "react-icons/hi2";

interface Props {
  bookTitle: string;
}

export default function BookWikipediaSection({ bookTitle }: Props) {
  const [summary, setSummary] = useState<WikipediaSummary | null>(null);

  useEffect(() => {
    async function fetchSummary() {
      const data = await getWikipediaSummary(bookTitle);
      setSummary(data);
    }
    fetchSummary();
  }, [bookTitle]);

  const hasUsefulContent =
    summary?.extract ||
    summary?.thumbnail?.source ||
    summary?.content_urls?.desktop?.page;

  if (!summary || !hasUsefulContent) return null;

  return (
    <BookDetailsSection
      icon={<HiOutlineBookOpen className="text-base-content" />}
      title="Wikipedia"
    >
      <div className="flex flex-col md:flex-row items-start gap-6 text-base-content">
        {summary.thumbnail?.source && (
          <img
            src={summary.thumbnail.source}
            alt={summary.title}
            className="w-40 h-auto rounded shadow shrink-0"
          />
        )}

        <div className="space-y-4">
          {summary.extract && (
            <p className="text-sm md:text-base leading-relaxed">
              {summary.extract}
            </p>
          )}
          {summary.content_urls?.desktop?.page && (
            <a
              href={summary.content_urls.desktop.page}
              target="_blank"
              rel="noreferrer"
              className="link link-primary text-sm"
            >
              Read more on Wikipedia
            </a>
          )}
        </div>
      </div>
    </BookDetailsSection>
  );
}
