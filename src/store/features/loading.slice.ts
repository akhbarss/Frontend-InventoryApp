import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface TLoadingSlice {
  loading: boolean;
}

const initialState: TLoadingSlice = {
  loading: false,
};

export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export default LoadingSlice.reducer;
export const { setLoading } = LoadingSlice.actions;
