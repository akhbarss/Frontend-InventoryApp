import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import PageLabelSlice from "./features/PageLabelSlice";
import LoadingSlice from "./features/LoadingSlice";
import ModalSlice from "./features/ModalSlice";

export const store = configureStore({
  reducer: {
    label: PageLabelSlice,
    loading: LoadingSlice,
    modal: ModalSlice
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
