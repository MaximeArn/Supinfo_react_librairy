export interface ISearchBookResult {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  edition_key?: string[];
  cover_edition_key?: string;
  publish_year?: number[];
}
