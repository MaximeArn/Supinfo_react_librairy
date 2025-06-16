import { apiFetch } from "@/lib/api";
import RecentChange from "@/models/RecentChange.model";
import type { IRecentChange } from "../models/interfaces/RecentChange.interface";

export async function fetchRecentChanges(limit = 10): Promise<RecentChange[]> {
  const raw = await apiFetch<IRecentChange[]>(
    `https://openlibrary.org/recentchanges.json?limit=${limit}`
  );

  return raw.map((item) => new RecentChange(item));
}
