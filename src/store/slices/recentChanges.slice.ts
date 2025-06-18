import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRecentChanges } from "@/services/recentChanges.service";
import type { IRecentChangeJson } from "@/models/interfaces/RecentChange.interface";
import type { RootState } from "@/store/store";

interface RecentChangesState {
  allItems: IRecentChangeJson[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  limitPerPage: number;
}

const initialState: RecentChangesState = {
  allItems: [],
  loading: false,
  error: null,
  currentPage: 1,
  limitPerPage: 10,
};

export const loadRecentChangesIfNeeded = createAsyncThunk(
  "recentChanges/loadIfNeeded",
  async ({ page, limit }: { page: number; limit: number }, { getState }) => {
    const state = getState() as RootState;
    const alreadyLoaded = state.recentChanges.allItems.length;
    const required = page * limit;

    if (alreadyLoaded >= required) return null;

    const data = await fetchRecentChanges(required);
    return data;
  }
);

const recentChangesSlice = createSlice({
  name: "recentChanges",
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    resetRecentChanges(state) {
      state.allItems = [];
      state.currentPage = 1;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRecentChangesIfNeeded.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadRecentChangesIfNeeded.fulfilled, (state, action) => {
        if (action.payload) {
          state.allItems = action.payload;
        }
        state.loading = false;
      })
      .addCase(loadRecentChangesIfNeeded.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred.";
        state.loading = false;
      });
  },
});

export const { setPage, resetRecentChanges } = recentChangesSlice.actions;
export default recentChangesSlice.reducer;
