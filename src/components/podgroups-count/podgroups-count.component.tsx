import { PodgroupsCountProps } from "./podgroups-count.types";

import classes from "./podgroups-count.module.scss";

const PodgroupsCount = (props: PodgroupsCountProps) => {
  const {
    firstPodgroupCount,
    secondPodgroupCount,
    isEditingFirstPodgroup,
    isEditingSecondPodgroup,
    setIsEditingFirstPodgroup,
    setIsEditingSecondPodgroup,
    handleStudentsCountSave,
    handleStudentsCountChange,
    podgroups,
  } = props;

  return (
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
          <div className={classes.count}>{podgroups[0].countStudents}</div>
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
          <div className={classes.count}>{podgroups[1].countStudents}</div>
        )}
      </td>
    </tr>
  );
};

export default PodgroupsCount;
