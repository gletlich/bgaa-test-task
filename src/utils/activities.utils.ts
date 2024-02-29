import { Activity } from "@/types/bgaa.types";
import { Activities } from "@/types/activities.enum";

export const convertActivitiesToActivity = (activity: Activities): Activity => {
  switch (activity) {
    case Activities.Lectures:
      return "lecturesHours";
    case Activities.Laboratory:
      return "laboratoryHours";
    case Activities.Practics:
      return "practicHours";
    case Activities.Seminars:
      return "seminarHours";
    case Activities.Offset:
      return "offset";
    case Activities.Exam:
      return "exam";
  }
};
