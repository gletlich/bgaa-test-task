import { Group } from "@/types/bgaa.types";

type GroupInfo = Pick<
  Group,
  "groupName" | "course" | "semestr" | "studentsNumber"
>;

export type GroupInfoProps = {
  groupInfo: GroupInfo;
};
