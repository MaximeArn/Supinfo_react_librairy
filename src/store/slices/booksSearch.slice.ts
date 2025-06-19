import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type {
  AdvancedSearchPayload,
  ISearchBookResult,
} from "@/models/interfaces/SearchBooksResult.interface";
import { searchBooks } from "@/services/books.service";

interface AdvancedSearchParams {
  filters: Record<string, string>;
}

interface AdvancedSearchState {
  results: ISearchBookResult[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
  bookPerPage: number;
}

interface QuickSearchState {
  results: ISearchBookResult[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface SearchState {
  quickSearch: QuickSearchState;
  advancedSearch: AdvancedSearchState;
}

const initialAdvancedSearchState: AdvancedSearchState = {
  results: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
  bookPerPage: 9,
};

const initialQuickSearchState: QuickSearchState = {
  results: [],
  status: "idle",
  error: null,
};

const initialState: SearchState = {
  quickSearch: { ...initialQuickSearchState },
  advancedSearch: { ...initialAdvancedSearchState },
};

export const fetchQuickSearchResults = createAsyncThunk(
  "search/fetchQuickSearchResults",
  async (query: string, thunkAPI) => {
    try {
      const data = await searchBooks(`&q=${encodeURIComponent(query)}`, 5);
      return data.docs;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message ?? "Unknown error");
    }
  }
);

export const fetchAdvancedSearchResults = createAsyncThunk<
  AdvancedSearchPayload,
  AdvancedSearchParams,
  { state: { booksSearch: SearchState } }
>("search/fetchAdvancedSearchResults", async ({ filters }, thunkAPI) => {
  const state = thunkAPI.getState().booksSearch.advancedSearch;
  const page = state.currentPage;
  const limit = state.bookPerPage;

  const queryString = new URLSearchParams({
    ...filters,
    page: page.toString(),
  }).toString();

  const data = await searchBooks(queryString, limit);
  const totalPages = Math.ceil(data.numFound / limit);

  return {
    results: data.docs,
    currentPage: page,
    totalPages,
    totalResults: data.numFound,
  };
});

const searchSlice = createSlice({
  name: "booksSearch",
  initialState,
  reducers: {
    clearQuickSearchResults: (state) => {
      state.quickSearch = { ...initialQuickSearchState };
    },
    clearAdvancedSearchResults: (state) => {
      state.advancedSearch = { ...initialAdvancedSearchState };
    },
    setCurrentPage: (state, action) => {
      state.advancedSearch.currentPage = action.payload;
    },
    setBookPerPage: (state, action: PayloadAction<number>) => {
      state.advancedSearch.bookPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // QUICK SEARCH (search bar)
    builder
      .addCase(fetchQuickSearchResults.pending, (state) => {
        state.quickSearch.status = "loading";
        state.quickSearch.error = null;
      })
      .addCase(fetchQuickSearchResults.fulfilled, (state, action) => {
        state.quickSearch.status = "succeeded";
        state.quickSearch.results = action.payload;
      })
      .addCase(fetchQuickSearchResults.rejected, (state, action) => {
        state.quickSearch.status = "failed";
        state.quickSearch.error = action.payload as string;
      });

    // ADVANCED SEARCH
    builder
      .addCase(fetchAdvancedSearchResults.pending, (state) => {
        state.advancedSearch.status = "loading";
        state.advancedSearch.error = null;
      })
      .addCase(fetchAdvancedSearchResults.fulfilled, (state, action) => {
        state.advancedSearch.status = "succeeded";
        state.advancedSearch.results = action.payload.results;
        state.advancedSearch.currentPage = action.payload.currentPage;
        state.advancedSearch.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAdvancedSearchResults.rejected, (state, action) => {
        state.advancedSearch.status = "failed";
        state.advancedSearch.error = action.payload as string;
      });
  },
});

export const {
  clearQuickSearchResults,
  clearAdvancedSearchResults,
  setCurrentPage,
  setBookPerPage,
} = searchSlice.actions;

export default searchSlice.reducer;
