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
      console.log({ state });
      console.log({ action });
      state.label = action.payload;
      console.log({ state });
    },
  },
});

export default PageLabelSlice.reducer;
export const { setLabel } = PageLabelSlice.actions;
