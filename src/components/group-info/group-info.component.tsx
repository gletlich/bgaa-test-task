import { memo } from "react";

import { GroupInfoProps } from "./group-info.types";

import classes from "./group-info.module.scss";

const GroupInfo = memo((props: GroupInfoProps) => {
  const { groupName, course, studentsNumber, semestr } = props;

  const groupInfo = [
    {
      label: "Группа",
      value: groupName,
    },
    {
      label: "Курс",
      value: course,
    },
    {
      label: "Количество курсантов",
      value: studentsNumber,
    },
    {
      label: "Семестр",
      value: semestr,
    },
  ];

  return (
    <div className={classes.groupInfo}>
      {groupInfo.map((info) => {
        return (
          <div key={info.label} className={classes.info}>
            <div>{info.label}</div>
            <div>{info.value}</div>
          </div>
        );
      })}
    </div>
  );
});

export default GroupInfo;
