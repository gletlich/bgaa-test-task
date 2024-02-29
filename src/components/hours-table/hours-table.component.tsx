import React, { useState } from "react";

import { useAppDispatch } from "@/store/store";

import {
  createPodgroup,
  deletePodgroup,
  setAdditionalInfo,
  setStudentsCount,
} from "@/features/groups/groups.slice";

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
    studentsNumber,
  } = group;

  const dispatch = useAppDispatch();

  const [isEditingFirstPodgroup, setIsEditingFirstPodgroup] = useState(false);
  const [isEditingSecondPodgroup, setIsEditingSecondPodgroup] = useState(false);
  const [firstPodgroupCount, setFirstPodgroupCount] = useState(
    Number(group.podgroups[0]?.countStudents)
  );
  const [secondPodgroupCount, setSecondPodgroupCount] = useState(
    Number(group.podgroups[1]?.countStudents)
  );

  const isOnePodgroup = group.podgroups.length === 1;

  const addPodgroup = () => {
    dispatch(createPodgroup(uniqueId));

    const count = Math.ceil(Number(studentsNumber) / 2);
    setFirstPodgroupCount(count);
    setSecondPodgroupCount(Number(studentsNumber) - count);
  };

  const removePodgroup = () => {
    dispatch(deletePodgroup(uniqueId));

    setFirstPodgroupCount(Number(studentsNumber));
    setSecondPodgroupCount(0);
  };

  const changeAdditionalInfo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      setAdditionalInfo({ groupId: uniqueId, additionalInfo: e.target.value })
    );
  };

  const handleStudentsCountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    podgroup: number
  ) => {
    const newCount = Number(e.target.value);

    if (podgroup === 0) {
      setFirstPodgroupCount(newCount);
      setSecondPodgroupCount(Number(studentsNumber) - newCount);
    } else {
      setFirstPodgroupCount(Number(studentsNumber) - newCount);
      setSecondPodgroupCount(newCount);
    }
  };

  const handleStudentsCountSave = (podgroup: number) => {
    setIsEditingFirstPodgroup(false);
    setIsEditingSecondPodgroup(false);

    const newCount = podgroup === 0 ? firstPodgroupCount : secondPodgroupCount;

    if (newCount < 0 || newCount > Number(studentsNumber)) {
      setFirstPodgroupCount(Number(group.podgroups[0].countStudents));
      setSecondPodgroupCount(Number(group.podgroups[1].countStudents));

      return;
    }

    const count: [number, number] = [
      newCount,
      Number(studentsNumber) - newCount,
    ];

    if (podgroup === 1) count.reverse();

    dispatch(setStudentsCount({ groupId: uniqueId, count }));
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
              <td onClick={() => setIsEditingFirstPodgroup(true)}>
                {isEditingFirstPodgroup ? (
                  <input
                    type="number"
                    onBlur={() => handleStudentsCountSave(0)}
                    value={firstPodgroupCount}
                    autoFocus
                    onChange={(e) => handleStudentsCountChange(e, 0)}
                    className={classes.countInput}
                  />
                ) : (
                  <div className={classes.count}>
                    {group.podgroups[0].countStudents}
                  </div>
                )}
              </td>
              <td onClick={() => setIsEditingSecondPodgroup(true)}>
                {isEditingSecondPodgroup ? (
                  <input
                    type="number"
                    onBlur={() => handleStudentsCountSave(1)}
                    value={secondPodgroupCount}
                    autoFocus
                    onChange={(e) => handleStudentsCountChange(e, 1)}
                    className={classes.countInput}
                  />
                ) : (
                  <div className={classes.count}>
                    {group.podgroups[1].countStudents}
                  </div>
                )}
              </td>
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
                value={additionalInfo}
                onChange={changeAdditionalInfo}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HoursTable;
