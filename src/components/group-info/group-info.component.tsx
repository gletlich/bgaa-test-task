import { GroupInfoProps } from "./group-info.types";

import classes from "./group-info.module.scss";

const GroupInfo = (props: GroupInfoProps) => {
  const { groupInfo } = props;
  const { groupName, course, studentsNumber, semestr } = groupInfo;

  const info = [
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
      {info.map((i) => {
        return (
          <div key={i.label} className={classes.record}>
            <div>{i.label}</div>
            <div>{i.value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupInfo;
