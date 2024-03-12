import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import PageLabelSlice from "./features/page-label.slice";
import LoadingSlice from "./features/loading.slice";
import ModalSlice from "./features/modal.slice";
import ClassSlice from "./features/class.slice";
import ItemsSlice from "./features/items.class";

export const store = configureStore({
  reducer: {
    label: PageLabelSlice,
    loading: LoadingSlice,
    modal: ModalSlice,
    class: ClassSlice,
    items: ItemsSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export const dispatch   = () => {
  
}