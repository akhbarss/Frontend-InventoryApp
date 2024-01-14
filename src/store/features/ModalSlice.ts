import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TModalSlice {
  openedEditModal: boolean;
  openedDeleteModal: boolean;
  data_id: number | null;
}

const initialState: TModalSlice = {
  openedEditModal: false,
  openedDeleteModal: false,
  data_id: null,
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenEditModal: (state, action: PayloadAction<boolean>) => {
      state.openedEditModal = action.payload;
    },
    setOpenDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.openedDeleteModal = action.payload;
    },
  },
});

export default ModalSlice.reducer;
export const { setOpenEditModal, setOpenDeleteModal } = ModalSlice.actions;
