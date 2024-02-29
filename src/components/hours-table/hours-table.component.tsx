import { useState } from "react";

import TableRow from "../table-row/table-row.component";

import type { HoursTableProps } from "./hours-table.types";

import classes from "./hours-table.module.scss";

const HoursTable = (props: HoursTableProps) => {
  const { group } = props;

  const {
    lecturesHours,
    laboratoryHours,
    practicHours,
    seminarHours,
    offset,
    exam,
    additionalInfo,
  } = group;

  const [note, setNote] = useState(additionalInfo);

  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.headRow}>
            <th>Занятие</th>
            <th>Часы</th>
            <th>Преподаватель</th>
          </tr>
        </thead>
        <tbody>
          <TableRow activity="Лекции" hours={lecturesHours} />
          <TableRow activity="Лабораторные работы" hours={laboratoryHours} />
          <TableRow activity="Практические" hours={practicHours} />
          <TableRow activity="Семинарские" hours={seminarHours} />

          {offset && <TableRow activity="Зачёт" hours="" />}
          {exam && <TableRow activity="Экзамен" hours="" />}

          <tr className={classes.row}>
            <td>
              Примечание
              <br />
              (для составления расписания)
            </td>
            <td></td>
            <td>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HoursTable;
