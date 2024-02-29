import ReactSelect from "react-select";
import { useDispatch } from "react-redux";

import { useAppSelector } from "@/store/store";

import {
  assignTeacherToActivity,
  assignTeacherToPodgroup,
  getTeacherId,
} from "@/features/groups/groups.slice";
import { getTeachers } from "@/features/teachers/teachers.slice";

import SortIcon from "../icons/sort.icon";

import { SelectProps } from "./select.types";
import { Activities } from "@/types/activities.enum";

import classes from "./select.module.scss";
import { convertActivityToTeacher } from "@/utils/teachers.utils";
import { convertActivitiesToActivity } from "@/utils/activities.utils";

const Select = (props: SelectProps) => {
  const { groupId, podgroup, activity, hours } = props;

  const dispatch = useDispatch();

  const teacher = useAppSelector(
    getTeacherId(groupId, podgroup, convertActivityToTeacher(activity))
  );
  const teachers = useAppSelector(getTeachers);

  const options = [
    { value: "", label: "Вакансия" },
    ...teachers.map((teacher) => ({ value: teacher.id, label: teacher.name })),
  ];

  const chosenOption = options.find((option) => option.value === teacher) || {
    value: "",
    label: "Вакансия",
  };

  return (
    <>
      {activity === Activities.Lectures ? (
        <div className={classes.lections}>
          <ReactSelect
            options={options}
            value={chosenOption}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            isDisabled={hours === "0"}
            onChange={(chosenTeacher) => {
              dispatch(
                assignTeacherToActivity({
                  groupId,
                  teacherId: chosenTeacher?.value || "",
                  podgroup,
                  activity: convertActivitiesToActivity(activity),
                  teacher: convertActivityToTeacher(activity),
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
                  teacherId: teacher || "",
                  podgroup,
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
          isDisabled={hours === "0"}
          onChange={(chosenTeacher) => {
            dispatch(
              assignTeacherToActivity({
                groupId,
                teacherId: chosenTeacher?.value || "",
                podgroup,
                activity: convertActivitiesToActivity(activity),
                teacher: convertActivityToTeacher(activity),
              })
            );
          }}
        />
      )}
    </>
  );
};

export default Select;
