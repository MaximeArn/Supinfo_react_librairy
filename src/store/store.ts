import { configureStore } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import recentChangesReducer from "@/store/slices/recentChanges.slice";
import booksSearch from "@/store/slices/booksSearch.slice";

export const store = configureStore({
  reducer: {
    recentChanges: recentChangesReducer,
    booksSearch: booksSearch,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
