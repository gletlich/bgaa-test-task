import { memo } from "react";

import HoursTable from "../hours-table/hours-table.component";
import GroupInfo from "../group-info/group-info.component";
import BookIcon from "../icons/book.icon";

import type { CardProps } from "./card.types";

import classes from "./card.module.scss";

const Card = memo((props: CardProps) => {
  const { group } = props;

  const { subjectName } = group;

  return (
    <div className={classes.card}>
      <div className={classes.subject}>
        <div>
          <BookIcon />
        </div>
        <h2>{subjectName}</h2>
      </div>

      <GroupInfo groupInfo={group} />

      <HoursTable group={group} />
    </div>
  );
});

export default Card;
