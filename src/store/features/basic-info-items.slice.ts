import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CategoryItem, StatusItem } from "../../utils/types/items.type";

export type BasicInfoItem = {
  id: number;
  name: string;
  item_code: string;
  status_item: StatusItem;
};

interface BasicInfoItemSlice {
    items: BasicInfoItem[]
}

const initialState: BasicInfoItemSlice = {
    items: []
}

export const BasicItemsSlice = createSlice({
  name: "BasicItems",
  initialState,
  reducers: {
    setBasicInfoItems: (state, action: PayloadAction<BasicInfoItem[]>) => {
      state.items = action.payload;
    },
  },
});

export default BasicItemsSlice.reducer;
export const { setBasicInfoItems } = BasicItemsSlice.actions;
