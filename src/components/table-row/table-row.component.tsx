import { useAppSelector } from "@/store/store";

import { getGroupData } from "@/features/groups/groups.slice";

import Select from "../select/select.component";

import type { TableRowProps } from "./table-row.types";

import { Activities } from "@/types/activities.enum";

import classes from "./table-row.module.scss";

const activities = {
  [Activities.Lectures]: "Лекции",
  [Activities.Laboratory]: "Лабораторные работы",
  [Activities.Practics]: "Практические",
  [Activities.Seminars]: "Семинарские",
  [Activities.Offset]: "Зачёт",
  [Activities.Exam]: "Экзамен",
};

const TableRow = (props: TableRowProps) => {
  const { activity, hours, id } = props;

  const group = useAppSelector(getGroupData(id));

  if (!group) return <tr></tr>;

  const isOnePodgroup = group.podgroups.length === 1;

  return (
    <tr className={classes.row}>
      <td>{activities[activity]}</td>
      <td>{hours}</td>
      <td>
        <Select groupId={id} podgroup={0} hours={hours} activity={activity} />
      </td>

      {!isOnePodgroup && (
        <td>
          <Select groupId={id} podgroup={1} hours={hours} activity={activity} />
        </td>
      )}
    </tr>
  );
};

export default TableRow;
