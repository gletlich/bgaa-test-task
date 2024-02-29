import Select from "react-select";

import { useAppSelector } from "@/store/store";

import { getGroupData } from "@/features/groups/groups.slice";
import { getTeachers } from "@/features/teachers/teachers.slice";

import type { TableRowProps } from "./table-row.types";

import classes from "./table-row.module.scss";

const TableRow = (props: TableRowProps) => {
  const { activity, hours, id } = props;

  const group = useAppSelector(getGroupData(id));
  const teachers = useAppSelector(getTeachers);

  const options = [
    { value: "", label: "Вакансия" },
    ...teachers.map((teacher) => ({ value: teacher.id, label: teacher.name })),
  ];

  if (!group) return <tr></tr>;

  const isOnePodgroup = group.podgroups.length === 1;

  return (
    <tr className={classes.row}>
      <td>{activity}</td>
      <td>{hours}</td>
      <td>
        <Select
          options={options}
          defaultValue={options[0]}
          menuPortalTarget={document.body}
          menuPosition={"fixed"}
          isDisabled={hours === "0"}
        />
      </td>
      {!isOnePodgroup && (
        <td>
          <Select
            options={options}
            defaultValue={options[0]}
            menuPortalTarget={document.body}
            menuPosition={"fixed"}
            isDisabled={hours === "0"}
          />
        </td>
      )}
    </tr>
  );
};

export default TableRow;
