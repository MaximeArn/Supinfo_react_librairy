export interface IRecentChange {
  id: string;
  kind:
    | "register"
    | "update"
    | "edit-book"
    | "add-book"
    | "bulk_update"
    | "add-cover"
    | "add-photo"
    | "merge-authors"
    | string;
  timestamp: string;
  comment?: string;
  changes: {
    key: string;
    revision: number;
  }[];
  author?: {
    key: string;
  } | null;
  ip: string | null;
  data: {
    url?: string;
    duplicates?: string[];
    master?: string;
    [key: string]: unknown;
  };
}
