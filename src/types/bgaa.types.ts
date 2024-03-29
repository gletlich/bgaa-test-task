export type Podgroup = {
  countStudents: string;
  laboratoryTeacher: string;
  lectureTeacher: string;
  practiceTeacher: string;
  seminarTeacher: string;
  examTeacher: string;
  offsetTeacher: string;
};

export type Group = {
  subjectName: string;
  course: string;
  semestr: string;
  studentsNumber: string;
  groupName: string;
  lecturesHours: string;
  laboratoryHours: string;
  practicHours: string;
  seminarHours: string;
  exam: boolean;
  offset: boolean;
  additionalInfo: string;
  countPodgroups: string;
  uniqueId: string;
  podgroups: Podgroup[];
};

export type Teacher = {
  id: string;
  name: string;
};

export type BgaaResponse = {
  data: Group[];
  teachers: Teacher[];
};

export type Activity =
  | "lecturesHours"
  | "laboratoryHours"
  | "practicHours"
  | "seminarHours"
  | "offset"
  | "exam";

export type TeacherType =
  | "lectureTeacher"
  | "laboratoryTeacher"
  | "practiceTeacher"
  | "seminarTeacher"
  | "offsetTeacher"
  | "examTeacher";

export type ActivityTeacher = {
  groupId: string;
  podgroup: number;
  teacherId: string;
  activity: Activity;
  teacherType: TeacherType;
};

export type PodgroupTeacher = {
  groupId: string;
  podgroup: number;
  teacherId: string;
};

export type AdditionalInfo = {
  groupId: string;
  additionalInfo: string;
};

export type PodgroupsCount = {
  groupId: string;
  count: [number, number];
};
