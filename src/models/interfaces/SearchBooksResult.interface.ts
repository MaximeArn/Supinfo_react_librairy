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

export interface AdvancedSearchPayload {
  results: ISearchBookResult[];
  currentPage: number;
  totalPages: number;
}

export interface IBookDetails {
  key: string;
  title: string;
  description?: string | { value: string };
  covers?: number[];
  subjects?: string[];
  subject_places?: string[];
  subject_times?: string[];
  authors?: {
    author: { key: string };
    type: { key: string };
  }[];
  created?: { value: string };
  last_modified?: { value: string };
}

export interface IPaginatedSearchResponse {
  docs: ISearchBookResult[];
  numFound: number;
  start: number;
}
