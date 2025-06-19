import { apiFetch } from "@/lib/api";

export interface AuthorDetails {
  key: string;
  name: string;
  bio?: string | { value: string };
  birth_date?: string;
  death_date?: string;
  alternate_names?: string[];
  photos?: number[];
  links?: {
    title: string;
    url: string;
  }[];
}

export async function getAuthorDetails(
  authorId: string
): Promise<AuthorDetails> {
  const url = `https://openlibrary.org/authors/${authorId}.json`;
  return await apiFetch<AuthorDetails>(url);
}
