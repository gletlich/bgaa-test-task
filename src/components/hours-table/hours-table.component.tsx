import Select from "react-select";

import { useAppSelector } from "@/store/store";

import { getTeachers } from "@/features/teachers/teachers.slice";

import type { HoursTableProps } from "./hours-table.types";

import classes from "./hours-table.module.scss";

const HoursTable = (props: HoursTableProps) => {
  const { group } = props;

  const { lecturesHours, laboratoryHours, practicHours, seminarHours } = group;

  const teachers = useAppSelector(getTeachers);

  const options = [
    { value: "", label: "Вакансия" },
    ...teachers.map((teacher) => ({ value: teacher.id, label: teacher.name })),
  ];

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
          <tr className={classes.bodyRow}>
            <td>Лекции</td>
            <td>{lecturesHours}</td>
            <td>
              <Select
                options={options}
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                menuPlacement="auto"
              />
            </td>
          </tr>
          <tr className={classes.bodyRow}>
            <td>Лабораторные работы</td>
            <td>{laboratoryHours}</td>
            <td>
              <Select
                options={options}
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                menuPlacement="auto"
              />
            </td>
          </tr>
          <tr className={classes.bodyRow}>
            <td>Практические</td>
            <td>{practicHours}</td>
            <td>
              <Select
                options={options}
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                menuPlacement="auto"
              />
            </td>
          </tr>
          <tr className={classes.bodyRow}>
            <td>Семинарские</td>
            <td>{seminarHours}</td>
            <td>
              <Select
                options={options}
                menuPortalTarget={document.body}
                menuPosition={"fixed"}
                menuPlacement="auto"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HoursTable;
