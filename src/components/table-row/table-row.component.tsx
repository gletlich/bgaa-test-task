import Select from "react-select";

import { useAppSelector } from "@/store/store";

import { getTeachers } from "@/features/teachers/teachers.slice";

import type { TableRowProps } from "./table-row.types";

import classes from "./table-row.module.scss";

const TableRow = (props: TableRowProps) => {
  const { activity, hours } = props;

  const teachers = useAppSelector(getTeachers);

  const options = [
    { value: "", label: "Вакансия" },
    ...teachers.map((teacher) => ({ value: teacher.id, label: teacher.name })),
  ];

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
    </tr>
  );
};

export default TableRow;
