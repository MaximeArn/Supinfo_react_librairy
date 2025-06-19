import { apiFetch } from "@/lib/api";
import type {
  IBookDetails,
  IPaginatedSearchResponse,
} from "@/models/interfaces/SearchBooksResult.interface";

export async function searchBooks(
  queryString: string,
  limit: number = 10
): Promise<IPaginatedSearchResponse> {
  const url = `https://openlibrary.org/search.json?${queryString}&limit=${limit}`;
  return await apiFetch<IPaginatedSearchResponse>(url);
}

export async function getWorkDetails(workId: string): Promise<IBookDetails> {
  if (!workId) throw new Error("Invalid work key");
  const url = `https://openlibrary.org/works/${workId}.json`;
  return await apiFetch<IBookDetails>(url);
}
