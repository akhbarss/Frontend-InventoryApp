import { create } from "zustand";

interface DetailPermintaanBarangStateZustand {
  acceptedDate: string;
  setAcceptedDate: (value: string) => void;
  updateDate: string;
  setUpdateDate: (value: string) => void;
  arriveDate: string;
  setArriveDate: (value: string) => void;
  reset: () => void;
}

export const useDetailPermintaanBarang = create<DetailPermintaanBarangStateZustand>()(
  (set) => ({
    acceptedDate: "",
    arriveDate: "",
    updateDate: "",
    setAcceptedDate: (value) => set({ acceptedDate: value }),
    setArriveDate: (value) => set({ arriveDate: value }),
    setUpdateDate: (value) => set({ updateDate: value }),
    reset: () => set({ acceptedDate: "", arriveDate: "", updateDate: "" }),
  })
);
