import ReactSelect from "react-select";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/store/store";

import {
  assignTeacherToActivity,
  assignTeacherToPodgroup,
  selectTeacherId,
} from "@/features/groups/groups.slice";
import { selectTeachers } from "@/features/teachers/teachers.slice";

import SortIcon from "../icons/sort.icon";

import type { Activity, TeacherType } from "@/types/bgaa.types";
import type { SelectProps } from "./select.types";

import classes from "./select.module.scss";

const activityToTeacher: Record<Activity, TeacherType> = {
  lecturesHours: "lectureTeacher",
  laboratoryHours: "laboratoryTeacher",
  practicHours: "practiceTeacher",
  seminarHours: "seminarTeacher",
  offset: "offsetTeacher",
  exam: "examTeacher",
};

const Select = (props: SelectProps) => {
  const { groupId, podgroup, activity, isDisabled } = props;

  const dispatch = useDispatch();

  const teacherId = useAppSelector(
    selectTeacherId(groupId, podgroup, activityToTeacher[activity])
  );
  const teachers = useAppSelector(selectTeachers);

  const options = [
    { value: "", label: "Вакансия" },
    ...teachers.map((teacher) => ({ value: teacher.id, label: teacher.name })),
  ];

  const chosenOption = options.find((option) => option.value === teacherId) || {
    value: "",
    label: "Вакансия",
  };

  return (
    <>
      {activity === "lecturesHours" ? (
        <div className={classes.lections}>
          <ReactSelect
            options={options}
            value={chosenOption}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            isDisabled={isDisabled}
            onChange={(chosenTeacher) => {
              dispatch(
                assignTeacherToActivity({
                  groupId,
                  teacherId: chosenTeacher?.value || "",
                  podgroup,
                  activity: activity,
                  teacherType: activityToTeacher[activity],
                })
              );
            }}
          />
          <button
            className={classes.sortBtn}
            onClick={() =>
              dispatch(
                assignTeacherToPodgroup({
                  groupId,
                  podgroup,
                  teacherId: teacherId || "",
                })
              )
            }
          >
            <SortIcon />
          </button>
        </div>
      ) : (
        <ReactSelect
          options={options}
          value={chosenOption}
          menuPortalTarget={document.body}
          menuPosition="fixed"
          isDisabled={isDisabled}
          onChange={(chosenTeacher) => {
            dispatch(
              assignTeacherToActivity({
                groupId,
                podgroup,
                activity: activity,
                teacherId: chosenTeacher?.value || "",
                teacherType: activityToTeacher[activity],
              })
            );
          }}
        />
      )}
    </>
  );
};

export default Select;
