import { Activities } from "@/types/activities.enum";
import { TeacherType } from "@/types/bgaa.types";

export const convertActivityToTeacher = (activity: Activities): TeacherType => {
  switch (activity) {
    case Activities.Lectures:
      return "lectureTeacher";
    case Activities.Laboratory:
      return "laboratoryTeacher";
    case Activities.Practics:
      return "practiceTeacher";
    case Activities.Seminars:
      return "seminarTeacher";
    case Activities.Offset:
      return "offsetTeacher";
    case Activities.Exam:
      return "examTeacher";
  }
};
