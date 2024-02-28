import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Teacher } from "@/types/bgaa.types";

export type TeachersState = {
  teachers: Teacher[];
};

const initialState: TeachersState = {
  teachers: [],
};

export const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    setTeachers: (state, action: PayloadAction<Teacher[]>) => {
      state.teachers = action.payload;
    },
  },
});

export const { setTeachers } = teachersSlice.actions;

export default teachersSlice.reducer;
