import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TModalSlice {
  openedCreateModal: boolean;
  openedEditModal: boolean;
  openedDeleteModal: boolean;
  openedDetailImageModal: boolean;
  data_id: number | null;
}

const initialState: TModalSlice = {
  openedCreateModal: false,
  openedEditModal: false,
  openedDeleteModal: false,
  openedDetailImageModal: false,
  data_id: null,
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenCreateModal: (state, action: PayloadAction<boolean>) => {
      state.openedCreateModal = action.payload;
    },
    setOpenEditModal: (state, action: PayloadAction<boolean>) => {
      state.openedEditModal = action.payload;
    },
    setOpenDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.openedDeleteModal = action.payload;
    },
    setOpenDetailImageModal: (state, action: PayloadAction<boolean>) => {
      state.openedDetailImageModal = action.payload;
    },
  },
});

export default ModalSlice.reducer;
export const { setOpenEditModal, setOpenDeleteModal, setOpenCreateModal, setOpenDetailImageModal } =
  ModalSlice.actions;
