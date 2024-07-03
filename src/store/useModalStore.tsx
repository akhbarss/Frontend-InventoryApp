    import { create } from "zustand";

    interface ModalStateZustand {
      openedModalCreate: boolean;
      setOpenedModalCreate: (value: boolean) => void;
      openedModalDetailImage: boolean;
      setOpenedModalDetailImage: (value: boolean) => void;
      openedModalEdit: boolean;
      setOpenedModalEdit: (value: boolean) => void;
      openedModalDelete: boolean;
      setOpenedModalDelete: (value: boolean) => void;
      openedModalAccept: boolean;
      setOpenedModalAccept: (value: boolean) => void;
      openedModalReject: boolean;
      setOpenedModalReject: (value: boolean) => void;
    }

    export const useModalStore = create<ModalStateZustand>()((set) => ({
      openedModalCreate: false,
      setOpenedModalCreate: (openedModalCreate) => set({ openedModalCreate }),
      openedModalDetailImage: false,
      setOpenedModalDetailImage: (openedModalDetailImage) => set({ openedModalDetailImage }),
      openedModalEdit: false,
      setOpenedModalEdit: (openedModalEdit) => set({ openedModalEdit }),
      openedModalDelete: false,
      setOpenedModalDelete: (openedModalDelete) => set({ openedModalDelete }),
      openedModalAccept: false,
      setOpenedModalAccept: (openedModalAccept) => set({ openedModalAccept }),
      openedModalReject: false,
      setOpenedModalReject: (openedModalReject) => set({ openedModalReject }),
    }));
