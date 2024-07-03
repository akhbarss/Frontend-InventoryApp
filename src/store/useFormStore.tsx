import { create } from "zustand";

// Interface and store for form state
type FormValues = {
  id: number | null;
  name: string;
  indexStatusPermintaanBarang: number | null;
};

interface FormState {
  form: FormValues;
  setForm: (data: FormValues) => void;
}

export const useFormStore = create<FormState>()((set) => ({
  form: {
    id: null,
    name: "",
    indexStatusPermintaanBarang: null,
  },
  setForm: (data) => set({ form: data }),
}));

type FormRequestImage = {
  request_image: string | null;
};

interface FormRequestImageState {
  formRequestImage: FormRequestImage;
  setFormRequestImage: (data: FormRequestImage) => void;
}

export const useFormRequestImage = create<FormRequestImageState>()((set) => ({
  formRequestImage: {
    request_image: null,
  },
  setFormRequestImage: (data) => set({ formRequestImage: data }),
}));
