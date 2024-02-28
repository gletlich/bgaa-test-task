import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store/store";

import { getGroupsData, setGroups } from "../../features/groups/groups.slice";
import { setTeachers } from "../../features/teachers/teachers.slice";

import { useGetDataQuery } from "../../features/api/bgaa/bgaa.api";

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
    <div>
      {groups.map((group) => {
        return <div key={group.uniqueId}>{group.groupName}</div>;
      })}
    </div>
  );
};

export default Groups;
