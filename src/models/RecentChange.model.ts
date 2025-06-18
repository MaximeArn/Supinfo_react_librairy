import type { IRecentChangeJson } from "./interfaces/RecentChange.interface";

export default class RecentChange implements IRecentChangeJson {
  id: string;
  kind: string;
  timestamp: string;
  comment?: string;
  changes: { key: string; revision: number }[];
  author?: { key: string } | null;
  ip: string | null;
  data: {
    url?: string;
    duplicates?: string[];
    master?: string;
    [key: string]: unknown;
  };

  constructor(data: IRecentChangeJson) {
    this.id = data.id;
    this.kind = data.kind;
    this.timestamp = data.timestamp;
    this.comment = data.comment;
    this.changes = data.changes;
    this.author = data.author;
    this.ip = data.ip;
    this.data = data.data;
  }

  get authorName(): string {
    return this.author?.key?.replace("/people/", "") ?? "Unknown";
  }

  get firstChange(): string {
    return this.changes[0]?.key ?? "";
  }

  get isBook(): boolean {
    return this.firstChange.startsWith("/books/");
  }

  get isWork(): boolean {
    return this.firstChange.startsWith("/works/");
  }

  get isAuthor(): boolean {
    return this.firstChange.startsWith("/authors/");
  }

  get title(): string {
    return `${this.authorName} : ${this.comment}`;
  }

  get formattedDate(): string {
    return new Date(this.timestamp).toLocaleString();
  }

  get mainKey(): string {
    return this.firstChange;
  }

  get coverUrl(): string | null {
    return this.data?.url ?? null;
  }
}
