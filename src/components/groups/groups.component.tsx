import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/store";

import { getGroupsData, setGroups } from "@/features/groups/groups.slice";
import { setTeachers } from "@/features/teachers/teachers.slice";

import { useGetDataQuery } from "@/features/api/bgaa/bgaa.api";

import Card from "../card/card.component";

import classes from "./groups.module.scss";

const Groups = () => {
  const { data } = useGetDataQuery();

  const dispatch = useAppDispatch();

  const groups = useAppSelector(getGroupsData);

  useEffect(() => {
    if (data) {
      dispatch(setGroups(data.data));
      dispatch(setTeachers(data.teachers));
    }
  }, [data, dispatch]);

  return (
    <div className={classes.groups}>
      {groups.map((group) => {
        return <Card key={group.uniqueId} group={group} />;
      })}
    </div>
  );
};

export default Groups;
