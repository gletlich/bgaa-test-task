import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "@/store/store";

import type {
  ActivityTeacher,
  AdditionalInfo,
  Group,
  PodgroupTeacher,
  PodgroupsCount,
  TeacherType,
} from "@/types/bgaa.types";

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
      const groupId = action.payload;

      const group = state.groups.find((group) => group.uniqueId === groupId);

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
      const groupId = action.payload;

      const group = state.groups.find((group) => group.uniqueId === groupId);

      if (!group) return;

      group.podgroups[0].countStudents = group.studentsNumber;
      group.podgroups.pop();
    },
    assignTeacherToActivity: (
      state,
      action: PayloadAction<ActivityTeacher>
    ) => {
      const { groupId, podgroup, teacherId, activity, teacherType } =
        action.payload;

      const group = state.groups.find((group) => group.uniqueId === groupId);

      if (!group) return;

      if (group[activity] !== "0") {
        group.podgroups[podgroup][teacherType] = teacherId;
      }
    },
    assignTeacherToPodgroup: (
      state,
      action: PayloadAction<PodgroupTeacher>
    ) => {
      const { groupId, teacherId, podgroup } = action.payload;

      const group = state.groups.find((group) => group.uniqueId === groupId);

      if (!group) return;

      if (group.lecturesHours !== "0") {
        group.podgroups[podgroup].lectureTeacher = teacherId;
      }

      if (group.laboratoryHours !== "0") {
        group.podgroups[podgroup].laboratoryTeacher = teacherId;
      }

      if (group.practicHours !== "0") {
        group.podgroups[podgroup].practiceTeacher = teacherId;
      }

      if (group.seminarHours !== "0") {
        group.podgroups[podgroup].seminarTeacher = teacherId;
      }

      if (group.offset) {
        group.podgroups[podgroup].offsetTeacher = teacherId;
      }

      if (group.exam) {
        group.podgroups[podgroup].examTeacher = teacherId;
      }
    },
    setAdditionalInfo: (state, action: PayloadAction<AdditionalInfo>) => {
      const { groupId, additionalInfo } = action.payload;

      const group = state.groups.find((group) => group.uniqueId === groupId);

      if (!group) return;

      group.additionalInfo = additionalInfo;
    },
    setPodgroupsCount: (state, action: PayloadAction<PodgroupsCount>) => {
      const { groupId, count } = action.payload;

      const group = state.groups.find((group) => group.uniqueId === groupId);

      if (!group) return;

      group.podgroups[0].countStudents = count[0].toString();
      group.podgroups[1].countStudents = count[1].toString();
    },
  },
});

export const {
  setGroups,
  createPodgroup,
  deletePodgroup,
  assignTeacherToActivity,
  assignTeacherToPodgroup,
  setAdditionalInfo,
  setPodgroupsCount,
} = groupsSlice.actions;

export const selectGroups = (state: RootState) => state.groups.groups;

export const selectTeacherId =
  (id: string, podgroup: number, teacher: TeacherType) =>
  (state: RootState) => {
    const group = state.groups.groups.find((group) => group.uniqueId === id);

    return group?.podgroups[podgroup]?.[teacher];
  };

export default groupsSlice.reducer;
