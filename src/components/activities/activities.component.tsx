import TableRow from "../table-row/table-row.component";

import type { ActivitiesProps } from "./activities.types";

const Activities = (props: ActivitiesProps) => {
  const {
    groupId,
    isOnePodgroup,
    lecturesHours,
    laboratoryHours,
    practicHours,
    seminarHours,
    offset,
    exam,
  } = props;

  return (
    <>
      <TableRow
        activity="lecturesHours"
        hours={lecturesHours}
        groupId={groupId}
        isOnePodgroup={isOnePodgroup}
      />
      <TableRow
        activity="laboratoryHours"
        hours={laboratoryHours}
        groupId={groupId}
        isOnePodgroup={isOnePodgroup}
      />
      <TableRow
        activity="practicHours"
        hours={practicHours}
        groupId={groupId}
        isOnePodgroup={isOnePodgroup}
      />
      <TableRow
        activity="seminarHours"
        hours={seminarHours}
        groupId={groupId}
        isOnePodgroup={isOnePodgroup}
      />

      {offset && (
        <TableRow
          activity="offset"
          hours=""
          groupId={groupId}
          isOnePodgroup={isOnePodgroup}
        />
      )}
      {exam && (
        <TableRow
          activity="exam"
          hours=""
          groupId={groupId}
          isOnePodgroup={isOnePodgroup}
        />
      )}
    </>
  );
};

export default Activities;
