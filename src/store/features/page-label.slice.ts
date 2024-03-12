import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TPageLabelSlice {
  label: string;
}

const initialState: TPageLabelSlice = {
  label: "",
};

export const PageLabelSlice = createSlice({
  name: "label",
  initialState,
  reducers: {
    setLabel: (state, action: PayloadAction<string>) => {
      state.label = action.payload;
    },
  },
});

export default PageLabelSlice.reducer;
export const { setLabel } = PageLabelSlice.actions;
