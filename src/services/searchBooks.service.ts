import { apiFetch } from "@/lib/api";
import type { IPaginatedSearchResponse } from "@/models/interfaces/SearchBooksResult.interface";

export async function searchBooks(
  queryString: string,
  limit: number = 10
): Promise<IPaginatedSearchResponse> {
  const url = `https://openlibrary.org/search.json?${queryString}&limit=${limit}`;
  return await apiFetch<IPaginatedSearchResponse>(url);
}
