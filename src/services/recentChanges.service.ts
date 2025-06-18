import { apiFetch } from "@/lib/api";
import type { IRecentChangeJson } from "@/models/interfaces/RecentChange.interface";

export async function fetchRecentChanges(
  limit: number
): Promise<IRecentChangeJson[]> {
  const url = `https://openlibrary.org/recentchanges.json?limit=${limit}`;
  const raw = await apiFetch<IRecentChangeJson[]>(url);
  return raw;
}
