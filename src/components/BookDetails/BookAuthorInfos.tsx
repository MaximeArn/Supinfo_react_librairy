import { useEffect, useState } from "react";
import {
  getAuthorDetails,
  type AuthorDetails,
} from "@/services/authors.service";

interface BookAuthorInfosProps {
  authorId: string;
}

export default function BookAuthorInfos({ authorId }: BookAuthorInfosProps) {
  const [author, setAuthor] = useState<AuthorDetails | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const data = await getAuthorDetails(authorId);
        setAuthor(data);
      } catch {
        setError("Failed to load author information.");
      }
    }

    fetchAuthor();
  }, [authorId]);

  if (error) return <p className="text-error">{error}</p>;
  if (!author) return null;

  return (
    <section>
      <div className="flex flex-col sm:flex-row gap-6 items-start text-base-content">
        {author.photos?.[0] && (
          <img
            src={`https://covers.openlibrary.org/b/id/${author.photos[0]}-M.jpg`}
            alt={author.name}
            className="w-32 h-auto rounded shadow"
          />
        )}

        <div className="space-y-2 text-sm sm:text-base w-full">
          <p className="font-semibold">{author.name}</p>
          {author.birth_date && <p>Born: {author.birth_date}</p>}
          {author.death_date && <p>Died: {author.death_date}</p>}

          {author.bio && (
            <p className="text-base-content text-sm sm:text-base leading-relaxed whitespace-pre-line break-words max-w-full">
              {typeof author.bio === "string" ? author.bio : author.bio.value}
            </p>
          )}

          {author.links && author.links.length > 0 && (
            <div>
              <p className="font-semibold mt-2">Links:</p>
              <ul className="list-disc list-inside">
                {author.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      className="text-primary underline break-all"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
