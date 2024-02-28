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
  exam: true;
  offset: false;
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
