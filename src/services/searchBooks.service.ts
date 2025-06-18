import { apiFetch } from "@/lib/api";
import type { ISearchBookResult } from "../models/interfaces/SearchBooksResult.interface";

export async function searchBooks(query: string): Promise<ISearchBookResult[]> {
  const url = `https://openlibrary.org/search.json?limit=10&q=${encodeURIComponent(
    query
  )}`;
  const data = await apiFetch<{ docs: ISearchBookResult[] }>(url);
  return data.docs;
}
