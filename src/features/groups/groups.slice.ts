import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store/store";

import type { Group } from "@/types/bgaa.types";

export type GroupsState = {
  groups: Group[];
};

const initialState: GroupsState = {
  groups: [],
};

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
  },
});

export const { setGroups } = groupsSlice.actions;

export const getGroupsData = (state: RootState) => state.groups.groups;

export const getGroupData = (id: string) => (state: RootState) => {
  return state.groups.groups.find((group) => group.uniqueId === id);
};

export default groupsSlice.reducer;
