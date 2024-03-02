import React from "react";

import { Podgroup } from "@/types/bgaa.types";

export type PodgroupsCountProps = {
  firstPodgroupCount: number;
  secondPodgroupCount: number;

  isEditingFirstPodgroup: boolean;
  isEditingSecondPodgroup: boolean;

  setIsEditingFirstPodgroup: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditingSecondPodgroup: React.Dispatch<React.SetStateAction<boolean>>;

  handleStudentsCountSave: (podgroup: number) => void;
  handleStudentsCountChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    podgroup: number
  ) => void;

  podgroups: Podgroup[];

  studentsCount: number;
};
