import { memo } from "react";

import Select from "../select/select.component";

import type { Activity } from "@/types/bgaa.types";
import type { TableRowProps } from "./table-row.types";

import classes from "./table-row.module.scss";

const activities: Record<Activity, string> = {
  lecturesHours: "Лекции",
  laboratoryHours: "Лабораторные работы",
  practicHours: "Практические",
  seminarHours: "Семинарские",
  offset: "Зачёт",
  exam: "Экзамен",
};

const TableRow = memo((props: TableRowProps) => {
  const { activity, hours, id, isOnePodgroup } = props;

  return (
    <tr className={classes.row}>
      <td>{activities[activity]}</td>
      <td>{hours}</td>
      <td>
        <Select
          groupId={id}
          podgroup={0}
          isDisabled={hours === "0"}
          activity={activity}
        />
      </td>

      {!isOnePodgroup && (
        <td>
          <Select
            groupId={id}
            podgroup={1}
            isDisabled={hours === "0"}
            activity={activity}
          />
        </td>
      )}
    </tr>
  );
});

export default TableRow;
