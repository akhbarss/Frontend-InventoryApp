import { Class } from "@utils/api/class";
import { create } from "zustand";

interface ClassState {
  allClass: Class[];
  selectedClass: Class | null;
  setAllClass: (selectedClass: Class[]) => void;
  setClass: (selectedClass: Class) => void;
}

export const useClassStore = create<ClassState>((set, get) => ({
  allClass: [],
  selectedClass: null,
  setAllClass: (classes) => set(() => ({ allClass: classes })),
  setClass: (selectedClass) => set(() => ({ selectedClass })),
}));
