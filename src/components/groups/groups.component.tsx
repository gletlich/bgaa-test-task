import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/store";

import { getGroupsData, setGroups } from "@/features/groups/groups.slice";
import { setTeachers } from "@/features/teachers/teachers.slice";

import {
  useGetDataQuery,
  useSaveChangesMutation,
} from "@/features/api/bgaa/bgaa.api";

import Card from "../card/card.component";

import classes from "./groups.module.scss";

const Groups = () => {
  const { data } = useGetDataQuery();
  const [saveChanges] = useSaveChangesMutation();

  const dispatch = useAppDispatch();

  const groups = useAppSelector(getGroupsData);

  useEffect(() => {
    if (data) {
      dispatch(setGroups(data.data));
      dispatch(setTeachers(data.teachers));
    }
  }, [data, dispatch]);

  const handleSubmit = () => {
    saveChanges(groups);
  };

  return (
    <div className={classes.container}>
      <div className={classes.groups}>
        {groups.map((group) => {
          return <Card key={group.uniqueId} group={group} />;
        })}
      </div>
      <button className={classes.saveBtn} onClick={handleSubmit}>
        Сохранить
      </button>
    </div>
  );
};

export default Groups;
