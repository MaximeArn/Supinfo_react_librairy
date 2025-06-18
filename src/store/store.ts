import { configureStore } from "@reduxjs/toolkit";
import recentChangesReducer from "@/store/slices/recentChanges.slice";

export const store = configureStore({
  reducer: {
    recentChanges: recentChangesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
