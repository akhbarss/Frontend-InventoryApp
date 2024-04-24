import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Class, getClasses } from "../../utils/api/class";

interface TClassSlice {
  loading: boolean;
  classes: Class[];
  error: any;
  selectedClasses: Class["id"] | null;
}

const initialState: TClassSlice = {
  loading: false,
  classes: [],
  error: "",
  selectedClasses: null,
};

export const ClassSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    setClass: (state, action: PayloadAction<Class["id"]>) => {
      state.selectedClasses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClasses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClasses.fulfilled, (state, action) => {
      state.loading = false;
      state.classes = action.payload.payload.findManyClass;
      state.error = "";
    });
    builder.addCase(getClasses.rejected, (state, action) => {
      state.loading = false;
      state.classes = [];
      state.error = action.error.message;
    });
  },
});

export default ClassSlice.reducer;
export const { setClass } = ClassSlice.actions;
