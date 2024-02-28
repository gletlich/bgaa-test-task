import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import groupsReducer from "../features/groups/groups.slice";
import teachersReducer from "../features/teachers/teachers.slice";

import { bgaaApi } from "../features/api/bgaa/bgaa.api";

export const store = configureStore({
  reducer: {
    groups: groupsReducer,
    teachers: teachersReducer,
    [bgaaApi.reducerPath]: bgaaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bgaaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
