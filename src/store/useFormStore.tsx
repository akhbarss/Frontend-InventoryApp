import { create } from "zustand";

type FormValues = {
  id: number | null;
  name: string;
  indexStatusPermintaanBarang: number | null;
};

interface FormStateZustand {
  form: FormValues;
  setForm: (data: FormValues) => void;
}

export const useFormStore = create<FormStateZustand>()((set) => ({
  form: {
    id: null,
    name: "",
    indexStatusPermintaanBarang: null,
  },
  setForm: (data) => set({ form: data }),
}));
