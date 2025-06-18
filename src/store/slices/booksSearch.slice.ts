import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { ISearchBookResult } from "@/models/interfaces/SearchBooksResult.interface";
import { searchBooks } from "@/services/searchBooks.service";

interface SearchState {
  results: ISearchBookResult[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  status: "idle",
  error: null,
};

export const fetchSearchResults = createAsyncThunk(
  "search/fetchSearchResults",
  async (query: string, thunkAPI) => {
    try {
      return await searchBooks(query);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message ?? "Unknown error");
    }
  }
);

const searchSlice = createSlice({
  name: "booksSearch",
  initialState,
  reducers: {
    clearResults: (state) => {
      state.results = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearResults } = searchSlice.actions;
export default searchSlice.reducer;
