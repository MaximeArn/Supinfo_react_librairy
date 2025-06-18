import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  AdvancedSearchPayload,
  ISearchBookResult,
} from "@/models/interfaces/SearchBooksResult.interface";
import { searchBooks } from "@/services/searchBooks.service";

interface SearchSubState {
  results: ISearchBookResult[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
}

interface SearchState {
  quickSearch: SearchSubState;
  advancedSearch: SearchSubState;
}

const initialSubState: SearchSubState = {
  results: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const initialState: SearchState = {
  quickSearch: { ...initialSubState },
  advancedSearch: { ...initialSubState },
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
  Record<string, string>
>("search/fetchAdvancedSearchResults", async (params, thunkAPI) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const data = await searchBooks(queryString, 9);

    const currentPage = parseInt(params.page || "1", 10);
    const totalPages = Math.ceil(data.numFound / 100);

    return {
      results: data.docs,
      currentPage,
      totalPages,
    };
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message ?? "Unknown error");
  }
});

const searchSlice = createSlice({
  name: "booksSearch",
  initialState,
  reducers: {
    clearQuickSearchResults: (state) => {
      state.quickSearch = { ...initialSubState };
    },
    clearAdvancedSearchResults: (state) => {
      state.advancedSearch = { ...initialSubState };
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

export const { clearQuickSearchResults, clearAdvancedSearchResults } =
  searchSlice.actions;

export default searchSlice.reducer;
