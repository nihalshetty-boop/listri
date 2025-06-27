import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import listingsReducer from "@/store/slices/listingsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
