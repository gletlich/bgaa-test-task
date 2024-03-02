import React, { useState } from "react";

import { useAppDispatch } from "@/store/store";

import {
  createPodgroup,
  deletePodgroup,
  setAdditionalInfo,
  setPodgroupsCount,
} from "@/features/groups/groups.slice";

import PodgroupsCount from "../podgroups-count/podgroups-count.component";
import Activities from "../activities/activities.component";
import PlusIcon from "../icons/plus.icon";
import TrashIcon from "../icons/trash.icon";

import type { HoursTableProps } from "./hours-table.types";

import classes from "./hours-table.module.scss";

const HoursTable = (props: HoursTableProps) => {
  const { group } = props;

  const {
    uniqueId,
    studentsNumber,
    lecturesHours,
    laboratoryHours,
    practicHours,
    seminarHours,
    offset,
    exam,
    additionalInfo,
    podgroups,
  } = group;

  const dispatch = useAppDispatch();

  const [isEditingFirstPodgroup, setIsEditingFirstPodgroup] = useState(false);
  const [isEditingSecondPodgroup, setIsEditingSecondPodgroup] = useState(false);
  const [firstPodgroupCount, setFirstPodgroupCount] = useState(
    Number(podgroups[0]?.countStudents)
  );
  const [secondPodgroupCount, setSecondPodgroupCount] = useState(
    Number(podgroups[1]?.countStudents)
  );

  const isOnePodgroup = podgroups.length === 1;

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

    if (
      newCount < 1 ||
      newCount >= Number(studentsNumber) ||
      Math.trunc(newCount) !== newCount
    ) {
      setFirstPodgroupCount(Number(podgroups[0].countStudents));
      setSecondPodgroupCount(Number(podgroups[1].countStudents));

      return;
    }

    const count: [number, number] = [
      newCount,
      Number(studentsNumber) - newCount,
    ];

    if (podgroup === 1) count.reverse();

    dispatch(setPodgroupsCount({ groupId: uniqueId, count }));
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
          <Activities
            groupId={uniqueId}
            isOnePodgroup={isOnePodgroup}
            lecturesHours={lecturesHours}
            laboratoryHours={laboratoryHours}
            practicHours={practicHours}
            seminarHours={seminarHours}
            offset={offset}
            exam={exam}
          />

          {!isOnePodgroup && (
            <PodgroupsCount
              firstPodgroupCount={firstPodgroupCount}
              secondPodgroupCount={secondPodgroupCount}
              isEditingFirstPodgroup={isEditingFirstPodgroup}
              isEditingSecondPodgroup={isEditingSecondPodgroup}
              setIsEditingFirstPodgroup={setIsEditingFirstPodgroup}
              setIsEditingSecondPodgroup={setIsEditingSecondPodgroup}
              handleStudentsCountChange={handleStudentsCountChange}
              handleStudentsCountSave={handleStudentsCountSave}
              podgroups={podgroups}
              studentsCount={Number(studentsNumber)}
            />
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
