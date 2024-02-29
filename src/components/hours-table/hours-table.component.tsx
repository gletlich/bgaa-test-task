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
    uniqueId,
  } = group;

  const [note, setNote] = useState(additionalInfo);

  const isOnePodgroup = group.podgroups.length === 1;

  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.headRow}>
            <th>Занятие</th>
            <th>Часы</th>

            {isOnePodgroup ? (
              <th>Преподаватель</th>
            ) : (
              <>
                <th>Подгруппа 1</th>
                <th>Подгруппа 2</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          <TableRow activity="Лекции" hours={lecturesHours} id={uniqueId} />
          <TableRow
            activity="Лабораторные работы"
            hours={laboratoryHours}
            id={uniqueId}
          />
          <TableRow
            activity="Практические"
            hours={practicHours}
            id={uniqueId}
          />
          <TableRow activity="Семинарские" hours={seminarHours} id={uniqueId} />

          {offset && <TableRow activity="Зачёт" hours="" id={uniqueId} />}
          {exam && <TableRow activity="Экзамен" hours="" id={uniqueId} />}

          {!isOnePodgroup && (
            <tr className={classes.row}>
              <td>Количество человек</td>
              <td></td>
              <td>{group.podgroups[0].countStudents}</td>
              <td>{group.podgroups[1].countStudents}</td>
            </tr>
          )}

          <tr className={classes.row}>
            <td>
              Примечание
              <br />
              (для составления расписания)
            </td>
            <td></td>
            <td colSpan={2}>
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
