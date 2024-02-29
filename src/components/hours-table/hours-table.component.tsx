import { useState } from "react";

import { useAppDispatch } from "@/store/store";

import { createPodgroup, deletePodgroup } from "@/features/groups/groups.slice";

import TableRow from "../table-row/table-row.component";
import PlusIcon from "../icons/plus.icon";
import TrashIcon from "../icons/trash.icon";

import { Activities } from "@/types/activities.enum";
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

  const dispatch = useAppDispatch();

  const isOnePodgroup = group.podgroups.length === 1;

  const addPodgroup = () => {
    dispatch(createPodgroup(uniqueId));
  };

  const removePodgroup = () => {
    dispatch(deletePodgroup(uniqueId));
  };

  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.headRow}>
            <th>Занятие</th>
            <th>Часы</th>

            {isOnePodgroup ? (
              <th>
                <div className={classes.column} onClick={addPodgroup}>
                  Преподаватель <PlusIcon />
                </div>
              </th>
            ) : (
              <>
                <th>Подгруппа 1</th>
                <th>
                  <div className={classes.column} onClick={removePodgroup}>
                    Подгруппа 2 <TrashIcon />
                  </div>
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          <TableRow
            activity={Activities.Lectures}
            hours={lecturesHours}
            id={uniqueId}
          />
          <TableRow
            activity={Activities.Laboratory}
            hours={laboratoryHours}
            id={uniqueId}
          />
          <TableRow
            activity={Activities.Practics}
            hours={practicHours}
            id={uniqueId}
          />
          <TableRow
            activity={Activities.Seminars}
            hours={seminarHours}
            id={uniqueId}
          />

          {offset && (
            <TableRow activity={Activities.Offset} hours="" id={uniqueId} />
          )}
          {exam && (
            <TableRow activity={Activities.Exam} hours="" id={uniqueId} />
          )}

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
