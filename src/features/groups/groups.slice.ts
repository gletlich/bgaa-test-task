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
    createPodgroup: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const group = state.groups.find((group) => group.uniqueId === id);

      if (!group) return;

      const firstPodgroupStudents = Math.ceil(
        Number(group.podgroups[0].countStudents) / 2
      );
      const secondPodgroupStudents =
        Number(group.podgroups[0].countStudents) - firstPodgroupStudents;

      group.podgroups[0].countStudents = firstPodgroupStudents.toString();

      group.podgroups[1] = {
        countStudents: secondPodgroupStudents.toString(),
        laboratoryTeacher: "",
        lectureTeacher: "",
        practiceTeacher: "",
        seminarTeacher: "",
        examTeacher: "",
        offsetTeacher: "",
      };
    },
    deletePodgroup: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const group = state.groups.find((group) => group.uniqueId === id);

      if (!group) return;

      group.podgroups[0].countStudents = group.studentsNumber;
      group.podgroups.pop();
    },
  },
});

export const { setGroups, createPodgroup, deletePodgroup } =
  groupsSlice.actions;

export const getGroupsData = (state: RootState) => state.groups.groups;

export const getGroupData = (id: string) => (state: RootState) => {
  return state.groups.groups.find((group) => group.uniqueId === id);
};

export default groupsSlice.reducer;
